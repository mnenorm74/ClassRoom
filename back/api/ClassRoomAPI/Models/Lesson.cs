using ClassRoomAPI.EnteringModels;
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
            CreateDate = lesson.CreateDate;
            StartTime = lesson.StartTime;
            EndTime = lesson.EndTime;
            Title = lesson.Title;
            Audience = lesson.Audience;
            Teacher = lesson.Teacher;
            Type = lesson.Type;
            RepeatCount = lesson.RepeatCount;
        }
        public Lesson(LessonDTOPost lesson)
        {
            CreateDate = lesson.CreateDate.Date;
            StartTime = lesson.StartTime;
            EndTime = lesson.EndTime;
            Title = lesson.Title;
            Audience = lesson.Audience;
            Teacher = lesson.Teacher;
            Type = lesson.Type;
            RepeatCount = lesson.RepeatCount;
        }
        public Lesson()
        {

        }
        public Guid Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Title { get; set; }
        public string Audience { get; set; }
        public string Teacher { get; set; }
        public int RepeatCount { get; set; } = 1;
        public string Type { get; set; }

        public void Update(LessonDTOPatch lesson)
        {
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
            if (lesson.Type != Type && lesson.Type != null)
            {
                Type = lesson.Type;
            }
        }
    }
}
