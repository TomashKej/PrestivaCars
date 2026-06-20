import React from 'react';
import { enableScreens } from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import LandingScreen from './src/screens/LandingScreen';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext'


enableScreens();   // rejestruje natywne ekrany dla lepszej wydajności na Androidzie i iOS

const AppContent = () => {
  const {colors, isDarkMode} = useAppTheme();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <RootNavigator />
    </>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;