using MediatR;
using PrestivaCars.Application.Features.VehiclesCategories.DTOs;

namespace PrestivaCars.Application.Features.VehiclesCategories.Queries
{
    /// <summary>
    /// This class represents a query to retrieve all vehicle categories. It implements the IRequest interface from MediatR, which allows it to be handled by a corresponding handler that will return an IEnumerable of VehicleCategoryDto objects.
    /// </summary>
    public class GetAllVehicleCategoriesQuery : IRequest<IEnumerable<VehicleCategoryDto>>
    {
    }
}
