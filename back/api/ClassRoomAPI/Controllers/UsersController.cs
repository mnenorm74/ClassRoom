using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AspNetCore.Identity.Mongo.Model;
using ClassRoomAPI.EnteringModels;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IMongoCollection<User> usersCollection;
        private readonly RoleManager<MongoRole> _roleManager;
        private readonly SignInManager<MongoUser> _signInManager;
        private readonly UserManager<MongoUser> _userManager;
        private readonly IMongoCollection<Group> groupsCollection;

        public UsersController(IMongoDatabase db,
            UserManager<MongoUser> userManager,
            SignInManager<MongoUser> signInManager)
        {
            usersCollection = db.GetCollection<User>("users");
            groupsCollection = db.GetCollection<Group>("groups");
            _userManager = userManager;
            _signInManager = signInManager;
        }

        
        [HttpGet("current")]
        public IActionResult GetCurrent()
        {
            var user = usersCollection.Find(a => a.Id == Guid.Parse(HttpContext.Session.GetString("userId"))).FirstOrDefault();
            if (user == null)
            {
                return NotFound("User with this id not found");
            }
            //var a = System.IO.File.ReadAllBytes(Directory.GetCurrentDirectory() + "\\..\\..\\defaultAvatar.png");
            var leaderId = groupsCollection.Find(g => g.GroupId == user.GroupId).FirstOrDefault().GroupLeaderId;
            
            //var encodeAvatar = StorageController.Base64Encode(/*user.Avatar.ToString()*/a.ToString());
            return new ObjectResult(new CurrentUser() { Id = user.Id, Name = user.Name, Surname = user.Surname, Avatar = user.Avatar, Email = user.Email, Username = user.Username, IsLeader = user.Id == leaderId });
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        public IActionResult Get(Guid id)
        {
            var user = usersCollection.Find(a => a.Id == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound("User with this id not found");
            }
            return new ObjectResult(new User() { Id = user.Id, Name = user.Name, Surname = user.Surname, Avatar = user.Avatar, GroupId = user.GroupId });
        }

        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get()
        {
            var idCurr = Guid.Parse(HttpContext.Session.GetString("userId"));
            var currUser = usersCollection.Find(a => a.Id == idCurr).FirstOrDefault();
            if (currUser == null)
            {
                return NotFound("User with this id not found");
            }
            var users = usersCollection.Find(a => a.GroupId == currUser.GroupId).ToList();
            return Json(users);
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
        public IActionResult Post([FromForm]RegisterViewModel model)
        {
            var user = new User(model);
            var group = groupsCollection.Find(g => g.GroupId == user.GroupId).FirstOrDefault();
            if (group.Users.Count() == 0)
            {
                groupsCollection.UpdateOne(g => g.GroupId == user.GroupId, Builders<Group>.Update.Set(e => e.GroupLeaderId, user.Id));
            }
            var update = Builders<Group>.Update.Push(g => g.Users, user.Id);
            var updateRes = groupsCollection.UpdateOne(g => g.GroupId == user.GroupId, update);
            if (updateRes.MatchedCount == 0)
            {
                return NotFound("Group with this id not found");
            }
            usersCollection.InsertOne(user);

            if (ModelState.IsValid)
            {
                var userAccount = new MongoUser { UserName = model.Username, Email = model.Email };
                var result = _userManager.CreateAsync(userAccount, model.Password).Result;
                if (result.Succeeded)
                {
                    _signInManager.SignInAsync(userAccount, isPersistent: false).Wait();
                    HttpContext.Session.SetString("userId", usersCollection
                        .Find(a => a.Username == model.Username)
                        .FirstOrDefault()
                        .Id
                        .ToString());
                    //return new ObjectResult(user);
                }
                //AddErrors(result);
            }
            return new ObjectResult(user);
        }

        [HttpPatch("{id}/avatars")]
        [Produces("application/json")]
        public IActionResult PatchAvatar(Guid id, [FromForm]IFormFile image)
        {
            var result = new List<byte>();
            using (var reader = image.OpenReadStream())
            {
                //var fileContent = reader.ReadToEnd();
                //var image = Image.FromStream(reader)
                var bytes = new byte[image.Length];
                for(var i = 0; i < image.Length; i++)
                {
                    bytes[i] = (byte)reader.ReadByte();
                }

                var update = Builders<User>.Update.Set(n => n.Avatar, bytes);
                usersCollection.UpdateOne(n => n.Id == id, update);
                result = bytes.ToList();
            }
            return new ObjectResult(result);
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
        public IActionResult Patch(Guid id, [FromBody] UserDTO value)
        {
            if (Guid.Parse(HttpContext.Session.GetString("userId")) != id)
            {
                return Forbid();
            }
            var arr = new List<UpdateDefinition<User>>();
            var update = Builders<User>.Update;
            //if (value.Avatar != null)
            //{
            //    arr.Add(update.Set(n => n.Avatar, value.Avatar));
            //}
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
            if (Guid.Parse(HttpContext.Session.GetString("userId")) != id)
            {
                return Forbid();
            }
            var user = usersCollection.Find(u => u.Id == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound("User with this id not found");
            }
            var userIdentity = _userManager.FindByEmailAsync(user.Email).Result;

            _userManager.DeleteAsync(userIdentity);
            var update = Builders<Group>.Update.Pull(g => g.Users, id);
            groupsCollection.UpdateOne(g => g.GroupId == user.GroupId, update);
            usersCollection.DeleteOne(a => a.Id == id);
            HttpContext.Session.Remove("userId");
            return NoContent();
        }
    }
}
