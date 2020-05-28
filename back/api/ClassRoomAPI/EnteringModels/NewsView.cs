using ClassRoomAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.EnteringModels
{
    public class NewsView
    {
        public NewsView(News news)
        {
            Id = news.Id;
            Title = news.Title;
            Content = news.Content;
            Date = news.Date;
            AuthorId = news.AuthorId;
        }

        public NewsView ()
        {

        }
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorSurname { get; set; }
        public IEnumerable<Comment> Comments { get; set; } = new List<Comment>();
    }
}
