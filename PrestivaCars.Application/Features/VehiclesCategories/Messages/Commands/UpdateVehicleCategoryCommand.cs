using MediatR;

namespace PrestivaCars.Application.Features.VehiclesCategories.Messages.Commands
{
    /// <summary>
    /// Represents a command to update an existing vehicle category. This command is used to encapsulate the data required for updating a vehicle category, including its unique identifier, name, 
    /// and description. It implements the <see cref="IRequest{TResponse}"/> interface from MediatR, where the response type is <see cref="Unit"/>, indicating that no specific data 
    /// is returned upon successful execution of the command.
    /// </summary>
    public class UpdateVehicleCategoryCommand : IRequest<Unit>
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
