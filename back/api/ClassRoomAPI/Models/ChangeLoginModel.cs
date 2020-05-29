using System.ComponentModel.DataAnnotations;

namespace ClassRoomAPI.Controllers
{
    public class ChangeLoginModel
    {
        [Required]
        public string NewLogin { get; set; }
    }
}