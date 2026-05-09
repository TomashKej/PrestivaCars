/** Root Navigator
 * The root navigator is used to display modals on top of all other content, and should only be used for components like modals and popups. 
 * If you need to display a stack of content, you can Nest navigators inside the root navigator.
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/HomeScreen';
import VehicleListScreen from '../screens/vehicles/VehicleListScreen';
import {RootStackParamList} from './types';
import VehicleDetailsScreen from '../screens/vehicles/VehicleDetailsScreen';
import SellVehicleScreen from '../screens/vehicles/SellVehicleScreen';
import AccountScreen from '../screens/AccountScreen';
import MyVehiclesListingsScreen from '../screens/vehicles/MyVehicleListingsScreen';
import EditVehicleScreen from '../screens/vehicles/EditVehicleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Vehicles" component={VehicleListScreen} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
        <Stack.Screen name="SellVehicle" component={SellVehicleScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="MyVehicleListings" component={MyVehiclesListingsScreen} />
        <Stack.Screen name="EditVehicle" component={EditVehicleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;