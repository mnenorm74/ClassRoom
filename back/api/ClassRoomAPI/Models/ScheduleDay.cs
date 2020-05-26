using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.Models
{
    public class ScheduleDay
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public IEnumerable<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
}
