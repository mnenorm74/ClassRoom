using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.EnteringModels
{
    public class GroupDTO
    {
        //public Guid? GroupLeaderId { get; set; }
        public string GroupName { get; set; }
        public string University { get; set; }
        public string Faculty { get; set; }
    }
}
