using Microsoft.EntityFrameworkCore;
using MigrationBackend.Models;

namespace MigrationBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Citizen> Citizens { get; set; }
        public DbSet<Application> Applications { get; set; }
    }
}