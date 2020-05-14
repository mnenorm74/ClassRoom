using System;
using System.Collections.Generic;
using System.IO;
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
    public class GroupsController : Controller
    {
        public static string storageDirectory = Directory.GetCurrentDirectory() + "\\..\\..\\storage\\";
        public static string avatarsDirectory = Directory.GetCurrentDirectory() + "\\..\\..\\avatars\\";
        private readonly IMongoCollection<Group> groupsCollection;
        public GroupsController(IMongoDatabase db)
        {
            groupsCollection = db.GetCollection<Group>("groups");
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     POST /groups
        ///     {
        ///        "groupLeaderId": "guid",
        ///        "groupName": "string"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        [Produces("application/json")]
        public IActionResult Post([FromBody] Group value)
        {
            var group = new Group(value);
            group.GroupId = Guid.NewGuid();
            group.Users = new List<Guid>();
            groupsCollection.InsertOne(group);
            var storageDir = new DirectoryInfo(storageDirectory + group.GroupId);
            var avatarsDir = new DirectoryInfo(avatarsDirectory + group.GroupId);
            storageDir.Create();
            avatarsDir.Create();
            return new ObjectResult(group);
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id)
        {
            var group = groupsCollection.Find(g => g.GroupId == id).FirstOrDefault();
            if(group == null)
            {
                return NotFound("Group with this id not found");
            }
            groupsCollection.DeleteOne(g => g.GroupId == id);
            var storageDir = new DirectoryInfo(storageDirectory + group.GroupId);
            var avatarsDir = new DirectoryInfo(avatarsDirectory + group.GroupId);
            storageDir.Delete();
            avatarsDir.Delete();
            return NoContent();
        }

        //для тестов
        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get()
        {
            var result = groupsCollection.Find(g => true).ToList();
            return new ObjectResult(result);
        }
    }
}
