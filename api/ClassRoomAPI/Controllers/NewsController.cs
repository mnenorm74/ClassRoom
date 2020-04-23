using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClassRoomAPI.Models;
using MongoDB.Driver;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsController : Controller
    {
        private readonly IMongoCollection<News> newsCollection;
        public const string CollectionName = "news";

        public NewsController()
        {
            newsCollection = Database.database.GetCollection<News>(CollectionName);
        }

        // GET: /news
        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get()
        {
            var news = new List<News>();
            for (var i = 0; i < 20; i++)
            {
                //данные берать из отсортированной по дате БД, страницами
                news = newsCollection.Find(a => true).SortBy(a => a.Date).ToList();
                //news.Add(new News() { Id = Guid.NewGuid(), AuthorId = Guid.NewGuid(), Title = $"{i}", Content = "", Date = DateTime.Now, Comments = new List<Comment>() });
            }

            return new ObjectResult(news);
        }

        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromBody] News value, [FromHeader] Guid Authorization)
        {
            var news = new News(value);
            news.Id = Guid.NewGuid();
            news.AuthorId = Authorization;
            //добавляем в БД
            newsCollection.InsertOne(news);
            return Created("/schedules", news);
        }

        [HttpPut("{id}")]
        [Produces("application/json")]
        public IActionResult Put(Guid id, [FromBody] News value, [FromHeader] Guid Authorization)
        {
            var news = new News(value);
            news.Id = id;
            news.AuthorId = Authorization;
            news.Comments = new List<Comment>();
            //заменить в БД по Id
            return new ObjectResult(news);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id)
        {
            //удалить из базы по id
            return NoContent();
        }

        [HttpPost("{id}/comments")]
        [Produces("application/json")]
        public IActionResult Post(Guid id, [FromBody] Comment value, [FromHeader] Guid Authorization)
        {
            var comment = new Comment(value);
            comment.AuthorId = Authorization;
            comment.Id = Guid.NewGuid();
            //найти по id новость в БД
            var news = new News() { Id = id, AuthorId = Guid.NewGuid(), Content = "..", Date = DateTime.Now, Title = "..", Comments = new List<Comment>() };
            news.Comments.ToList().Add(comment);
            //сохранить изменения
            return Created("/news/{id}/comments", comment);
        }

        [HttpPut("{id}/comments/{Commid}")]
        [Produces("application/json")]
        public IActionResult Put(Guid id, Guid CommId, [FromBody] Comment value, [FromHeader] Guid Authorization)
        {
            var comment = new Comment(value);
            comment.AuthorId = Authorization;
            comment.Id = CommId;
            //найти по id новость в БД
            var news = new News() { Id = id, AuthorId = Guid.NewGuid(), Content = "..", Date = DateTime.Now, Title = "..", Comments = new List<Comment>() };
            foreach (var comm in news.Comments)
            {
                if(comm.Id == CommId)
                {
                    news.Comments.ToList().Remove(comm);
                    news.Comments.ToList().Add(comment);
                    break;
                }
            }
            //сохранить изменения
            return new ObjectResult(comment);
        }

        [HttpDelete("{id}/comments/{Commid}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id, Guid CommId)
        {
            //найти по id новость в БД
            var news = new News() { Id = id, AuthorId = Guid.NewGuid(), Content = "..", Date = DateTime.Now, Title = "..", Comments = new List<Comment>() };
            foreach (var comm in news.Comments)
            {
                if (comm.Id == CommId)
                {
                    news.Comments.ToList().Remove(comm);
                    break;
                }
            }
            //сохранить изменения
            return NoContent();
        }

    }
}
