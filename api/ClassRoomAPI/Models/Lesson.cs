using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.Models
{
    public class Lesson
    {
        public Lesson(Lesson lesson)
        {
            Id = lesson.Id;
            Date = lesson.Date;
            StartTime = lesson.StartTime;
            EndTime = lesson.EndTime;
            Title = lesson.Title;
            Audience = lesson.Audience;
            Teacher = lesson.Teacher;
        }
        public Lesson()
        {

        }
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Title { get; set; }
        public string Audience { get; set; }
        public string Teacher { get; set; }

        public void Update(Lesson lesson)
        {
            if (lesson.Date != Date && lesson.Date != DateTime.MinValue)
            {
                Date = lesson.Date;
            }
            if (lesson.StartTime != StartTime && lesson.StartTime != null)
            {
                StartTime = lesson.StartTime;
            }
            if (lesson.EndTime != EndTime && lesson.EndTime != null)
            {
                EndTime = lesson.EndTime;
            }
            if (lesson.Title != Title && lesson.Title != null)
            {
                Title = lesson.Title;
            }
            if (lesson.Audience != Audience && lesson.Audience != null)
            {
                Audience = lesson.Audience;
            }
            if (lesson.Teacher != Teacher && lesson.Teacher != null)
            {
                Teacher = lesson.Teacher;
            }
        }
    }
}
