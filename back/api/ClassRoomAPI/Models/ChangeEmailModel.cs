using System.ComponentModel.DataAnnotations;

namespace ClassRoomAPI.Controllers
{
    public class ChangeEmailModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string NewEmail { get; set; }
    }
}