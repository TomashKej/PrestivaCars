using MediatR;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.Commands;

namespace PrestivaCars.Application.Features.VehiclesCategories.Handlers.Commands
{
    /// <summary>
    /// Handles the update operation for a vehicle category using the specified application database context.
    /// </summary>
    /// <param name="context">The application database context used to access and update vehicle category data.</param>
    public class UpdateVehicleCategoryHandler(IApplicationDbContext context) : IRequestHandler<UpdateVehicleCategoryCommand, Unit>
    {
        public async Task<Unit> Handle(UpdateVehicleCategoryCommand request, CancellationToken cancellationToken)
        {
            var vehicleCategory = await context.VehicleCategories.FindAsync([request.Id], cancellationToken);

            if (vehicleCategory is null) 
            {
                throw new KeyNotFoundException($"Vehicle category with ID {request.Id} not found.");
            }

            vehicleCategory.Name = request.Name;
            vehicleCategory.Description = request.Description;

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
