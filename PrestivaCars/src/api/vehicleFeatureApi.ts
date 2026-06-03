import { API_BASE_URL } from "./apiConfig";
import { CreateVehicleFeatureRequest, UpdateVehicleFeatureRequest, VehicleFeatureDto } from "../types/vehicleFeature";

/**
 * Fetches a list of vehicle features from the API.
 * @returns A promise that resolves to an array of VehicleFeatureDto objects.
 * @throws An error if the fetch operation fails or if the response is not ok.
 */
export const getVehicleFeatures = async (): Promise<VehicleFeatureDto[]> => {
    const url = `${API_BASE_URL}/VehicleFeature`;
    const response = await fetch(url);
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch vehicle features. Status: ${response.status}. ${errorText}`);
    }

    return response.json();
};

/**
 * Fetches a single vehicle feature by its ID from the API.
 * @param id
 * @returns A promise that resolves to a VehicleFeatureDto object.
 * @throws An error if the fetch operation fails or if the response is not ok.
 */
export const getVehicleFeatureById = async (
  id: number,
): Promise<VehicleFeatureDto> => {
  const url = `${API_BASE_URL}/VehicleFeature/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to fetch vehicle feature with id ${id}. Status: ${response.status}. ${errorText}`,
    );
  }

  return response.json();
};

/**
 * Creates a new vehicle feature using the provided data.
 * @param vehicleFeature
 * @returns A promise that resolves to the created VehicleFeatureDto object.
 * @throws An error if the creation operation fails or if the response is not ok.
 */
export const createVehicleFeature = async (
  vehicleFeature: CreateVehicleFeatureRequest,
): Promise<VehicleFeatureDto> => {
  const response = await fetch(`${API_BASE_URL}/VehicleFeature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicleFeature),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to create vehicle feature. Status: ${response.status}. ${errorText}`,
    );
  }

  const result = await response.json();

  return result.data;
};

/**
 * Updates an existing vehicle feature by its ID.
 * @param id
 * @param vehicleFeature
 * @returns A promise that resolves when the update operation is complete.
 * @throws An error if the update operation fails or if the response is not ok.
 */
export const updateVehicleFeature = async (
  id: number,
  vehicleFeature: UpdateVehicleFeatureRequest,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/VehicleFeature/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicleFeature),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to update vehicle feature. Status: ${response.status}. ${errorText}`,
    );
  }
};

/**
 * Deletes a vehicle feature by its ID from the API.
 * @param id
 * @throws An error if the delete operation fails or if the response is not ok.
 */
export const deleteVehicleFeature = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/VehicleFeature/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to delete vehicle feature. Status: ${response.status}. ${errorText}`,
    );
  }
};