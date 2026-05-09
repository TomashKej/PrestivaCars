import { API_BASE_URL } from "./apiConfig";
import { CreateVehicleRequest, UpdateVehicleRequest, VehicleDto} from "../types/vehicle";

/**
 * Fetches a list of vehicles from the API.
 * @return A promise that resolves to an array of VehicleDto objects.
 * @throws An error if the fetch operation fails or if the response is not ok.
 */

export const getVehicles = async (): Promise<VehicleDto[]> => {
  const url = `${API_BASE_URL}/Vehicle`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch vehicles. Status: ${response.status}. ${errorText}`);
  }

  return response.json();
};

/**
 * Fetches a single vehicle by its ID from the API.
 * @param id 
 * @returns A promise that resolves to a VehicleDto object.
 * @throws An error if the fetch operation fails or if the response is not ok.
 */

export const getVehicleById = async (id: number): Promise<VehicleDto> => {
    const url = `${API_BASE_URL}/Vehicle/${id}`;
    const response = await fetch(url);

    if (!response.ok) { throw new Error(`Failed to fetch vehicle with id ${id}`); }
    return response.json();
};

/**
 * Creates a new vehicle using the provided data.
 * @param vehicle 
 * @returns A promise that resolves to the created VehicleDto object.
 * @throws An error if the creation operation fails or if the response is not ok.
 */

export const createVehicle = async (vehicle: CreateVehicleRequest): Promise<VehicleDto> => {
    const response = await fetch(`${API_BASE_URL}/Vehicle`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle),
    });

    if (!response.ok) { throw new Error('Failed to create vehicle'); }
    return response.json();
};

/**
 * Updates an existing vehicle by its ID.
 * @param id 
 * @param vehicle 
 * @returns A promise that resolves when the update operation is complete.
 * @throws An error if the update operation fails or if the response is not ok.
 */

export const updateVehicle = async (
  id: number,
  vehicle: UpdateVehicleRequest,
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/Vehicle/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to update vehicle. Status: ${response.status}. ${errorText}`,
    );
  }
};

/**
 * Deletes a vehicle by its ID from the API.
 * @param id 
 * @throws An error if the delete operation fails or if the response is not ok.
 */

export const deleteVehicle = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/Vehicle/${id}`, { method: 'DELETE' });

  if (!response.ok) { throw new Error('Failed to delete vehicle.'); }
};