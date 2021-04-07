using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace smartfy.portal_api.domain.Entities
{
    public class Attachment : Entity, IEntityTypeConfiguration<Attachment>
    {
        public string Url { get; set; }
        public Guid ContentId { get; set; }
        public virtual Content Content { get; set; }
        public Guid TypeId { get; set; }
        public virtual ContentType Type { get; set; }
        public void Configure(EntityTypeBuilder<Attachment> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
