using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.EnteringModels
{
    public class CommentView
    {
        public string Content { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string Name { get; set; }
        public string Surname { get; set; }
        public byte[] Avatar { get; set; }
    }
}
