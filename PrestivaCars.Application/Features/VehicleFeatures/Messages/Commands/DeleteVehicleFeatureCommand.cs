using MediatR;

namespace PrestivaCars.Application.Features.VehicleFeatures.Messages.Commands
{
    public class DeleteVehicleFeatureCommand(int id) : IRequest<Unit>
    {
        public int Id { get; set; } = id;
    }
}