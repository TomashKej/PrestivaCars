using System;
using System.Collections.Generic;
using System.Text;

namespace PrestivaCars.Domain.Entities
{
    /// <summary>
    /// Represents a vehicle feature entity in the Prestiva Cars application. This class contains properties that describe various attributes of a vehicle feature, such as its name, description, and activity status.
    /// </summary>
    public class VehicleFeature
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        /// <summary>
        /// Gets or sets the collection of VehicleVehicleFeature entities that represent the many-to-many relationship between Vehicle and VehicleFeature. This allows a vehicle to have multiple features and a feature to be associated with multiple vehicles.
        /// </summary>
        public ICollection<VehicleVehicleFeature> VehicleVehicleFeatures { get; set; } = new List<VehicleVehicleFeature>();
    }
}
