using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ClassRoomAPI.Models
{
    public class User
    {
        public User(User user)
        {
            Id = user.Id;
            Username = user.Username;
            Fullname = user.Fullname;
            Avatar = user.Avatar;
        }
        public User()
        {

        }
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }
        public byte[] Avatar { get; set; } /*сделать дефолтную фотку*/
        public void Update(User user)
        {
            if(user.Username != Username && user.Username != "")
            {
                Username = user.Username;
            }
            if(user.Fullname != Fullname && user.Fullname != "")
            {
                Fullname = user.Fullname;
            }
            if(user.Avatar != Avatar && user.Avatar != null)
            {
                Avatar = user.Avatar;
            }
        }
    }
}
