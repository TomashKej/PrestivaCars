using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.Vehicles.Messages.Commands;
using PrestivaCars.Domain.Entities;

namespace PrestivaCars.Application.Features.Vehicles.Handlers.Commands
{
    public class UpdateVehicleHandler(
        IApplicationDbContext context,
        IMapper mapper)
        : IRequestHandler<UpdateVehicleCommand, Unit>
    {
        public async Task<Unit> Handle(UpdateVehicleCommand request, CancellationToken cancellationToken)
        {
            var vehicle = await context.Vehicles
                .Include(vehicle => vehicle.VehicleVehicleFeatures)
                .FirstOrDefaultAsync(vehicle => vehicle.Id == request.Id, cancellationToken);

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
                throw new KeyNotFoundException(
                    $"The following vehicle feature Ids were not found: {string.Join(", ", missingFeatureIds)}.");
            }

            mapper.Map(request, vehicle);

            vehicle.VehicleVehicleFeatures.Clear();

            foreach (var featureId in selectedFeatureIds)
            {
                vehicle.VehicleVehicleFeatures.Add(new VehicleVehicleFeature
                {
                    VehicleId = vehicle.Id,
                    VehicleFeatureId = featureId
                });
            }

            await context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}