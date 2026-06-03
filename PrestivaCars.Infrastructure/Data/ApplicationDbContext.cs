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
        public DbSet<VehicleFeature> VehicleFeatures => Set<VehicleFeature>();
        public DbSet<VehicleVehicleFeature> VehicleVehicleFeatures => Set<VehicleVehicleFeature>();

        /// <summary>
        /// This method is used to configure the model and its relationships using the Fluent API. It is called when the model for a derived context has been initialized, but before it has been locked down and used to initialize the context.
        /// </summary>
        /// <param name="modelBuilder">The model builder used to configure the entity mappings.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the precision of the Price property in the Vehicle entity to have a total of 18 digits, with 2 digits after the decimal point.
            modelBuilder.Entity<Vehicle>()
                .Property(vehicle => vehicle.Price)
                .HasPrecision(18, 2);

            // Configure the many-to-many relationship between Vehicle and VehicleFeature using the join entity VehicleVehicleFeature.
            // The HasKey method is used to specify the composite primary key for the VehicleVehicleFeature entity, which consists of the VehicleId and VehicleFeatureId properties.
            modelBuilder.Entity<VehicleVehicleFeature>()
                .HasKey(vvf => new
                {
                    vvf.VehicleId,
                    vvf.VehicleFeatureId
                });

            // Configure the relationships between VehicleVehicleFeature and the Vehicle and VehicleFeature entities.
            modelBuilder.Entity<VehicleVehicleFeature>()
                .HasOne(vvf => vvf.Vehicle)
                .WithMany(v => v.VehicleVehicleFeatures)
                .HasForeignKey(vvf => vvf.VehicleId);

            // Configure the relationship between VehicleVehicleFeature and VehicleFeature, specifying that a VehicleFeature can have many VehicleVehicleFeatures, and that the foreign key in VehicleVehicleFeature is VehicleFeatureId.
            modelBuilder.Entity<VehicleVehicleFeature>()
                .HasOne(vvf => vvf.VehicleFeature)
                .WithMany(vf => vf.VehicleVehicleFeatures)
                .HasForeignKey(vvf => vvf.VehicleFeatureId);
        }
    }
}
