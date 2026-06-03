using MediatR;
using PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs;

namespace PrestivaCars.Application.Features.VehicleFeatures.Messages.Queries
{
    /// <summary>
    /// This class represents a query to retrieve a vehicle feature by its unique identifier. It implements the <see cref="IRequest{TResponse}"/> interface from MediatR, where the response type is <see cref="VehicleFeatureDto?"/>.
    /// </summary>
    /// <param name="id"></param>
    public class GetVehicleFeatureByIdQuery(int id) : IRequest<VehicleFeatureDto?>
    {
        public int Id { get; set; } = id;
    }
}