import {API_BASE_URL} from './apiConfig';
import {VehicleCategoryDto} from '../types/vehicleCategory';

export const getVehicleCategories = async (): Promise<VehicleCategoryDto[]> => {
  const url = `${API_BASE_URL}/VehicleCategory`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to fetch vehicle categories. Status: ${response.status}. ${errorText}`,
    );
  }

  return response.json();
};