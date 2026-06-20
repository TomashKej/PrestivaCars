import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';
import {
  darkColors,
  lightColors,
  ThemeColors,
} from './colors';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  themeMode: ThemeMode;
  colors: ThemeColors;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

/**
 * Provides the currently selected application theme
 * to all screens and components.
 */
export const ThemeProvider = ({children}: PropsWithChildren) => {
  const systemColorScheme = useColorScheme();

  const [themeMode, setThemeMode] = useState<ThemeMode>(
    systemColorScheme === 'dark' ? 'dark' : 'light',
  );

  const toggleTheme = useCallback(() => {
    setThemeMode(currentTheme =>
      currentTheme === 'light' ? 'dark' : 'light',
    );
  }, []);

  const colors =
    themeMode === 'dark'
      ? darkColors
      : lightColors;

  const value = useMemo(
    () => ({
      themeMode,
      colors,
      isDarkMode: themeMode === 'dark',
      toggleTheme,
    }),
    [themeMode, colors, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Returns the current application theme.
 * Must be used inside ThemeProvider.
 */
export const useAppTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'useAppTheme must be used inside ThemeProvider.',
    );
  }

  return context;
};