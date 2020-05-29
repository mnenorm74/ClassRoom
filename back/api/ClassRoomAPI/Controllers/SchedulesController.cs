using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ClassRoomAPI.EnteringModels;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Http;
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
        private readonly IMongoCollection<User> usersCollection;
        public SchedulesController(IMongoDatabase db)
        {
            schedulesCollection = db.GetCollection<ScheduleDay>("schedules");
            usersCollection = db.GetCollection<User>("users");
        }

        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get(string startDate, int count)
        {
            var days = new List<ScheduleDay>();
            var parseDate = new List<int>();
            var date = new DateTime();
            try
            {
                parseDate = startDate.Split('-', '/', '\\', '.', '_', ':').Select(e => int.Parse(e)).ToList();
                date = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            }
            catch (Exception e)
            {
                return UnprocessableEntity("Invalid format of startDate: " + e.Message);
            }
            if (count < 0)
            {
                return UnprocessableEntity("Invalid parameter: count < 0");
            }
            var userGroupId = usersCollection
                .Find(a => a.Id == Guid.Parse(HttpContext.Session.GetString("userId")))
                .FirstOrDefault()
                .GroupId;

                for (var i = 0; i < count; i++)
                {
                    var nextDate = date.AddDays(i);
                    var day = schedulesCollection.Find(a => a.DayDate == nextDate.Date && a.GroupId == userGroupId).FirstOrDefault();
                    
                    if (day != null)
                    {
                        day.Lessons = day.Lessons.OrderBy(e => int.Parse(e.StartTime.Split('-', '/', '\\', '.', '_', ':').First())).ThenBy(a=> int.Parse(a.StartTime.Split(':').Last()));
                        days.Add(day);
                    }
                    else
                    {
                        days.Add(new ScheduleDay() { Id = Guid.Empty, DayDate = date.AddDays(i), Lessons = new List<Lesson>() });
                    }
                }
            return new ObjectResult(days);
        }


        [HttpGet("{date}")]
        [Produces("application/json")]
        public IActionResult Get(string date)
        {
            var parseDate = new List<int>();
            //var dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            var dateTime = new DateTime();
            try
            {
                parseDate = date.Split('-', '/', '\\', '.', '_', ':').Select(e => int.Parse(e)).ToList();
                dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            }
            catch (Exception e)
            {
                return UnprocessableEntity("Invalid format of date: " + e.Message);
            }
            var userGroupId = usersCollection
                .Find(a => a.Id == Guid.Parse(HttpContext.Session.GetString("userId")))
                .FirstOrDefault()
                .GroupId;
            var result = schedulesCollection.Find(a => a.DayDate == dateTime && a.GroupId == userGroupId).FirstOrDefault();
            //result.Lessons.OrderBy(e => e.StartTime.Split(':').Cast<int>().First()).ThenBy(a => a.StartTime.Split(':').Cast<int>().Last());
            return new ObjectResult(result);
        }

        
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromForm] LessonDTOPost value)
        {
            if (false /*Guid.Parse(HttpContext.Session.GetString("userId")) != староста*/)
            {
                return Forbid();
            }
            var currUser = usersCollection.Find(u=>u.Id == Guid.Parse(HttpContext.Session.GetString("userId"))).FirstOrDefault();
            var lesson = new Lesson(value);
            var parseDate = value.CreateDate.Split('-', '/', '\\', '.', '_', ':').Select(e => int.Parse(e)).ToList();
            lesson.CreateDate = new DateTime(parseDate[0], parseDate[1], parseDate[2]).Date;
            lesson.Id = Guid.NewGuid();
            var update = Builders<ScheduleDay>.Update.Push(s => s.Lessons, lesson);
            UpdateAll(lesson, update, true, currUser.GroupId);
            
            return Created("/schedules", lesson);
        }

        private void UpdateAll(Lesson lesson, UpdateDefinition<ScheduleDay> update, bool needCreate, Guid groupId)
        {
            var date = new DateTime();
            switch (lesson.RepeatCount)
            {
                case 1:
                    {
                        if (needCreate && schedulesCollection.CountDocuments(e => e.DayDate == lesson.CreateDate.Date && e.GroupId == groupId) == 0)
                        {
                            schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), DayDate = lesson.CreateDate.Date, Lessons = new List<Lesson>(), GroupId = groupId});
                        }
                        schedulesCollection.UpdateOne(s => s.DayDate == lesson.CreateDate.Date && s.GroupId == groupId, update);
                        break;
                    }
                case 7:
                    {
                        for (var i = 0; i < 30; i++)
                        {
                            if (needCreate && schedulesCollection.CountDocuments(e => e.DayDate == lesson.CreateDate.AddDays(7 * i).Date && e.GroupId == groupId) == 0)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), DayDate = lesson.CreateDate.AddDays(7 * i).Date, Lessons = new List<Lesson>(), GroupId = groupId });
                            }
                            date = lesson.CreateDate.AddDays(7 * i).Date;
                            schedulesCollection.UpdateOne(s => s.DayDate == date && s.GroupId == groupId, update);
                        }
                        break;
                    }
                case 14:
                    {
                        for (var i = 0; i < 15; i++)
                        {
                            if (needCreate && schedulesCollection.CountDocuments(e => e.DayDate == lesson.CreateDate.AddDays(14 * i).Date && e.GroupId == groupId) == 0)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), DayDate = lesson.CreateDate.AddDays(14 * i).Date, Lessons = new List<Lesson>(), GroupId = groupId });
                            }
                            date = lesson.CreateDate.AddDays(14 * i).Date;
                            schedulesCollection.UpdateOne(s => s.DayDate == date && s.GroupId == groupId, update);
                        }
                        break;
                    }
                case 30:
                    {

                        for (var i = 0; i < 7; i++)
                        {
                            if (needCreate && schedulesCollection.CountDocuments(e => e.DayDate == lesson.CreateDate.AddMonths(i).Date && e.GroupId == groupId) == 0)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), DayDate = lesson.CreateDate.AddMonths(i).Date, Lessons = new List<Lesson>(), GroupId = groupId });
                            }
                            date = lesson.CreateDate.AddMonths(i).Date;
                            schedulesCollection.UpdateOne(s => s.DayDate == date && s.GroupId == groupId, update);
                        }
                        break;
                    }
            }
        }

       
        [HttpPatch("{date}/{id}")]
        [Produces("application/json")]
        public IActionResult Patch(string date, Guid id, bool all, [FromForm] LessonDTOPatch value)
        {
            var parseDate = new List<int>();
            //var dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            var dateTime = new DateTime();
            try
            {
                parseDate = date.Split('-', '/', '\\', '.', '_', ':').Select(e => int.Parse(e)).ToList();
                dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            }
            catch (Exception e)
            {
                return UnprocessableEntity("Invalid format of date: " + e.Message);
            }
            var delete = Builders<ScheduleDay>.Update.PullFilter(d => d.Lessons, l => l.Id == id);
            var currUser = usersCollection.Find(u => u.Id == Guid.Parse(HttpContext.Session.GetString("userId"))).FirstOrDefault();

            var day = schedulesCollection.Find(n => n.DayDate == dateTime && n.GroupId == currUser.GroupId).FirstOrDefault();
            if (day == null)
            {
                return NotFound("Lesson with this id not found");
            }
            var lesson = day.Lessons.Where(l => l.Id == id).FirstOrDefault();
            if (lesson == null)
            {
                return NotFound("Lesson with this id not found");
            }
            lesson.Update(value);
            
            var push = Builders<ScheduleDay>.Update.Push(d => d.Lessons, lesson);
            if (all)
            {
                UpdateAll(lesson, delete, false, currUser.GroupId);
                UpdateAll(lesson, push, false, currUser.GroupId);
            }
            else
            {
                schedulesCollection.UpdateOne(n => n.DayDate == dateTime && n.GroupId == currUser.GroupId, delete);
                schedulesCollection.UpdateOne(n => n.DayDate == dateTime && n.GroupId == currUser.GroupId, push);
            }
            return new ObjectResult(lesson);
        }

        [HttpDelete("{date}/{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id, string date, bool all)
        {
            var parseDate = new List<int>();
            //var dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            var dateTime = new DateTime();
            try
            {
                parseDate = date.Split('-', '/', '\\', '.', '_', ':').Select(e => int.Parse(e)).ToList();
                dateTime = new DateTime(parseDate[0], parseDate[1], parseDate[2]);
            }
            catch (Exception e)
            {
                return UnprocessableEntity("Invalid format of date: " + e.Message);
            }
            var currUser = usersCollection.Find(u => u.Id == Guid.Parse(HttpContext.Session.GetString("userId"))).FirstOrDefault();

            var day = schedulesCollection.Find(n => n.DayDate == dateTime && n.GroupId == currUser.GroupId).FirstOrDefault();
            if (day == null)
            {
                return NotFound("Lesson with this id not found");
            }
            var lesson = day.Lessons.Where(l => l.Id == id).FirstOrDefault();
            if (lesson == null)
            {
                return NotFound("Lesson with this id not found");
            }
            var delete = Builders<ScheduleDay>.Update.PullFilter(d => d.Lessons, l => l.Id == id);
           
            if (all)
            {
                UpdateAll(lesson, delete, true, currUser.GroupId);
            }
            else
            {
                schedulesCollection.UpdateOne(n => n.DayDate == dateTime && n.GroupId == currUser.GroupId, delete);
            }
            return NoContent();
        }
    }


}
