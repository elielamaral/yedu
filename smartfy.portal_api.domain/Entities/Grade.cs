using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace smartfy.portal_api.domain.Entities
{
    public class Grade : Entity, IEntityTypeConfiguration<Grade>
    {
        public decimal GradeScore { get; set; }
        public Guid SubmissionId { get; set; }
        public virtual Submission Submission { get; set; }
        public string UserId { get; set; }//IdentityUser, Id is a string field type
        //TODO: VERIFICAR UM MEIO DE RALACIONAR GRADE -> USER
        //public virtual ApplicationUser User { get; set; } 
        public void Configure(EntityTypeBuilder<Grade> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
