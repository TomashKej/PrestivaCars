using MediatR;
using PrestivaCars.Application.Features.Vehicles.Messages.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace PrestivaCars.Application.Features.Vehicles.Messages.Commands
{
    public class UpdateVehicleCommand : IRequest<Unit>
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
        public bool IsSold { get; set; }
        public int VehicleCategoryId { get; set; }
        public bool IsActive { get; set; }
    }
}
