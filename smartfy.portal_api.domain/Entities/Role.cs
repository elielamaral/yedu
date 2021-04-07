using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace smartfy.portal_api.domain.Entities
{
    public class Role : IdentityRole
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            //builder.HasKey(c => c.Id);
            builder.Property(x => x.Id).IsRequired();
        }
    }
}
