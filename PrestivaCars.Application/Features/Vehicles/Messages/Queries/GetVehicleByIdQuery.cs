using MediatR;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;

namespace PrestivaCars.Application.Features.Vehicles.Messages.Queries
{
    /// <summary>
    /// Represents a query to retrieve a vehicle by its unique identifier.
    /// </summary>
    /// <remarks>Use this query with a mediator or request handler to obtain a vehicle's details as a data
    /// transfer object. The query returns null if no vehicle with the specified identifier exists.</remarks>
    public class GetVehicleByIdQuery : IRequest<VehicleDto?>
    {
        public int Id { get; }

        public GetVehicleByIdQuery(int id)
        {
            Id = id;
        }
    }
}
