using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
            Comments = new List<Guid>(news.Comments);
        }
        public News()
        {
        }
        
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public Guid AuthorId { get; set; }
        public IEnumerable<Guid> Comments { get; set; } = new List<Guid>();

        //public void Update(News news)
        //{
        //    if (news.Title != Title && news.Title != null)
        //    {
        //        Title = news.Title;
        //    }
        //    if (news.Content != Content && news.Content != null)
        //    {
        //        Content = news.Content;
        //    }
        //    if (news.Date != Date && news.Date != DateTime.MinValue)
        //    {
        //        Date = news.Date;
        //    }
        //}
    }
}
