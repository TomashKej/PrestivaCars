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

            var selectedFeatureIds = request.FeatureIds
                .Distinct()
                .ToList();

            var existingFeatureIds = await context.VehicleFeatures
                .Where(vehicleFeature => selectedFeatureIds.Contains(vehicleFeature.Id))
                .Select(vehicleFeature => vehicleFeature.Id)
                .ToListAsync(cancellationToken);

            var missingFeatureIds = selectedFeatureIds
                .Except(existingFeatureIds)
                .ToList();

            if (missingFeatureIds.Count > 0)
            {
                throw new KeyNotFoundException($"The following vehicle feature Ids were not found: {string.Join(", ", missingFeatureIds)}.");
            }

            var vehicle = mapper.Map<Vehicle>(request);

            foreach (var featureId in selectedFeatureIds)
            {
                vehicle.VehicleVehicleFeatures.Add(new VehicleVehicleFeature
                {
                    VehicleFeatureId = featureId
                });
            }

            context.Vehicles.Add(vehicle);

            await context.SaveChangesAsync(cancellationToken);

            var createdVehicle = await context.Vehicles
                .AsNoTracking()
                .Include(createdVehicleEntity => createdVehicleEntity.VehicleCategory)
                .Include(createdVehicleEntity => createdVehicleEntity.VehicleVehicleFeatures)
                    .ThenInclude(vehicleVehicleFeature => vehicleVehicleFeature.VehicleFeature)
                .FirstAsync(createdVehicleEntity => createdVehicleEntity.Id == vehicle.Id, cancellationToken);

            return mapper.Map<VehicleDto>(createdVehicle);
        }
    }
}