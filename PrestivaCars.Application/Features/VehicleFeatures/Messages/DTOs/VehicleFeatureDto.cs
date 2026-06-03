namespace PrestivaCars.Application.Features.VehicleFeatures.Messages.DTOs
{
    /// <summary>
    /// This class represents a Data Transfer Object (DTO) for the VehicleFeature entity in the Prestiva Cars application. 
    /// It is used to transfer data related to vehicle features between different layers of the application, such as from the database to the presentation layer or vice versa. 
    /// The DTO contains properties that correspond to the fields of the VehicleFeature entity, allowing for efficient and structured data transfer while maintaining separation of concerns between different parts of the application.
    /// </summary>
    public class VehicleFeatureDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public bool IsActive { get; set; }
    }
}