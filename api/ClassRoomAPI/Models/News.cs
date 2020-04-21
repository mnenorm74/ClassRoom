using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.Models
{
    public class News
    {
        public News(News news)
        {
            Id = news.Id;
            Title = news.Title;
            Content = news.Content;
            Date = news.Date;
            AuthorId = news.AuthorId;
            Comments = new List<Comment>(news.Comments);
        }
        public News()
        {
        }
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public Guid AuthorId { get; set; }
        public IEnumerable<Comment> Comments { get; set; } = new List<Comment>();
    }
}
