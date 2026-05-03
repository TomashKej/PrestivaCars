using System;
using System.Collections.Generic;
using System.Text;

namespace PrestivaCars.Application.Features.VehiclesCategories.DTOs
{
    /// <summary>
    /// Represents a Data Transfer Object (DTO) for vehicle categories in the Prestiva Cars application. 
    /// This DTO is used to transfer data related to vehicle categories between different layers of the application, such as from the API layer to the service layer or vice versa.
    /// </summary>
    public class VehicleCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
