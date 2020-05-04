using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

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
            for(var i = 0; i < count; i++)
            {
                var day = schedulesCollection.Find(a => a.Date == date.AddDays(i)).FirstOrDefault();
                if(day != null)
                {
                     days.Add(day);
                }
                else
                {
                    days.Add(new ScheduleDay() { Id = Guid.NewGuid(), Date = date.AddDays(i), Lessons = new List<Lesson>() });
                }
            }
            return new ObjectResult(days);
        }

        [HttpGet("{date}")]
        [Produces("application/json")]
        public IActionResult Get(string date)
        {
            var parseDate = date.Split('-', '/', '\\', '.').Select(e => int.Parse(e)).ToList();
            var dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            //проверка если не найден
            var result = schedulesCollection.Find(a => a.Date == dateTime).FirstOrDefault();
            return new ObjectResult(result);
        }

        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromBody] Lesson value)
        {
            var lesson = new Lesson(value);
            lesson.Id = Guid.NewGuid();
            schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), Date = lesson.CreateDate, Lessons = new List<Lesson>() });
            var update = Builders<ScheduleDay>.Update.Push(s => s.Lessons, lesson);
            UpdateAll(lesson, update, true);
            //schedulesCollection.UpdateOne(s => s.Date == lesson.Date, update);
            //var a = schedulesCollection.Find(a => a.Date == lesson.CreateDate.AddDays(7)).FirstOrDefault();
            return Created("/schedules", lesson);
        }

        private void UpdateAll(Lesson lesson, UpdateDefinition<ScheduleDay> update, bool needCreate)
        {
            var date = new DateTime();
            switch (lesson.RepeatCount)
            {
                case 1:
                    {
                        if (needCreate)
                        {
                            schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), Date = lesson.CreateDate, Lessons = new List<Lesson>() });
                        }
                        schedulesCollection.UpdateOne(s => s.Date == lesson.CreateDate, update);
                        break;
                    }
                case 7:
                    {
                        for (var i = 0; i < 30; i++)
                        {
                            if (needCreate)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), Date = lesson.CreateDate.AddDays(7 * i), Lessons = new List<Lesson>() });
                            }
                            date = lesson.CreateDate.AddDays(7 * i);
                            schedulesCollection.UpdateOne(s => s.Date == date, update);
                        }
                        break;
                    }
                case 14:
                    {
                        for (var i = 0; i < 15; i++)
                        {
                            if (needCreate)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), Date = lesson.CreateDate.AddDays(14 * i), Lessons = new List<Lesson>() });
                            }
                            date = lesson.CreateDate.AddDays(14 * i);
                            schedulesCollection.UpdateOne(s => s.Date == date, update);
                        }
                        break;
                    }
                case 30:
                    {

                        for (var i = 0; i < 7; i++)
                        {
                            if (needCreate)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), Date = lesson.CreateDate.AddMonths(i), Lessons = new List<Lesson>() });
                            }
                            date = lesson.CreateDate.AddMonths(i);
                            schedulesCollection.UpdateOne(s => s.Date == date, update);
                        }
                        break;
                    }
                    //иначе ошибка
            }
        }

        [HttpPatch("{date}/{id}")]
        [Produces("application/json")]
        public IActionResult Patch(string date, Guid id, bool all, [FromBody] Lesson value)
        {
            var parseDate = date.Split('-', '/', '\\', '.').Select(e => int.Parse(e)).ToList();
            var dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            var delete = Builders<ScheduleDay>.Update.PullFilter(d =>d.Lessons, l=>l.Id == id);
            var lesson = schedulesCollection.Find(n => n.Date == dateTime).FirstOrDefault().Lessons.Where(l=>l.Id == id).FirstOrDefault();
            lesson.Update(value);
            var push = Builders<ScheduleDay>.Update.Push(d => d.Lessons, lesson);
            if (all)
            {
                UpdateAll(lesson, delete, false);
                UpdateAll(lesson, push, false);
            }
            else
            {
                schedulesCollection.UpdateOne(n => n.Date == dateTime, delete);
                schedulesCollection.UpdateOne(n => n.Date == dateTime, push);
            }
            return new ObjectResult(lesson);
        }

        [HttpDelete("{date}/{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id, string date, bool all)
        {
            var parseDate = date.Split('-', '/', '\\', '.').Select(e => int.Parse(e)).ToList();
            var dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            var lesson = schedulesCollection.Find(n => n.Date == dateTime).FirstOrDefault().Lessons.Where(l => l.Id == id).FirstOrDefault();
            var delete = Builders<ScheduleDay>.Update.PullFilter(d => d.Lessons, l => l.Id == id);
            if (all)
            {
                UpdateAll(lesson, delete, true);
            }
            else
            {
                schedulesCollection.UpdateOne(n => n.Date == dateTime, delete);
            } 
            return NoContent();
        }
    }


}
