using System;
using System.Collections.Generic;
using System.Text;

namespace ClassRoomAPI.Models
{
    public class Group
    {
        public Group(Group group)
        {
            GroupId = group.GroupId;
            GroupLeaderId = group.GroupLeaderId;
            Users = group.Users;
        }
        public Group()
        {

        }
        public Guid GroupId { get; set; }
        public Guid GroupLeaderId { get; set; }
        public IEnumerable<Guid> Users { get; set; }
    }
}
