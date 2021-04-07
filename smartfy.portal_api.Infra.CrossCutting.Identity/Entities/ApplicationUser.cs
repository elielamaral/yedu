using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using smartfy.portal_api.domain.Entities;
using smartfy.portal_api.domain.Enums;
using System;

namespace smartfy.portal_api.Infra.CrossCutting.Identity.Entities
{
    public class ApplicationUser : IdentityUser
    {
        #region Custom properties
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public EStatus Status { get; set; }
        public string Token { get; set; }
        public string RoleId { get; set; }
        public virtual Role Role { get; set; }
        public DateTime CreationDate { get; set; }
        public bool Enabled { get; set; }
        #endregion

        public ApplicationUser()
        {
            CreationDate = DateTime.Now;
        }

        internal void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }    
    }
}
