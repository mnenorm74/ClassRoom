using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClassRoomAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.AspNetCore.Http;

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
            var news = newsCollection.Find(n => true)
                    .SortBy(n => n.Date)
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
        public IActionResult Post([FromBody] News value, [FromHeader] Guid Authorization)
        {
            var news = new News(value);
            news.Id = Guid.NewGuid();
            news.AuthorId = Authorization; 
            //возможно иначе?
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
        public IActionResult Patch(Guid id, [FromBody] News value, [FromHeader] Guid Authorization)
        {
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
            newsCollection.UpdateOne(n => n.Id == id, update.Combine(arr));
            
            return new ObjectResult(newsCollection.Find(n => n.Id == id).FirstOrDefault());
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id)
        {
            newsCollection.DeleteOne(n => n.Id == id);
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
        public IActionResult Post(Guid id, [FromBody] Comment value, [FromHeader] Guid Authorization)
        {
            var comment = new Comment(value);
            comment.Id = Guid.NewGuid();
            comment.AuthorId = Authorization;  //возможно иначе?
            commentsCollection.InsertOne(comment);
            var update = Builders<News>.Update.Push(n=>n.Comments, comment.Id);
            newsCollection.UpdateOne(n => n.Id == id, update);
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
        [HttpPut("{id}/comments/{Commid}")]
        [Produces("application/json")]
        public IActionResult Put(Guid id, Guid CommId, [FromBody] Comment value, [FromHeader] Guid Authorization)
        {
            //проверить на существование
            var update = Builders<Comment>.Update.Set(c => c.Content, value.Content).Set(c => c.Date, value.Date);
            commentsCollection.UpdateOne(c => c.Id == CommId, update);
            return new ObjectResult(commentsCollection.Find(c => c.Id == CommId).FirstOrDefault());
        }

        [HttpDelete("{id}/comments/{Commid}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id, Guid CommId)
        {
            //проверить на существование
            commentsCollection.DeleteOne(c => c.Id == CommId);
            var update = Builders<News>.Update.Pull(n => n.Comments, CommId);
            newsCollection.UpdateOne(n => n.Id == id, update);
            return NoContent();
        }

    }
}
