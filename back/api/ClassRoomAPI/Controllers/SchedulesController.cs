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
            //var q = schedulesCollection.Find(e => e.GroupId == userGroupId).ToList();
            //foreach (var e in q)
            //{
                for (var i = 0; i < count; i++)
                {
                    //var a1 = date.AddDays(i);
                    //var s = new DateTime();
                    var day = schedulesCollection.Find(a => a.DayDate == date.AddDays(i).Date && a.GroupId == userGroupId).FirstOrDefault();
                    //var day2 = schedulesCollection.Find(a => a.Date.Year == date.AddDays(i).Year && a.Date.Month == date.AddDays(i).Month && a.Date.Day == date.AddDays(i).Day).FirstOrDefault();
                    //var a = date.AddDays(i).ToLongDateString();


                    //if (e.DayDate.Equals(date.AddDays(i)))
                    //{
                    //    day = e;
                    //}


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
            //}
            //if (!Response.Headers.ContainsKey("Access-Control-Allow-Origin"))
            //var json = JsonSerializer.Serialize(days);
            return new ObjectResult(days);
        }

        //private int Compare(Lesson a, Lesson b)
        //{
        //    var timeA = a.StartTime.Split(':').Cast<int>().ToArray();
        //    var timeB = b.StartTime.Split(':').Cast<int>().ToArray();
        //    if (timeA[0] > timeB[0]) return 1;
        //    if (timeA[0] == timeB[0])
        //    {
        //        if (timeA[1] > timeB[1]) return 1;
        //        if (timeA[1] == timeB[1]) return 0;
        //        if (timeA[1] < timeB[1]) return -1;
        //    }
        //    if (timeA[0] < timeB[0]) return -1;
        //    return 0;
        //}

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

        /// <remarks>
        /// Sample request:
        ///
        ///     POST /schedules
        ///     {
        ///        createDate: "DateTime"
        ///        startTime: "10:15"
        ///        endTime: "12:00"
        ///        title: "string"
        ///        audience:"string"
        ///        teacher:"string"
        ///        repeatCount: 1(один раз) или 7 (каждую неделю) или 14 (каждые 2 недели) или 30 (каждый месяц)
        ///        type: "lect" или "lab" или "pract"
        ///     }
        /// </remarks>
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
            //if (schedulesCollection.CountDocuments(e => e.Date == lesson.CreateDate) == 0)
            //{
            //    schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), Date = lesson.CreateDate, Lessons = new List<Lesson>() });
            //}
            var update = Builders<ScheduleDay>.Update.Push(s => s.Lessons, lesson);
            UpdateAll(lesson, update, true, currUser.GroupId);
            //schedulesCollection.UpdateOne(s => s.Date == lesson.Date, update);
            //var a = schedulesCollection.Find(a => a.Date == lesson.CreateDate.AddDays(7)).FirstOrDefault();
            return Created("/schedules", lesson);
        }

        private void UpdateAll(Lesson lesson, UpdateDefinition<ScheduleDay> update, bool needCreate, Guid groupId)
        {
            var date = new DateTime();
            switch (lesson.RepeatCount)
            {
                case 1:
                    {
                        if (needCreate && schedulesCollection.CountDocuments(e => e.DayDate == lesson.CreateDate) == 0)
                        {
                            schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), DayDate = lesson.CreateDate, Lessons = new List<Lesson>(), GroupId = groupId});
                        }
                        schedulesCollection.UpdateOne(s => s.DayDate == lesson.CreateDate, update);
                        break;
                    }
                case 7:
                    {
                        for (var i = 0; i < 30; i++)
                        {
                            if (needCreate && schedulesCollection.CountDocuments(e => e.DayDate == lesson.CreateDate.AddDays(7 * i)) == 0)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), DayDate = lesson.CreateDate.AddDays(7 * i), Lessons = new List<Lesson>(), GroupId = groupId });
                            }
                            date = lesson.CreateDate.AddDays(7 * i);
                            schedulesCollection.UpdateOne(s => s.DayDate == date, update);
                        }
                        break;
                    }
                case 14:
                    {
                        for (var i = 0; i < 15; i++)
                        {
                            if (needCreate && schedulesCollection.CountDocuments(e => e.DayDate == lesson.CreateDate.AddDays(14 * i)) == 0)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), DayDate = lesson.CreateDate.AddDays(14 * i), Lessons = new List<Lesson>(), GroupId = groupId });
                            }
                            date = lesson.CreateDate.AddDays(14 * i);
                            schedulesCollection.UpdateOne(s => s.DayDate == date, update);
                        }
                        break;
                    }
                case 30:
                    {

                        for (var i = 0; i < 7; i++)
                        {
                            if (needCreate && schedulesCollection.CountDocuments(e => e.DayDate == lesson.CreateDate.AddMonths(i)) == 0)
                            {
                                schedulesCollection.InsertOne(new ScheduleDay() { Id = Guid.NewGuid(), DayDate = lesson.CreateDate.AddMonths(i), Lessons = new List<Lesson>(), GroupId = groupId });
                            }
                            date = lesson.CreateDate.AddMonths(i);
                            schedulesCollection.UpdateOne(s => s.DayDate == date, update);
                        }
                        break;
                    }
            }
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     PATCH /schedules/{date}/{id}?all={true}
        ///     {
        ///        startTime: "10:15"
        ///        endTime: "12:00"
        ///        title: "string"
        ///        audience:"string"
        ///        teacher:"string"
        ///        type: "lect" или "lab" или "pract"
        ///     }
        /// </remarks>
        [HttpPatch("{date}/{id}")]
        [Produces("application/json")]
        public IActionResult Patch(string date, Guid id, bool all, [FromForm] LessonDTOPatch value)
        {
            if (false /*Guid.Parse(HttpContext.Session.GetString("userId")) != староста*/)
            {
                return Forbid();
            }
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

            var day = schedulesCollection.Find(n => n.DayDate == dateTime).FirstOrDefault();
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
                UpdateAll(lesson, delete, false, Guid.Empty);
                UpdateAll(lesson, push, false, Guid.Empty);
            }
            else
            {
                schedulesCollection.UpdateOne(n => n.DayDate == dateTime, delete);
                schedulesCollection.UpdateOne(n => n.DayDate == dateTime, push);
            }
            return new ObjectResult(lesson);
        }

        [HttpDelete("{date}/{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id, string date, bool all)
        {
            if (false /*Guid.Parse(HttpContext.Session.GetString("userId")) != староста*/)
            {
                return Forbid();
            }
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

            var day = schedulesCollection.Find(n => n.DayDate == dateTime).FirstOrDefault();
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
                UpdateAll(lesson, delete, true, Guid.Empty);
            }
            else
            {
                schedulesCollection.UpdateOne(n => n.DayDate == dateTime, delete);
            }
            return NoContent();
        }
    }


}
