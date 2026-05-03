using System;
using System.Collections.Generic;
using System.Text;

namespace PrestivaCars.Domain.Entities
{
    /// <summary>
    /// Represents a category of vehicles in the Prestiva Cars application. Each category can have multiple vehicles associated with it.
    /// </summary>
    public class VehicleCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the collection of vehicles that belong to this category. This establishes a one-to-many relationship between VehicleCategory and Vehicle.
        /// </summary>
        public ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
    }
}
