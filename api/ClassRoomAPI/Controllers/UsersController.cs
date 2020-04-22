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
            var user = new User() { Id = Guid.NewGuid(), Fullname="Fedot", Username="SuperFedot1999", Avatar = new byte[0]};
            return new ObjectResult(user);
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
            var user = new User() { Id = id, Username = "...", Fullname = "...", Avatar = new byte[0] };
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
