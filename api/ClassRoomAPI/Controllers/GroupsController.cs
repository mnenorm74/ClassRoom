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
    public class GroupsController : Controller
    {
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
            return new ObjectResult(group);
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id)
        {
            //если пустая
            groupsCollection.DeleteOne(a => a.GroupId == id);
            return NoContent();
        }
    }
}
