using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.EnteringModels
{
    public class GroupDTO
    {
        [Required]
        public Guid? GroupLeaderId { get; set; }
        [Required]
        public string GroupName { get; set; }
    }
}
