using MediatR;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;

namespace PrestivaCars.Application.Features.Vehicles.Messages.Commands
{
    /// <summary>
    /// This class represents a command to create a new vehicle in the system. It contains properties for the vehicle's details, such as type, brand, model, year, registration number, VIN number, mileage, fuel type, transmission, price, description, and category ID.
    /// When executed, this command will return a VehicleDto representing the newly created vehicle.
    /// </summary>
    public class CreateVehicleCommand : IRequest<VehicleDto>
    {
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

        public int VehicleCategoryId { get; set; }
    }
}
