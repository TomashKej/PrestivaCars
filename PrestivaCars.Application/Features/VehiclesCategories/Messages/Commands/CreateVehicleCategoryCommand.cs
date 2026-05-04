using MediatR;
using PrestivaCars.Application.Features.VehiclesCategories.Messages.DTOs;

namespace PrestivaCars.Application.Features.VehiclesCategories.Messages.Commands
{
    /// <summary>
    /// Represents a request to create a new vehicle category with the specified name and description.
    /// </summary>
    /// <remarks>Use this command to initiate the creation of a vehicle category. The result contains the
    /// details of the newly created category. Both the name and description should be provided to accurately define the
    /// category.</remarks>
    public class CreateVehicleCategoryCommand : IRequest<VehicleCategoryDto>
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
