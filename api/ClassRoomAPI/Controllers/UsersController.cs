using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IMongoCollection<User> usersCollection;
        private readonly IMongoCollection<Group> groupsCollection;
        public UsersController(IMongoDatabase db)
        {
            usersCollection = db.GetCollection<User>("users");
            groupsCollection = db.GetCollection<Group>("groups");
        }

        [HttpGet("current")]
        public IActionResult GetCurrent([FromHeader] Guid Authorization)
        {
            var user = usersCollection.Find(a => a.Id == Authorization).FirstOrDefault();
            return new ObjectResult(new CurrentUser() { Id = user.Id, Name = user.Name, Surname = user.Surname, Avatar = user.Avatar });
        }

        [HttpGet]
        public IActionResult Get([FromHeader] Guid Authorization)
        {
            var currUser = usersCollection.Find(a => a.Id == Authorization).FirstOrDefault();
            var users = usersCollection.Find(a => a.GroupId == currUser.GroupId).ToList();
            return new ObjectResult(users);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User value)
        {
            var user = new User(value);
            user.Id = Guid.NewGuid();
            usersCollection.InsertOne(user);
            var update = Builders<Group>.Update.Push(g => g.Users, user.Id);
            groupsCollection.UpdateOne(g => g.GroupId == user.GroupId, update);
            return new ObjectResult(user);
        }
        
        [HttpPatch("{id}")]
        [Produces("application/json")]
        public IActionResult Patch(Guid id, [FromBody] User value)
        {
            var arr = new List<UpdateDefinition<User>>();
            var update = Builders<User>.Update;
            if (value.Avatar != null)
            {
                arr.Add(update.Set(n => n.Avatar, value.Avatar));
            }
            if (value.Name != null)
            {
                arr.Add(update.Set(n => n.Name, value.Name));
            }
            if (value.Surname != null)
            {
                arr.Add(update.Set(n => n.Surname, value.Surname));
            }
            if (value.Patronymic != null)
            {
                arr.Add(update.Set(n => n.Patronymic, value.Patronymic));
            }
            if (value.Username != null)
            {
                arr.Add(update.Set(n => n.Username, value.Username));
            }
            if (value.Email != null)
            {
                arr.Add(update.Set(n => n.Email, value.Email));
            }
            usersCollection.UpdateOne(n => n.Id == id, update.Combine(arr));
            var user = usersCollection.Find(u => u.Id == id).FirstOrDefault();
            return new ObjectResult(user);
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id)
        {
            var user = usersCollection.Find(u => u.Id == id).FirstOrDefault();
            if(groupsCollection.Find(g=>g.GroupId == user.GroupId).FirstOrDefault() != null)
            {
                var update = Builders<Group>.Update.Pull(g => g.Users, id);
                groupsCollection.UpdateOne(g => g.GroupId == user.GroupId, update);
            }
            usersCollection.DeleteOne(a => a.Id == id);
            return NoContent();
        }
    }
}
