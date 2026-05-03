using MediatR;
using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehiclesCategories.DTOs;
using PrestivaCars.Application.Features.VehiclesCategories.Queries;

namespace PrestivaCars.Application.Features.VehiclesCategories.Handlers
{
    /// <summary>
    /// This class handles the GetAllVehicleCategoriesQuery by implementing the IRequestHandler interface from MediatR. 
    /// It retrieves all vehicle categories from the database using the provided IApplicationDbContext and returns them as an IEnumerable of VehicleCategoryDto objects.
    /// </summary>
    /// <param name="context"></param>
    public class GetAllVehicleCategoriesQueryHandler(IApplicationDbContext context) : IRequestHandler<GetAllVehicleCategoriesQuery, IEnumerable<VehicleCategoryDto>>
    {
        public async Task<IEnumerable<VehicleCategoryDto>> Handle(GetAllVehicleCategoriesQuery request, CancellationToken cancellationToken)
        { 
            return await context.VehicleCategories.AsNoTracking().Select(category => new VehicleCategoryDto{
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
            }).ToListAsync(cancellationToken);
        }
    }
}
