/**
 * This file defines TypeScript interfaces for vehicle-related data structures used in the PrestivaCars application.
 * These interfaces include:
 * - VehicleDto: Represents the data transfer object for a vehicle, including all relevant properties.
 * - CreateVehicleRequest: Represents the structure of the request body when creating a new vehicle.
 * - UpdateVehicleRequest: Represents the structure of the request body when updating an existing vehicle.
 */

// Data Transfer Object for Vehicle
export interface VehicleDto {
    id: number;
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
    registrationNumber: string;
    vinNumber: string;
    mileage: number;
    fuelType: string;
    transmission: string;
    price: number;
    description: string;
    isSold: boolean;
    createdAt: string;    // Created at is typically ISO date string
    vehicleCategoryId: number;
    vehicleCategoryName: string;
    isActive: boolean;
}

// Request interfaces for creating and updating vehicles
export interface CreateVehicleRequest {
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
    registrationNumber: string;
    vinNumber: string;
    mileage: number;
    fuelType: string;
    transmission: string;
    price: number;
    description: string;
    isSold: boolean;
    vehicleCategoryId: number;
    isActive: boolean;
}

// UpdateVehicleRequest includes the id of the vehicle to be updated, along with all other properties that can be modified.
export interface UpdateVehicleRequest {
    id: number;
    vehicleType: string;
    brand: string;
    model: string;
    year: number;
    registrationNumber: string;
    vinNumber: string;
    mileage: number;
    fuelType: string;
    transmission: string;
    price: number;
    description: string;
    isSold: boolean;
    vehicleCategoryId: number;
    isActive: boolean;
}