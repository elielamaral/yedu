using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace smartfy.portal_api.domain.Entities
{
    public class UserCourse : Entity, IEntityTypeConfiguration<UserCourse>
    {
        public string UserId { get; set; }
        //public virtual User User { get; set; }
        public Guid CourseId { get; set; }
        public virtual Course Course { get; set; }
        public void Configure(EntityTypeBuilder<UserCourse> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
