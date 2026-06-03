using MediatR;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.Commands;

namespace PrestivaCars.Application.Features.VehicleFeatures.Handlers.Commands
{
    /// <summary>
    /// This class handles the deletion of a vehicle feature from the system.
    /// It implements the IRequestHandler interface from MediatR, which allows it to handle DeleteVehicleFeatureCommand requests.
    /// The handler retrieves the vehicle feature by its ID, removes it from the database context, and saves the changes.
    /// If the vehicle feature is not found, it throws a KeyNotFoundException.
    /// </summary>
    /// <param name="context"></param>
    public class DeleteVehicleFeatureHandler(IApplicationDbContext context)
        : IRequestHandler<DeleteVehicleFeatureCommand, Unit>
    {
        public async Task<Unit> Handle(
            DeleteVehicleFeatureCommand request,
            CancellationToken cancellationToken)
        {
            var vehicleFeature = await context.VehicleFeatures
                .FindAsync([request.Id], cancellationToken);

            if (vehicleFeature is null)
            {
                throw new KeyNotFoundException(
                    $"The vehicle feature with Id number {request.Id} was not found.");
            }

            context.VehicleFeatures.Remove(vehicleFeature);

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}