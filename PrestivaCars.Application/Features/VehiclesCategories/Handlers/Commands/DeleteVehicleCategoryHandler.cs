using MediatR;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.Commands;


namespace PrestivaCars.Application.Features.VehiclesCategories.Handlers.Commands
{
    public class DeleteVehicleCategoryHandler(IApplicationDbContext context) : IRequestHandler<DeleteVehicleCategoryCommand, Unit>
    {
        public async Task<Unit> Handle(DeleteVehicleCategoryCommand request, CancellationToken cancellationToken)
        {
            var vehicleCategory = await context.VehicleCategories
                .FindAsync([request.Id], cancellationToken);

            if (vehicleCategory is null)
            {
                throw new KeyNotFoundException($"The vehicle category with Id number {request.Id} was not found");
            }

            context.VehicleCategories.Remove(vehicleCategory);
            await context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
