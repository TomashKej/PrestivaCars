using System;
using System.Collections.Generic;
using System.Text;

namespace PrestivaCars.Domain.Entities
{
    /// <summary>
    /// Represents the many-to-many relationship between Vehicle and VehicleFeature entities in the Prestiva Cars application. 
    /// This class contains properties that serve as foreign keys to both the Vehicle and VehicleFeature entities, allowing a vehicle to have multiple features and a feature to be associated with multiple vehicles.
    /// IMPORTANT NOTE: We are not adding an Id property to this class because it is a join table that represents the many-to-many relationship between Vehicle and VehicleFeature, and it does not require a separate primary key.
    /// </summary>
    public class VehicleVehicleFeature
    {
        public int VehicleId { get; set; }

        public Vehicle Vehicle { get; set; } = null!;       // Navigation property to the Vehicle entity set to non-nullable with null-forgiving operator (null!) to indicate that it will be initialized elsewhere, ensuring that it is not null when accessed.

        public int VehicleFeatureId { get; set; }

        public VehicleFeature VehicleFeature { get; set; } = null!;     
    }
}