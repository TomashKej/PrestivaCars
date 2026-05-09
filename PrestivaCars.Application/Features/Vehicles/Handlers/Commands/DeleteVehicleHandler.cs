using MediatR;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.Vehicles.Messages.Commands;

namespace PrestivaCars.Application.Features.Vehicles.Handlers.Commands
{
    /// <summary>
    /// This class handles the deletion of a vehicle from the system. It implements the IRequestHandler interface from MediatR, which allows it to handle DeleteVehicleCommand requests. 
    /// The handler retrieves the vehicle by its ID, removes it from the database context, and saves the changes. If the vehicle is not found, it throws a KeyNotFoundException.
    /// </summary>
    /// <param name="context"></param>
    public class DeleteVehicleHandler(IApplicationDbContext context) : IRequestHandler<DeleteVehicleCommand, Unit>
    {
        public async Task<Unit> Handle(
            DeleteVehicleCommand request,
            CancellationToken cancellationToken)
        {
            var vehicle = await context.Vehicles
                .FindAsync([request.Id], cancellationToken);

            if (vehicle is null)
            {
                throw new KeyNotFoundException(
                    $"The vehicle with Id number {request.Id} was not found.");
            }

            context.Vehicles.Remove(vehicle);

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}