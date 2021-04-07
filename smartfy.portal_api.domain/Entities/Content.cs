using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using smartfy.portal_api.domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace smartfy.portal_api.domain.Entities
{
    public class Content : Entity, IEntityTypeConfiguration<Content>
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public string SubmissionOpen { get; set; }
        public string SubmissionClose { get; set; }
        public EStatus Status { get; set; }
        public Guid CourseId { get; set; }
        public virtual Course Course { get; set; }
        public Guid TypeId { get; set; }
        public virtual ContentType ContentType { get; set; }

        public void Configure(EntityTypeBuilder<Content> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
