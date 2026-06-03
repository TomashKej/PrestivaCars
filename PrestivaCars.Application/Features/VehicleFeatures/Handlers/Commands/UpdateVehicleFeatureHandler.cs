using MapsterMapper;
using MediatR;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.Commands;

namespace PrestivaCars.Application.Features.VehicleFeatures.Handlers.Commands
{
    /// <summary>
    /// This class handles the UpdateVehicleFeatureCommand and is responsible for updating an existing vehicle feature in the system.
    /// It retrieves the vehicle feature by its ID, updates its properties using the mapper, and saves the changes.
    /// If the vehicle feature is not found, it throws a KeyNotFoundException.
    /// </summary>
    /// <param name="context"></param>
    /// <param name="mapper"></param>
    public class UpdateVehicleFeatureHandler(
        IApplicationDbContext context,
        IMapper mapper)
        : IRequestHandler<UpdateVehicleFeatureCommand, Unit>
    {
        public async Task<Unit> Handle(
            UpdateVehicleFeatureCommand request,
            CancellationToken cancellationToken)
        {
            var vehicleFeature = await context.VehicleFeatures
                .FindAsync([request.Id], cancellationToken);

            if (vehicleFeature is null)
            {
                throw new KeyNotFoundException(
                    $"The vehicle feature with Id number {request.Id} was not found.");
            }

            mapper.Map(request, vehicleFeature);

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}