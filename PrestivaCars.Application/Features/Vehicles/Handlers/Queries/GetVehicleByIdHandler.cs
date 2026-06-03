using MapsterMapper;
using MediatR;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.Vehicles.Messages.Queries;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;
using Microsoft.EntityFrameworkCore;
using Mapster;

namespace PrestivaCars.Application.Features.Vehicles.Handlers.Queries
{
    /// <summary>
    /// This class handles the GetVehicleByIdQuery and retrieves a vehicle by its unique identifier from the database.
    /// It uses the provided IApplicationDbContext to access the database and IMapper to map the entity to a VehicleDto.
    /// </summary>
    /// <param name="context"></param>
    /// <param name="mapper"></param>
    public class GetVehicleByIdHandler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<GetVehicleByIdQuery, VehicleDto?>
    {
        public async Task<VehicleDto?> Handle(GetVehicleByIdQuery request, CancellationToken cancellationToken)
        {
            return await context.Vehicles
                .AsNoTracking()
                .Include(vehicle => vehicle.VehicleVehicleFeatures)
                    .ThenInclude(vehicleVehicleFeature => vehicleVehicleFeature.VehicleFeature)
                .Where(vehicle => vehicle.Id == request.Id)
                .ProjectToType<VehicleDto>(mapper.Config)
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
