using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace smartfy.portal_api.domain.Entities
{
    public class WhiteLabel : Entity, IEntityTypeConfiguration<WhiteLabel>
    {
        public string LogoUrl { get; set; }
        public string PrimaryColor { get; set; }
        public string SecondColor { get; set; }
        public string ThirdColor { get; set; }
        public string FourthColor { get; set; }


        public void Configure(EntityTypeBuilder<WhiteLabel> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
