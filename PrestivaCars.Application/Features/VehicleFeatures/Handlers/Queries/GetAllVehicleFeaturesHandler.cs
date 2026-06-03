using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.Queries;

namespace PrestivaCars.Application.Features.VehicleFeatures.Handlers.Queries
{
    public class GetAllVehicleFeaturesHandler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<GetAllVehicleFeaturesQuery, IEnumerable<VehicleFeatureDto>>
    {
        public async Task<IEnumerable<VehicleFeatureDto>> Handle(GetAllVehicleFeaturesQuery request, CancellationToken cancellationToken)
        {
            return await context.VehicleFeatures
                .AsNoTracking()
                .OrderBy(vehicleFeature => vehicleFeature.Name)
                .ProjectToType<VehicleFeatureDto>(mapper.Config)
                .ToListAsync(cancellationToken);
        }
    }
}
