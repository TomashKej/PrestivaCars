using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.Vehicles.Messages.Commands;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;
using PrestivaCars.Domain.Entities;


namespace PrestivaCars.Application.Features.Vehicles.Handlers.Commands
{
    /// <summary>
    /// This class handles the CreateVehicleCommand and is responsible for creating a new vehicle in the system. It implements the IRequestHandler interface from MediatR, 
    /// which allows it to handle requests of type CreateVehicleCommand and return a VehicleDto representing the newly created vehicle.
    /// </summary>
    /// <param name="context"></param>
    /// <param name="mapper"></param>
    public class CreateVehicleHandler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<CreateVehicleCommand, VehicleDto>
    {
        public async Task<VehicleDto> Handle(CreateVehicleCommand request, CancellationToken cancellationToken)
        { 
            var vehicleCategoryExist = await context.VehicleCategories
                .AnyAsync(category => category.Id == request.VehicleCategoryId, cancellationToken);

            if (!vehicleCategoryExist)
            {
                throw new KeyNotFoundException($"The vehicle category with Id number {request.VehicleCategoryId} was not found.");
            }

            var vehicle = mapper.Map<Vehicle>(request);

            context.Vehicles.Add(vehicle);

            await context.SaveChangesAsync(cancellationToken);

            var createdVehicle = await context.Vehicles
                .AsNoTracking()
                .Include(item => item.VehicleCategory)
                .FirstAsync(item => item.Id == vehicle.Id, cancellationToken);

            return mapper.Map<VehicleDto>(createdVehicle);
        }
    }
}
