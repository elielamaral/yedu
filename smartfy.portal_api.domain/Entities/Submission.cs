using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace smartfy.portal_api.domain.Entities
{
    public class Submission : Entity, IEntityTypeConfiguration<Submission>
    {
        //TODO UserID
        public string Title { get; set; }
        public string Body { get; set; }
        public string Url { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        //public virtual User User { get; set; }
        public Guid ContentId { get; set; }
        public virtual Content Content { get; set; }
        public void Configure(EntityTypeBuilder<Submission> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
