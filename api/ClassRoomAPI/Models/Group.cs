using ClassRoomAPI.EnteringModels;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ClassRoomAPI.Models
{
    public class Group
    {
        public Group(GroupDTO group)
        {
            //GroupId = group.GroupId;
            GroupLeaderId = group.GroupLeaderId;
            GroupName = group.GroupName;
            //Users = group.Users;
        }
        public Group()
        {

        }
        [BsonId]
        public Guid GroupId { get; set; }
        [Required]
        public Guid? GroupLeaderId { get; set; }
        [Required]
        public string GroupName { get; set; }
        public IEnumerable<Guid> Users { get; set; }
    }
}
