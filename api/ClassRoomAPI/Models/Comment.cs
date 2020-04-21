using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.Models
{
    public class Comment
    {
        public Comment (Comment comment)
        {
            Id = comment.Id;
            Content = comment.Content;
            Date = comment.Date;
            AuthorId = comment.AuthorId;
    }
        public Comment()
        {

        }
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public Guid AuthorId { get; set; }
    }
}
