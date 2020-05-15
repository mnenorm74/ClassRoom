using AspNetCore.Identity.Mongo.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ClassRoomAPI.Models
{
    public class AccountModel : MongoUser
    {
        public Guid userId { get; set; }
    }
}
