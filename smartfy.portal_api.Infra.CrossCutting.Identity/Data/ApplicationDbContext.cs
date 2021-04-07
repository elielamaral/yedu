using System;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using smartfy.portal_api.domain.Entities;
using smartfy.portal_api.Infra.CrossCutting.Identity.Entities;


namespace smartfy.portal_api.Infra.CrossCutting.Identity.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        private readonly IHostingEnvironment _env;
        public DbSet<ApplicationUser> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<WhiteLabel> WhiteLabels { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<ContentType> ContentTypes { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new ApplicationUser().Configure(modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers"));
            new Role().Configure(modelBuilder.Entity<Role>().ToTable("AspNetRoles"));
            new WhiteLabel().Configure(modelBuilder.Entity<WhiteLabel>().ToTable("WhiteLabel"));
            new Course().Configure(modelBuilder.Entity<Course>().ToTable("Course"));
            new ContentType().Configure(modelBuilder.Entity<ContentType>().ToTable("ContentType"));
            new Content().Configure(modelBuilder.Entity<Content>().ToTable("Content"));
            new Attachment().Configure(modelBuilder.Entity<Attachment>().ToTable("Attachment"));
            new Submission().Configure(modelBuilder.Entity<Submission>().ToTable("Submission"));
            new Grade().Configure(modelBuilder.Entity<Grade>().ToTable("Grade"));
            new Asset().Configure(modelBuilder.Entity<Asset>().ToTable("Asset"));
            new UserCourse().Configure(modelBuilder.Entity<UserCourse>().ToTable("UserCourse"));


            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IHostingEnvironment env) : base(options)
        {
            _env = env;
        }

        public ApplicationDbContext() { }
    }

    public static class ModelBuilderExtensions
    {
        public static void ApplyAllConfigurations(this ModelBuilder modelBuilder)
        {
            var configurations = Assembly.GetExecutingAssembly().DefinedTypes.Where(t =>
                    t.ImplementedInterfaces.Any(i =>
                        i.IsGenericType &&
                        i.Name.Equals(typeof(IEntityTypeConfiguration<>).Name,
                            StringComparison.InvariantCultureIgnoreCase)
                    ) &&
                    t.IsClass &&
                    !t.IsAbstract &&
                    !t.IsNested)
                .ToList();

            foreach (var configuration in configurations)
            {
                try
                {
                    var entityType = configuration.BaseType.GenericTypeArguments.SingleOrDefault(t => t.IsClass);
                    var applyConfigMethod = typeof(ModelBuilder).GetMethod("Configure");
                    var applyConfigGenericMethod = applyConfigMethod.MakeGenericMethod(entityType);
                    applyConfigGenericMethod.Invoke(modelBuilder, new object[] { Activator.CreateInstance(configuration) });
                }
                catch (Exception e)
                {
                }
            }
        }

        //new Partner().Configure(modelBuilder.Entity<Partner>());
    }
}
