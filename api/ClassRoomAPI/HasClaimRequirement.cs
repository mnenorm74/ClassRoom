using Microsoft.AspNetCore.Authorization;
using System;

namespace ClassRoomAPI
{
    public class HasClaimRequirement : IAuthorizationRequirement
    {
        public string UserClaims { get; set; }
        public HasClaimRequirement(string userClaims)
        {
            UserClaims = userClaims ?? throw new ArgumentNullException(nameof(userClaims));
        }
    }
}