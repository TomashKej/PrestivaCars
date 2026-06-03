using MapsterMapper;
using MediatR;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.Commands;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs;
using PrestivaCars.Domain.Entities;

namespace PrestivaCars.Application.Features.VehicleFeatures.Handlers.Commands
{
    /// <summary>
    /// This class handles the CreateVehicleFeatureCommand and is responsible for creating a new vehicle feature in the system.
    /// It implements the IRequestHandler interface from MediatR, which allows it to handle requests of type CreateVehicleFeatureCommand
    /// and return a VehicleFeatureDto representing the newly created vehicle feature.
    /// </summary>
    /// <param name="context"></param>
    /// <param name="mapper"></param>
    public class CreateVehicleFeatureHandler(IApplicationDbContext context, IMapper mapper)
        : IRequestHandler<CreateVehicleFeatureCommand, VehicleFeatureDto>
    {
        public async Task<VehicleFeatureDto> Handle(
            CreateVehicleFeatureCommand request,
            CancellationToken cancellationToken)
        {
            var vehicleFeature = mapper.Map<VehicleFeature>(request);

            context.VehicleFeatures.Add(vehicleFeature);

            await context.SaveChangesAsync(cancellationToken);

            return mapper.Map<VehicleFeatureDto>(vehicleFeature);
        }
    }
}