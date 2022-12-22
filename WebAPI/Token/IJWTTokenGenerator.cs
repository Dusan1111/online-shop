using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Token
{
    public interface IJWTTokenGenerator 
    {
       string GenerateToken(IdentityUser user, IList<string> roles);
    }
}