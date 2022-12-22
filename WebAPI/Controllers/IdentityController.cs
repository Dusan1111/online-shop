
using System.Collections.Generic;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Token;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("identity")]
    public class IdentityController : ControllerBase
    {
        private UserManager<IdentityUser> userManager;
        private readonly IJWTTokenGenerator jwtToken;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public IdentityController(UserManager<IdentityUser> userManager,
          SignInManager<IdentityUser> signInManager,
          IJWTTokenGenerator jwtToken,
          RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.jwtToken = jwtToken;
            this.roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterModel loginModel)
        {
            var userToCreate = new IdentityUser
            {
                Email = loginModel.Email,
                UserName = loginModel.UserName
            };

            var result = await userManager.CreateAsync(userToCreate, loginModel.Password);
            if (result.Succeeded)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
           var userFromDb = await userManager.FindByNameAsync(loginModel.UserName);

			if (userFromDb == null)
			{
				return BadRequest();
			}

			var result = await signInManager.CheckPasswordSignInAsync(userFromDb, loginModel.Password, false);


			if (!result.Succeeded)
			{
				return BadRequest();
			}

			var roles = await userManager.GetRolesAsync(userFromDb);

			IList<Claim> claims = await userManager.GetClaimsAsync(userFromDb);
			return Ok(new
			{
				result = result,
				username = userFromDb.UserName,
				email = userFromDb.Email,
                id = userFromDb.Id,
				token = jwtToken.GenerateToken(userFromDb, roles)

			});
        }

        [HttpPost("confirmEmail")]
        public ActionResult ConfirmEmail(LoginModel loginModel)
        {
            return Ok();
        }

    }

}
