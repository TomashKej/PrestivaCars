using MediatR;
using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;
using PrestivaCars.Application.Features.Vehicles.Messages.Queries;


namespace PrestivaCars.Application.Features.Vehicles.Handlers.Queries
{
    public class GetAllVehiclesHandler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<GetAllVehiclesQuery, IEnumerable<VehicleDto>>
    {
        public async Task<IEnumerable<VehicleDto>> Handle(GetAllVehiclesQuery request, CancellationToken cancellationToken)
        {
            return await context.Vehicles
                .AsNoTracking()
                .Include(vehicle => vehicle.VehicleCategory)
                .ProjectToType<VehicleDto>(mapper.Config)         // Use ProjectToType to map directly to VehicleDto
                .ToListAsync(cancellationToken);
        }
    }
}
