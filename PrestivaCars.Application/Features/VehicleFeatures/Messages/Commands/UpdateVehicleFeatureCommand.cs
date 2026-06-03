using MediatR;

namespace PrestivaCars.Application.Features.VehicleFeatures.Messages.Commands
{
    /// <summary>
    /// This class represents a command to update an existing vehicle feature in the Prestiva Cars application. It implements the IRequest interface from MediatR,
    /// </summary>
    public class UpdateVehicleFeatureCommand : IRequest<Unit>
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public bool IsActive { get; set; }
    }
}