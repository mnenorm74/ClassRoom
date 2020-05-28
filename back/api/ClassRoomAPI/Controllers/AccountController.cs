using AspNetCore.Identity.Mongo.Model;
using ClassRoomAPI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ClassRoomAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<MongoUser> _userManager;
        private readonly IMongoCollection<User> usersCollection;
        private readonly SignInManager<MongoUser> _signInManager;

        public AccountController(IMongoDatabase db,
            UserManager<MongoUser> userManager,
            SignInManager<MongoUser> signInManager)
        {
            usersCollection = db.GetCollection<User>("users");
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [TempData]
        public string ErrorMessage { get; set; }

        [HttpGet]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public IActionResult CheckAuthorization()
        {
            var test = HttpContext.Session.GetString("userId");
            if (test is null)
            {
                return NotFound();
            } else
            {
                return Ok();
            }
            
        }

        [HttpPost("login")]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public IActionResult Login([FromForm]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = _signInManager.PasswordSignInAsync(model.Username, model.Password,
                    model.RememberMe, lockoutOnFailure: false).Result;
                if (result.Succeeded)
                {
                    var user = usersCollection
                        .Find(a => a.Username == model.Username)
                        .FirstOrDefault()
                        .Id
                        .ToString();
                    HttpContext.Session.SetString("userId", user);
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            return NotFound();
        }

        //[HttpPost("register")]
        ////[AllowAnonymous]
        ////[ValidateAntiForgeryToken]
        //public IActionResult Register([FromForm]RegisterViewModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var user = new MongoUser {UserName = model.Username, Email = model.Email };
        //        var result = _userManager.CreateAsync(user, model.Password).Result;
        //        if (result.Succeeded)
        //        {
        //            _signInManager.SignInAsync(user, isPersistent: false).Wait();
        //            HttpContext.Session.SetString("userId", usersCollection
        //                .Find(a => a.Username == model.Username)
        //                .FirstOrDefault()
        //                .Id
        //                .ToString());
        //            return new ObjectResult(user);
        //        }
        //    }
        //    return NotFound();
        //}

        [HttpPost("changePassword")]
        public IActionResult ChangePass([FromForm]ChangePasswordModel model)
        {
            var id = HttpContext.Session.GetString("userId");
            var email = usersCollection.Find(a => a.Id == Guid.Parse(id)).FirstOrDefault().Email; 
            var user = _userManager.FindByEmailAsync(email).Result;
            if (user != null)
            {
                IdentityResult result =
                    _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword).Result;
                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            return NotFound();
        }

        [HttpPost("changeEmail")]
        public IActionResult ChangeEmail([FromForm]ChangeEmailModel model)
        {
            var id = HttpContext.Session.GetString("userId");
            var email = usersCollection.Find(a => a.Id == Guid.Parse(id)).FirstOrDefault().Email;
            var user = _userManager.FindByEmailAsync(email).Result;
            if (user != null)
            {
                user.Email = model.NewEmail;
                var update = Builders<User>.Update.Set(s => s.Email, model.NewEmail);
                usersCollection.UpdateOne(a => a.Email == email, update);
                var result = _userManager.UpdateAsync(user).Result;
                if (result.Succeeded)
                {
                    return Ok();
                }
            }
            return NotFound();
        }

        [HttpPost("logout")]
        //[ValidateAntiForgeryToken]
        public IActionResult Logout()
        {
            var a = _signInManager.SignOutAsync();
            HttpContext.Session.Remove("userId");
            return Ok();
        }

        //[HttpPost("externallogin")]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public IActionResult ExternalLogin(string provider, string returnUrl = null)
        //{
        //    // Request a redirect to the external login provider.
        //    var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });
        //    var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        //    return Challenge(properties, provider);
        //}

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        //{
        //    if (remoteError != null)
        //    {
        //        ErrorMessage = $"Error from external provider: {remoteError}";
        //        return RedirectToAction(nameof(Login));
        //    }
        //    var info = await _signInManager.GetExternalLoginInfoAsync();
        //    if (info == null)
        //    {
        //        return RedirectToAction(nameof(Login));
        //    }

        //    // Sign in the user with this external login provider if the user already has a login.
        //    var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
        //    if (result.Succeeded)
        //    {
        //        _logger.LogInformation("User logged in with {Name} provider.", info.LoginProvider);
        //        return RedirectToLocal(returnUrl);
        //    }
        //    //if (result.IsLockedOut)
        //    //{
        //    //    return RedirectToAction(nameof(Lockout));
        //    //}
        //    else
        //    {
        //        // If the user does not have an account, then ask the user to create an account.
        //        ViewData["ReturnUrl"] = returnUrl;
        //        ViewData["LoginProvider"] = info.LoginProvider;
        //        var email = info.Principal.FindFirstValue(ClaimTypes.Email);
        //        return View("ExternalLogin", new ExternalLoginViewModel { Email = email });
        //    }
        //}

        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> ExternalLoginConfirmation(ExternalLoginViewModel model, string returnUrl = null)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        // Get the information about the user from the external login provider
        //        var info = await _signInManager.GetExternalLoginInfoAsync();
        //        if (info == null)
        //        {
        //            throw new ApplicationException("Error loading external login information during confirmation.");
        //        }
        //        var user = new MongoUser { UserName = model.Email, Email = model.Email };
        //        var result = await _userManager.CreateAsync(user);
        //        if (result.Succeeded)
        //        {
        //            result = await _userManager.AddLoginAsync(user, info);
        //            if (result.Succeeded)
        //            {
        //                await _signInManager.SignInAsync(user, isPersistent: false);
        //                _logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);
        //                return RedirectToLocal(returnUrl);
        //            }
        //        }
        //        AddErrors(result);
        //    }

        //    ViewData["ReturnUrl"] = returnUrl;
        //    return View(nameof(ExternalLogin), model);
        //}

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> ConfirmEmail(string userId, string code)
        //{
        //    if (userId == null || code == null)
        //    {
        //        return RedirectToAction(nameof(UsersController.Index), "User");
        //    }
        //    var user = await _userManager.FindByIdAsync(userId);
        //    if (user == null)
        //    {
        //        throw new ApplicationException($"Unable to load user with ID '{userId}'.");
        //    }
        //    var result = await _userManager.ConfirmEmailAsync(user, code);
        //    return View(result.Succeeded ? "ConfirmEmail" : "Error");
        //}

        /*[HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return RedirectToAction(nameof(ForgotPasswordConfirmation));
                }

                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = Url.ResetPasswordCallbackLink(user.Id.ToString(), code, Request.Scheme);
                await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                   $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                return RedirectToAction(nameof(ForgotPasswordConfirmation));
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }
        
        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string code = null)
        {
            if (code == null)
            {
                throw new ApplicationException("A code must be supplied for password reset.");
            }
            var model = new ResetPasswordViewModel { Code = code };
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            AddErrors(result);
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }

    */

        //private void AddErrors(IdentityResult result)
        //{
        //    foreach (var error in result.Errors)
        //    {
        //        ModelState.AddModelError(string.Empty, error.Description);
        //    }
        //}

        //private IActionResult RedirectToLocal(string returnUrl)
        //{
        //    if (Url.IsLocalUrl(returnUrl))
        //    {
        //        return Redirect(returnUrl);
        //    }
        //    else
        //    {
        //        return RedirectToAction(nameof(UsersController.Index), "User");
        //    }
        //}
    }
}
