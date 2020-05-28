using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClassRoomAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.AspNetCore.Http;
using ClassRoomAPI.EnteringModels;
using AutoMapper.QueryableExtensions;
using System.Text.Json;

namespace ClassRoomAPI.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class NewsController : Controller
    {
        private readonly IMongoCollection<News> newsCollection;
        private readonly IMongoCollection<Comment> commentsCollection;
        private readonly IMongoCollection<User> usersCollection;
        public NewsController(IMongoDatabase db)
        {
            newsCollection = db.GetCollection<News>("news");
            commentsCollection = db.GetCollection<Comment>("comments");
            usersCollection = db.GetCollection<User>("users");
        }

        [Produces("application/json")]
        [HttpGet]
        public IActionResult Get(int page, int count)
        {
            if(page <= 0 || count < 0)
            {
                return UnprocessableEntity("Invalid query parameters: page < 1 or count < 0");
            }
            var userId = HttpContext.Session.GetString("userId");
            var currUser = usersCollection.Find(a => a.Id == Guid.Parse(userId)).FirstOrDefault();
            var usersInGroup = usersCollection.Find(a => a.GroupId == currUser.GroupId).ToList();
            var usersInGroupIds = usersInGroup.Select(a => a.Id).ToList();
            var news = newsCollection.Find(n => usersInGroupIds.Contains(n.AuthorId))
                    .SortByDescending(n => n.Date)
                    .Skip((page - 1) * count)
                    .Limit(count)
                    .ToList();
            var correctNews = new List<NewsView>();
            for (var i = 0; i < news.Count; i++) 
            {
                var newsView = new NewsView(news[i]);
                var user = usersCollection.Find(e => e.Id == news[i].AuthorId).FirstOrDefault();
                newsView.AuthorName = user.Name;
                newsView.AuthorSurname = user.Surname;
                var comments = commentsCollection.Find(c => news[i].Comments.Contains(c.Id)).ToList().OrderBy(e=>e.Date);
                newsView.Comments = comments;
                correctNews.Add(newsView);
            }
            return new ObjectResult(correctNews);
        }


        /// <remarks>
        /// Sample request:
        ///
        ///     POST /news
        ///     {
        ///        "title": "string",
        ///        "content": "string",
        ///        "date": "DateTime"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromForm] NewsDTO value)
        {
            var news = new News(value);
            news.Date = DateTime.Now;
            news.Id = Guid.NewGuid();
            news.AuthorId = Guid.Parse(HttpContext.Session.GetString("userId"));
            news.Comments = new List<Guid>();
            newsCollection.InsertOne(news);
            return Created("/schedules", news);
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     PATCH /news/{id}
        ///     {
        ///        "title": "string",
        ///        "content": "string",
        ///        "date": "DateTime"
        ///     }
        ///
        /// </remarks>
        [HttpPatch("{id}")]
        [Produces("application/json")]
        public IActionResult Patch(Guid id, [FromForm] NewsDTO value)
        {
            var session = HttpContext.Session.GetString("userId");
            if (session == null || Guid.Parse(session) != newsCollection.Find(n => n.Id == id).FirstOrDefault().AuthorId)
            {
                return StatusCode(403);
            }
            var arr = new List<UpdateDefinition<News>>();
            var update = Builders<News>.Update;
            if (value.Title != null)
            {
                arr.Add(update.Set(n => n.Title, value.Title));
            }
            if (value.Content != null)
            {
                arr.Add(update.Set(n => n.Content, value.Content));
            }
            arr.Add(update.Set(n => n.Date, DateTime.Now));
            
            var updateResult = newsCollection.UpdateOne(n => n.Id == id, update.Combine(arr));
            if(updateResult.MatchedCount == 0)
            {
                return NotFound("News with this id not found");
            }
            
            return new ObjectResult(newsCollection.Find(n => n.Id == id).FirstOrDefault());
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id)
        {
            var a = Guid.Parse(HttpContext.Session.GetString("userId"));
            if (a != newsCollection.Find(n => n.Id == id).FirstOrDefault().AuthorId)
            {
                return Forbid();
            }
            var delete = newsCollection.DeleteOne(n => n.Id == id);
            if (delete.DeletedCount == 0)
            {
                return NotFound("News with this id not found");
            }
            return NoContent();
        }

        [HttpGet("{id}/comments")]
        [Produces("application/json")]
        public IActionResult Get(Guid id)
        {
            var news = newsCollection.Find(n => n.Id == id).FirstOrDefault();
            var comments = commentsCollection.Find(c => news.Comments.Contains(c.Id)).ToList();
            var commentsView = new List<CommentView>();
            for(var i = 0; i < comments.Count; i++)
            {
                var user = usersCollection.Find(a => a.Id == comments[i].AuthorId).FirstOrDefault();
                commentsView.Add(new CommentView() { Id=comments[i].Id, Content = comments[i].Content, Date = comments[i].Date, Name = user.Name, Surname = user.Surname, Avatar = user.Avatar });
            }

            commentsView = commentsView.OrderBy(e => e.Date).ToList();

            return Json(commentsView);
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     POST /news/{id}/comments
        ///     {
        ///        "content": "string",
        ///        "date": "DateTime"
        ///     }
        ///
        /// </remarks>
        [HttpPost("{id}/comments")]
        [Produces("application/json")]
        public IActionResult Post(Guid id, [FromBody] CommentDTO value)
        {
            var comment = new Comment(value);
            comment.Id = Guid.NewGuid();
            comment.AuthorId = Guid.Parse(HttpContext.Session.GetString("userId"));
            comment.Date = DateTime.Now;

            var update = Builders<News>.Update.Push(n=>n.Comments, comment.Id);
            var updateRes = newsCollection.UpdateOne(n => n.Id == id, update);
            if(updateRes.MatchedCount == 0)
            {
                return NotFound("News with this id not found");
            }
            commentsCollection.InsertOne(comment);
            return Created("/news/{id}/comments", comment);
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /news/{id}/comments/{CommId}
        ///     {
        ///        "content": "string",
        ///        "date": "DateTime"
        ///     }
        ///
        /// </remarks>
        [HttpPut("{id}/comments/{CommId}")]
        [Produces("application/json")]
        public IActionResult Put(Guid id, Guid CommId, [FromBody] CommentDTO value)
        {
            if (Guid.Parse(HttpContext.Session.GetString("userId")) != commentsCollection.Find(n => n.Id == CommId).FirstOrDefault().AuthorId)
            {
                return Forbid();
            }
            var update = Builders<Comment>.Update.Set(c => c.Content, value.Content).Set(c => c.Date, DateTime.Now);
            var updateRes = commentsCollection.UpdateOne(c => c.Id == CommId, update);
            if(updateRes.MatchedCount == 0)
            {
                return NotFound("Comment with this id not found");
            }

            return new ObjectResult(commentsCollection.Find(c => c.Id == CommId).FirstOrDefault());
        }

        [HttpDelete("{id}/comments/{CommId}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id, Guid CommId)
        {
            if (Guid.Parse(HttpContext.Session.GetString("userId")) != commentsCollection.Find(n => n.Id == CommId).FirstOrDefault().AuthorId)
            {
                return Forbid();
            }
            var deleteRes = commentsCollection.DeleteOne(c => c.Id == CommId);
            var update = Builders<News>.Update.Pull(n => n.Comments, CommId);
            var updateRes = newsCollection.UpdateOne(n => n.Id == id, update);
            if(updateRes.MatchedCount == 0 || deleteRes.DeletedCount == 0)
            {
                return NotFound("News or comment with this id not found");
            }
            return NoContent();
        }

    }
}
