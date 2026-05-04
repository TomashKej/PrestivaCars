using MediatR;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.DTOs;

namespace PrestivaCars.Application.Features.VehiclesCategories.Messages.Queries
{
    /// <summary>
    /// Represents a query to retrieve a vehicle category by its unique identifier.
    /// </summary>
    /// <remarks>This query is typically used with a mediator pattern to request a single vehicle category.
    /// The result will be null if no category with the specified identifier exists.</remarks>
    public class GetVehicleCategoryByIdQuery : IRequest<VehicleCategoryDto?>
    {
        public int Id { get; set; }

        public GetVehicleCategoryByIdQuery(int id)
        {
            Id = id;
        }
    }
}
