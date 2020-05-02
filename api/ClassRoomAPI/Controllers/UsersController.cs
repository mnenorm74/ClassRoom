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
        public UsersController(IMongoDatabase db)
        {
            usersCollection = db.GetCollection<User>("users");
        }

        [HttpGet("current")]
        public IActionResult Get([FromHeader] Guid Authorization)
        {
            //получить из бд юзера по Guid в заголовке
            return new ObjectResult(usersCollection.Find(a => a.Id == Authorization).FirstOrDefault());
        }

        [HttpGet]
        public IActionResult Get1([FromHeader] Guid Authorization)
        {
            //найти в бд по id пользователя его группу
            //получить из бд всех юзеров по группе
            var group = usersCollection.Find(a => a.Id == Authorization).FirstOrDefault().GroupId;
            return new ObjectResult(usersCollection.Find(a => a.GroupId == group).ToList());
        }

        [HttpPost]
        public IActionResult Post([FromBody] User value)
        {
            var user = new User(value);
            user.Id = Guid.NewGuid();
            usersCollection.InsertOne(user);
            //добавить в бд
            return new ObjectResult(user);
        }

        [HttpPatch("{id}")]
        [Produces("application/json")]
        public IActionResult Patch(Guid id, [FromBody] User value)
        {
            //найти юзера в бд по id и удалить
            var user = new User() { Id = id, Username = "...", Name = "...", Avatar = new byte[0], Email="", GroupId=Guid.NewGuid(), Patronymic="", Surname="" };
            user.Update(value);
            //добавить измененного юзера
            return new ObjectResult(user);
        }

        [HttpDelete("{id}")]
        [Produces("application/json")]
        public IActionResult Delete(Guid id)
        {
            //удалить из базы по id
            usersCollection.DeleteOne(a => a.Id == id);
            return NoContent();
        }
    }
}
