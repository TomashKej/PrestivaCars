using MediatR;
using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.Queries;

namespace PrestivaCars.Application.Features.VehicleFeatures.Handlers.Queries
{
    public class GetVehicleFeatureByIdHandler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<GetVehicleFeatureByIdQuery, VehicleFeatureDto?>
    {
        public async Task<VehicleFeatureDto?> Handle(GetVehicleFeatureByIdQuery request, CancellationToken cancellationToken)
        {
            return await context.VehicleFeatures
                .AsNoTracking()
                .Where(vehicleFeature => vehicleFeature.Id == request.Id)
                .ProjectToType<VehicleFeatureDto>(mapper.Config)
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}