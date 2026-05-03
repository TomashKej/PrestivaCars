using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Domain.Entities;

namespace PrestivaCars.Infrastructure.Data
{
    /// <summary>
    /// This class represents the application's database context, which is responsible for managing the connection to the database and providing access to the entities in the application. 
    /// It inherits from DbContext and implements the IApplicationDbContext interface.
    /// </summary>
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {
        }

        public DbSet<Vehicle> Vehicles => Set<Vehicle>();
        public DbSet<VehicleCategory> VehicleCategories => Set<VehicleCategory>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Vehicle>()
                .Property(vehicle => vehicle.Price)
                .HasPrecision(18, 2);
        }
    }
}
