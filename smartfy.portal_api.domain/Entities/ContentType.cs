using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace smartfy.portal_api.domain.Entities
{
    public class ContentType : Entity, IEntityTypeConfiguration<ContentType>
    {
        public string Name { get; set; }

        //TODO: Adrian
        //public virtual IEnumerator<Attachment> Attachments { get; set; }

        public void Configure(EntityTypeBuilder<ContentType> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
