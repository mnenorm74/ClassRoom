using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.EnteringModels
{
    public class LessonDTOPost
    {
        public string CreateDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Title { get; set; }
        public string Audience { get; set; }
        public string Teacher { get; set; }
        public int RepeatCount { get; set; } = 1;
        public string Type { get; set; }
    }
    public class LessonDTOPatch
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Title { get; set; }
        public string Audience { get; set; }
        public string Teacher { get; set; }
        public string Type { get; set; }
    }
}
