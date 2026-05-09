using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.Vehicles.Messages.Commands;

namespace PrestivaCars.Application.Features.Vehicles.Handlers.Commands
{
    public class UpdateVehicleHandler(
        IApplicationDbContext context,
        IMapper mapper)
        : IRequestHandler<UpdateVehicleCommand, Unit>
    {
        public async Task<Unit> Handle(
            UpdateVehicleCommand request,
            CancellationToken cancellationToken)
        {
            var vehicle = await context.Vehicles
                .FindAsync([request.Id], cancellationToken);

            if (vehicle is null)
            {
                throw new KeyNotFoundException(
                    $"The vehicle with Id number {request.Id} was not found.");
            }

            var vehicleCategoryExists = await context.VehicleCategories
                .AnyAsync(category => category.Id == request.VehicleCategoryId, cancellationToken);

            if (!vehicleCategoryExists)
            {
                throw new KeyNotFoundException(
                    $"The vehicle category with Id number {request.VehicleCategoryId} was not found.");
            }

            mapper.Map(request, vehicle);

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}