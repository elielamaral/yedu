using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using smartfy.portal_api.domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace smartfy.portal_api.domain.Entities
{
    public class Course : Entity, IEntityTypeConfiguration<Course>
    {
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public EStatus Status { get; set; }

        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
