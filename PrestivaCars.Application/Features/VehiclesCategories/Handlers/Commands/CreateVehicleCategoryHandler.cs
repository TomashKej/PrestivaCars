using MediatR;
using PrestivaCars.Application.Common.Interfaces;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.Commands;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.DTOs;
using PrestivaCars.Domain.Entities;

namespace PrestivaCars.Application.Features.VehiclesCategories.Handlers.Commands
{
    /// <summary>
    /// This class handles the creation of a new vehicle category. It processes the CreateVehicleCategoryCommand and returns a VehicleCategoryDto containing the details of the newly created category.
    /// How it is working: When a CreateVehicleCategoryCommand is received, this handler creates a new VehicleCategory entity, adds it to the database context, and saves the changes. 
    /// After saving, it constructs a VehicleCategoryDto with the details of the newly created category and returns it.
    /// </summary>
    /// <param name="context"></param>
    public class CreateVehicleCategoryHandler(IApplicationDbContext context) : IRequestHandler<CreateVehicleCategoryCommand, VehicleCategoryDto>
    {
        public async Task<VehicleCategoryDto> Handle(CreateVehicleCategoryCommand request, CancellationToken cancellationToken)
        {
            var vehicleCategory = new VehicleCategory
            {
                Name = request.Name,
                Description = request.Description
            };

            context.VehicleCategories.Add(vehicleCategory);
            await context.SaveChangesAsync(cancellationToken);

            return new VehicleCategoryDto
            {
                Id = vehicleCategory.Id,
                Name = vehicleCategory.Name,
                Description = vehicleCategory.Description
            };
        }
    }
}
