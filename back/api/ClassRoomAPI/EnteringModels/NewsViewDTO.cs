using ClassRoomAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.EnteringModels
{
    public class NewsViewDTO
    {
        public NewsViewDTO(News news)
        {
            Id = news.Id;
            Title = news.Title;
            Content = news.Content;
            Date = news.Date;
        }

        public NewsViewDTO ()
        {

        }
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string AuthorName { get; set; }
        public string AuthorSurname { get; set; }
        public IEnumerable<Comment> Comments { get; set; } = new List<Comment>();
    }
}
