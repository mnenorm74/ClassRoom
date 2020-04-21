using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SchedulesController : Controller
    {
        // GET: /schedules
        [HttpGet]
        [Produces("application/json")]
        public IActionResult Get()
        {
            var days = new List<ScheduleDay>();
            var today = DateTime.Today;
            for (var i = 0; i < 7; i++)
            {
                //данные берать из БД
                days.Add(new ScheduleDay() {Id = Guid.NewGuid(), Date = today.AddDays(i), Lessons = new List<Lesson>()});
            }

            return new ObjectResult(days);
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        public IActionResult Get(Guid id)
        {
            var result = new List<ScheduleDay>();
            //ищем в БД по id
            return new ObjectResult(new ScheduleDay() { Id = Guid.NewGuid() });
        }

        [HttpPost]
        public IActionResult Post([FromBody] ScheduleDay value)
        {
            //добавляем в БД
            return Created("/schedules", value.Id);
        }
    }


}
