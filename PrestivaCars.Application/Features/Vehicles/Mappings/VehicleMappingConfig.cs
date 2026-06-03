using Mapster;
using PrestivaCars.Application.Features.Vehicles.Messages.Commands;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;
using PrestivaCars.Domain.Entities;

namespace PrestivaCars.Application.Features.Vehicles.Mappings
{
    /// <summary>
    /// This class defines the mapping configuration for the Vehicle entity to VehicleDto using Mapster.
    /// It implements the IRegister interface to register the mapping configuration with the TypeAdapterConfig.
    /// It will reduce the need for manual mapping code and improve maintainability by centralizing the mapping logic.
    /// </summary>
    public class VehicleMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            // Map the Vehicle entity to VehicleDto, including custom mappings for VehicleCategoryName and VehicleFeatures.
            config.NewConfig<Vehicle, VehicleDto>()
                .Map(dest => dest.VehicleCategoryName,
                    src => src.VehicleCategory != null ? src.VehicleCategory.Name : string.Empty)
                .Map(dest => dest.VehicleFeatures,
                    src => src.VehicleVehicleFeatures
             .Select(vehicleVehicleFeature => vehicleVehicleFeature.VehicleFeature));

            config.NewConfig<CreateVehicleCommand, Vehicle>()
                .Ignore(dest => dest.Id) // Ignore Id when creating a new Vehicle
                .Ignore(dest => dest.VehicleCategory!) // Ignore VehicleCategory when creating a new Vehicle
                .Ignore(dest => dest.VehicleVehicleFeatures) // Ignore VehicleVehicleFeatures when creating a new Vehicle
                .Map(dest => dest.IsSold, _ => false)
                .Map(dest => dest.CreatedAt, _ => DateTime.UtcNow)
                .Map(dest => dest.IsActive, _ => true);

            config.NewConfig<UpdateVehicleCommand, Vehicle>()
                .Ignore(dest => dest.Id)
                .Ignore(dest => dest.VehicleCategory!)
                .Ignore(dest => dest.CreatedAt)
                .Ignore(dest => dest.VehicleVehicleFeatures);
        }
    }
}
