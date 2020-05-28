using ClassRoomAPI.Controllers;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
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
            Name = user.Name;
            Avatar = user.Avatar;
            Surname = user.Surname;
            Patronymic = user.Patronymic;
            GroupId = user.GroupId;
            Email = user.Email;
        }
        public User(RegisterViewModel model)
        {
            GroupId = model.GroupId; //???
            Name = model.Name;
            Surname = model.Surname;
            Avatar = File.ReadAllBytes(Directory.GetCurrentDirectory() + "\\..\\..\\defaultAvatar.png");
            Username = model.Username;
            Patronymic = model.Patronymic == null ? "" : model.Patronymic;
            Email = model.Email;
            Id = Guid.NewGuid();
        }
        public User()
        {

        }
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public byte[] Avatar { get; set; } /*сделать дефолтную фотку*/
        public Guid GroupId { get; set; }
        public string Email { get; set; }

        public void Update(User user)
        {
            if(user.Username != Username && user.Username != null)
            {
                Username = user.Username;
            }
            if(user.Name != Name && user.Name != null)
            {
                Name = user.Name;
            }
            if (user.Surname != Surname && user.Surname != null)
            {
                Surname = user.Surname;
            }
            if (user.Patronymic != Patronymic && user.Patronymic != null)
            {
                Patronymic = user.Patronymic;
            }
            if (user.Avatar != Avatar && user.Avatar != null)
            {
                Avatar = user.Avatar;
            }
            if (user.GroupId != GroupId && user.GroupId != null)
            {
                GroupId = user.GroupId;
            }
            if (user.Email != Email && user.Email != null)
            {
                Email = user.Email;
            }
        }
    }
}
