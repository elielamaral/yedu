//using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using smartfy.portal_api.domain.Enums;
//using System;

//namespace smartfy.portal_api.domain.Entities
//{
//    public class User : IdentityUser
//    {
//        #region Custom properties
//        public string FirstName { get; set; }
//        public string LastName { get; set; }
//        public string Password { get; set; }
//        public EStatus Status { get; set; }
//        public string Token { get; set; }
//        public Guid RoleId { get; set; }
//        public virtual Role Role { get; set; }
//        public DateTime CreationDate { get; set; }
//        public bool Enabled { get; set; }
//        #endregion

//        public User()
//        {
//            CreationDate = DateTime.Now;
//        }

//        public void Configure(EntityTypeBuilder<User> builder)
//        {
//            builder.HasKey(c => c.Id);
//            builder.Property(x => x.Id).IsRequired();
//        }
//    }
//}
