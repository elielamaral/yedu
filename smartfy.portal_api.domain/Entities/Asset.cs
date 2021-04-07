using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace smartfy.portal_api.domain.Entities
{
    public class Asset : Entity, IEntityTypeConfiguration<Asset>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public Guid CourseId { get; set; }
        public virtual Course Course { get; set; }

        public void Configure(EntityTypeBuilder<Asset> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
