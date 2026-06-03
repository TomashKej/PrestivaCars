/**
 * This file defines the TypeScript interfaces for the Vehicle Feature data transfer objects (DTOs) 
 * and request payloads used in the application. 
 * These interfaces ensure type safety when handling vehicle feature data throughout the application, 
 * including creating, updating, and retrieving vehicle features.
 * 
 * The interfaces defined in this file include:
 * - VehicleFeatureDto: Represents the data transfer object for a vehicle feature, including all relevant properties.
 * - CreateVehicleFeatureRequest: Represents the structure of the request body when creating a new vehicle feature.
 * - UpdateVehicleFeatureRequest: Represents the structure of the request body when updating an existing vehicle feature.
 */

// Data transfer object for Vehicle Feature
export interface VehicleFeatureDto {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

// Request interfaces for creating and updating vehicle features
export interface CreateVehicleFeatureRequest {
    name: string;
    description: string;
    isActive: boolean;
}

// UpdateVehicleFeatureRequest includes the id of the vehicle feature to be updated, along with all other properties that can be modified.
export interface UpdateVehicleFeatureRequest {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}