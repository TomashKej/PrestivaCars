using MediatR;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs;

namespace PrestivaCars.Application.Features.VehicleFeatures.Messages.Commands
{
    /// <summary>
    /// This class represents a command to create a new vehicle feature in the Prestiva Cars application.
    /// </summary>
    public class CreateVehicleFeatureCommand : IRequest<VehicleFeatureDto>
    {
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
    }
}