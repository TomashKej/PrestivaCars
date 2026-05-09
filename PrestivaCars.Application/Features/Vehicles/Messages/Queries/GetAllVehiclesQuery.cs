using MediatR;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;

namespace PrestivaCars.Application.Features.Vehicles.Messages.Queries
{
    public class GetAllVehiclesQuery : IRequest<IEnumerable<VehicleDto>>
    {
    }
}
