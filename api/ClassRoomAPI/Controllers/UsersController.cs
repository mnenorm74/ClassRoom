using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Mvc;


namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        [HttpGet("current")]
        public IActionResult Get([FromHeader] Guid Authorization)
        {
            //получить из бд юзера по Guid в заголовке
            var user = new CurrentUser() { Id = Authorization, Name="Fedot", Surname="Ivanov", Avatar = new byte[0]};
            return new ObjectResult(user);
        }

        [HttpGet]
        public IActionResult Get1([FromHeader] Guid Authorization)
        {
            var result = new List<User>();
            //найти в бд по id пользователя его группу
            //получить из бд всех юзеров по группе
            for (var i = 0; i < 20; i++)
            {
                result.Add(new User() { Id = Guid.NewGuid(), Name="", Surname="", Patronymic="",Email="${i}", Username="", Avatar=new byte[0], GroupId=Guid.NewGuid()});
            }
            return new ObjectResult(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User value)
        {
            var user = new User(value);
            user.Id = Guid.NewGuid();
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
            return NoContent();
        }
    }
}
