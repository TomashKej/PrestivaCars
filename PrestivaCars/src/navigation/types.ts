/** 
 * Type definition for the root stack parameter list. 
 * This defines the types of parameters that can be passed to each screen in the root stack navigator.
 * If a screen does not require any parameters, it is set to undefined.
 */
export type RootStackParamList = {
    Landing: undefined;
    Home: undefined;
    Vehicles: undefined;
    VehicleDetails: { vehicleId: number }; // VehicleDetails screen expects a vehicleId parameter of type number
    SellVehicle: undefined;
    Account: undefined;
    MyVehicleListings: undefined;
    EditVehicle: { vehicleId: number }; // EditVehicle screen expects a vehicleId parameter of type number
}