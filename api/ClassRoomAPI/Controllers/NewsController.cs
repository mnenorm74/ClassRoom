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

namespace ClassRoomAPI.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class NewsController : Controller
    {
        private readonly IMongoCollection<News> newsCollection;
        private readonly IMongoCollection<Comment> commentsCollection;
        public NewsController(IMongoDatabase db)
        {
            newsCollection = db.GetCollection<News>("news");
            commentsCollection = db.GetCollection<Comment>("comments");
        }

        [Produces("application/json")]
        [HttpGet]
        public IActionResult Get(int page, int count)
        {
            if(page <= 0 || count < 0)
            {
                return UnprocessableEntity("Invalid query parameters: page < 1 or count < 0");
            }
            var news = newsCollection.Find(n => true)
                    .SortByDescending(n => n.Date)
                    .Skip((page - 1) * count)
                    .Limit(count)
                    .ToList();
            return new ObjectResult(news);
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
        public IActionResult Post([FromBody] NewsDTO value)
        {
            var news = new News(value);
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
        public IActionResult Patch(Guid id, [FromBody] NewsDTO value)
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
            if (value.Date != DateTime.MinValue)
            {
                arr.Add(update.Set(n => n.Date, value.Date));
            }
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
            if (Guid.Parse(HttpContext.Session.GetString("userId")) != newsCollection.Find(n => n.Id == id).FirstOrDefault().AuthorId)
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
            var update = Builders<Comment>.Update.Set(c => c.Content, value.Content).Set(c => c.Date, value.Date);
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
