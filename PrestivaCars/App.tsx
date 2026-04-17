import React from 'react';
import { enableScreens } from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, useColorScheme} from 'react-native';
import LandingScreen from './src/screens/LandingScreen';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  enableScreens(); // rejestruje natywne ekrany dla lepszej wydajności na Androidzie i iOS
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
export default App;