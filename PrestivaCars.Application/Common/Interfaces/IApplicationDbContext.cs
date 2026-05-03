using Microsoft.EntityFrameworkCore;
using PrestivaCars.Domain.Entities;

namespace PrestivaCars.Application.Common.Interfaces
{
    /// <summary>
    /// This interface defines the contract for the application's database context, providing access to the selected DbSets and a method to save changes asynchronously.
    /// </summary>
    public interface IApplicationDbContext
    {
        DbSet<Vehicle> Vehicles { get; }
        DbSet<VehicleCategory> VehicleCategories { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
