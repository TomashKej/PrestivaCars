using MediatR;

namespace PrestivaCars.Application.Features.Vehicles.Messages.Commands
{
    /// <summary>
    /// This command is used to delete a vehicle from the system based on its unique identifier (Id). It implements the IRequest interface from MediatR,
    /// indicating that it expects a response of type Unit, which signifies that no data is returned upon successful execution of the command.
    /// </summary>
    public class DeleteVehicleCommand : IRequest<Unit>
    {
        public int Id { get; }

        public DeleteVehicleCommand(int id)
        {
            Id = id;
        }
    }
}