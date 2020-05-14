using System.ComponentModel.DataAnnotations;

namespace ClassRoomAPI.Controllers
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
