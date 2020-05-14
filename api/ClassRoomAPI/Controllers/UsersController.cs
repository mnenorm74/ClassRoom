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
        public IActionResult GetCurrent([FromHeader] Guid MyHeader)
        {
            var user = usersCollection.Find(a => a.Id == MyHeader).FirstOrDefault();
            if (user == null)
            {
                return NotFound("User with this id not found");
            }
            return new ObjectResult(new CurrentUser() { Id = user.Id, Name = user.Name, Surname = user.Surname, Avatar = user.Avatar });
        }

        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get([FromHeader] Guid MyHeader)
        {
            var currUser = usersCollection.Find(a => a.Id == MyHeader).FirstOrDefault();
            if (currUser == null)
            {
                return NotFound("User with this id not found");
            }
            var users = usersCollection.Find(a => a.GroupId == currUser.GroupId).ToList();
            return new ObjectResult(users);
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     POST /users
        ///     {
        ///        username="string",
        ///        name: "string",
        ///        surname: "string",
        ///        patronymic: "string",
        ///        avatar: image (byte[] ?)
        ///        groupId: "Guid",
        ///        email="string"
        ///     }
        /// </remarks>
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromBody] User value)
        {
            var user = new User(value);
            user.Id = Guid.NewGuid();
            var update = Builders<Group>.Update.Push(g => g.Users, user.Id);
            var updateRes = groupsCollection.UpdateOne(g => g.GroupId == user.GroupId, update);
            if (updateRes.MatchedCount == 0)
            {
                return NotFound("Group with this id not found");
            }
            usersCollection.InsertOne(user);
            return new ObjectResult(user);
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     PATCH /users/{id}
        ///     {
        ///        username="string",
        ///        name: "string",
        ///        surname: "string",
        ///        patronymic: "string",
        ///        avatar: image (byte[] ?),
        ///        email="string"
        ///     }
        /// </remarks>
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
            if(arr.Count == 0)
            {
                return UnprocessableEntity("Body cannot be empty");
            }
            usersCollection.UpdateOne(n => n.Id == id, update.Combine(arr));
            var user = usersCollection.Find(u => u.Id == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound("User with this id not found");
            }
            return new ObjectResult(user);
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id)
        {
            var user = usersCollection.Find(u => u.Id == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound("User with this id not found");
            }
            var update = Builders<Group>.Update.Pull(g => g.Users, id);
            groupsCollection.UpdateOne(g => g.GroupId == user.GroupId, update);
            usersCollection.DeleteOne(a => a.Id == id);
            return NoContent();
        }
    }
}
