using Mapster;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.Commands;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs;
using PrestivaCars.Domain.Entities;

namespace PrestivaCars.Application.Features.VehicleFeatures.Mappings
{
    /// <summary>
    /// This class defines the mapping configuration for the VehicleFeature entity using Mapster.
    /// It implements the IRegister interface to register the mapping configuration with the TypeAdapterConfig.
    /// It centralizes mapping logic for VehicleFeature related DTOs and commands.
    /// </summary>
    public class VehicleFeatureMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            // Configure mapping from VehicleFeature entity to VehicleFeatureDto
            config.NewConfig<VehicleFeature, VehicleFeatureDto>();

            // Configure mapping from CreateVehicleFeatureCommand to VehicleFeature entity
            config.NewConfig<CreateVehicleFeatureCommand, VehicleFeature>()
                .Ignore(dest => dest.Id) // Ignore Id when creating a new VehicleFeature
                .Ignore(dest => dest.VehicleVehicleFeatures) // Ignore many-to-many navigation collection
                .Map(dest => dest.IsActive, _ => true);

            // Configure mapping from UpdateVehicleFeatureCommand to VehicleFeature entity
            config.NewConfig<UpdateVehicleFeatureCommand, VehicleFeature>()
                .Ignore(dest => dest.Id) // Id should come from route/query logic, not be overwritten by mapping
                .Ignore(dest => dest.VehicleVehicleFeatures); // Ignore many-to-many navigation collection
        }
    }
}