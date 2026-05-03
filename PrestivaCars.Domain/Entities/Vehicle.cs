using System;
using System.Collections.Generic;
using System.Text;

namespace PrestivaCars.Domain.Entities
{
    /// <summary>
    /// Represents a vehicle entity in the Prestiva Cars application. This class contains properties that describe various attributes of a vehicle, such as its type, brand, model, year, registration number, 
    /// VIN number, mileage, fuel type, transmission, price, and description. It also includes properties for tracking the vehicle's sale status, activity status, creation timestamp, and the user who created it. 
    /// Additionally, it establishes a many-to-one relationship with the VehicleCategory entity through the VehicleCategoryId foreign key
    /// </summary>
    public class Vehicle
    {
        public int Id { get; set; }
        public string VehicleType { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public string RegistrationNumber { get; set; } = string.Empty;
        public string VinNumber { get; set; } = string.Empty;
        public int Mileage { get; set; }
        public string FuelType { get; set; } = string.Empty;
        public string Transmission { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsSold { get; set; } = false;

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string CreatedBy { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets the foreign key for the associated VehicleCategory. This establishes a many-to-one relationship between Vehicle and VehicleCategory.
        /// </summary>
        public int VehicleCategoryId { get; set; }
        public VehicleCategory? VehicleCategory { get; set; }
    }
}
