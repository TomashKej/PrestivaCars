using MediatR;

namespace PrestivaCars.Application.Features.VehiclesCategories.Messages.Commands
{
    /// <summary>
    /// Represents a request to delete a vehicle category by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the vehicle category to delete.</param>
    public class DeleteVehicleCategoryCommand(int id) : IRequest<Unit>
    {
        public int Id { get; set; } = id;
    }
}
