using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SchedulesController : Controller
    {

        private readonly IMongoCollection<ScheduleDay> schedulesCollection;
        public SchedulesController(IMongoDatabase db)
        {
            schedulesCollection = db.GetCollection<ScheduleDay>("schedules");
        }

        // GET: /schedules?startDate={}&count={}

        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get(string startDate, int count)
        {
            var days = new List<ScheduleDay>();
            var parseDate = startDate.Split('-', '/', '\\', '.').Select(e => int.Parse(e)).ToList();
            var date = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            return new ObjectResult(schedulesCollection.Find(a => a.Date >= date)
                .SortBy(a => a.Date)
                .Limit(count)
                .ToList());
        }

        [HttpGet("{date}")]
        [Produces("application/json")]
        public IActionResult Get(string date)
        {
            var parseDate = date.Split('-', '/', '\\', '.').Select(e => int.Parse(e)).ToList();
            var dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            return new ObjectResult(schedulesCollection.Find(a => a.Date == dateTime)
                .FirstOrDefault());
        }

        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromBody] Lesson value)
        {
            var lesson = new Lesson(value);
            lesson.Id = Guid.NewGuid();
            //находим в БД schedule с нужной датой

            var filter = Builders<ScheduleDay>.Filter.Eq("Date", value.Date);
            // параметр обновления
            var update = Builders<ScheduleDay>.Update.AddToSet("Lessons", value);
            var result = schedulesCollection.UpdateOne(filter, update);
            //ПРОВЕРИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            return new ObjectResult(result);
        }

        [HttpPatch("{date}/{id}")]
        [Produces("application/json")]
        public IActionResult Patch(string date, Guid id, [FromBody] Lesson value)
        {
            var lessonRes = new Lesson(value);
            lessonRes.Id = id;
            //найти нужный день в бд по дате
            var schedule = new ScheduleDay() { Id = Guid.NewGuid(), Date = lessonRes.Date, Lessons = new List<Lesson>() };
            foreach(var lesson in schedule.Lessons.ToList())
            {
                if(lesson.Id == id)
                {
                    lesson.Update(lessonRes);
                    break;
                }
            }
            //обновить данные в бд (или удалить старого и добавить нового?)
            return new ObjectResult(lessonRes);
        }

        [HttpDelete("{date}/{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id, bool all, string date)
        {
            if(all)
            {
                var update = Builders<ScheduleDay>.Update.Pull("Lessons.Id", id); //НАДО ПРОВЕРЯТЬ
                var result = schedulesCollection.UpdateOneAsync(a => a.Lessons.Contains(id), update);
                //искать во всей базе все lesson с данным id и удалять
            }
            else
            {
                var parseDate = date.Split('-', '/', '\\', '.').Select(e => int.Parse(e)).ToList();
                var dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
                //найти в бд по дате и удалить из lessonov по id
            } 
            return NoContent();
        }
    }


}
