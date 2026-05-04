using MediatR;
using Microsoft.EntityFrameworkCore;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.DTOs;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.Queries;


namespace PrestivaCars.Application.Features.VehiclesCategories.Handlers.Queries
{
    /// <summary>
    /// This class handles the GetVehicleCategoryByIdQuery by implementing the IRequestHandler interface from MediatR.
    /// </summary>
    /// <param name="context"></param>
    public class GetVehicleCategoryByIdHandler(IApplicationDbContext context) : IRequestHandler<GetVehicleCategoryByIdQuery , VehicleCategoryDto?>
    {
        public async Task<VehicleCategoryDto?> Handle(GetVehicleCategoryByIdQuery request, CancellationToken cancellationToken)
        { 
            return await context.VehicleCategories
                .AsNoTracking()
                .Where(category => category.Id == request.Id)
                .Select(category => new VehicleCategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description
                }).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
