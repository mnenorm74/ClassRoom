using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.Models
{
    public class ScheduleDay
    {
        public Guid Id { get; set; }
        [BsonDateTimeOptions(DateOnly = true)]
        public DateTime DayDate { get; set; }
        public IEnumerable<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
}
