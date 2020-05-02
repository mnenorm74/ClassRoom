using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.Models
{
    public class FilePath
    {
        public string Path { get; set; }
        public bool IsFile { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
