using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.Models
{
    public class FilePath
    {
        [BsonId]
        public string Path { get; set; }
        [Required]
        public bool IsFile { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
    }
}
