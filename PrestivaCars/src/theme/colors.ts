/**
 * Defines all colours used by the light and dark application themes.
 */
export type ThemeColors = {
  background: string;
  surface: string;
  surfaceSoft: string;

  textPrimary: string;
  textSecondary: string;

  border: string;

  primary: string;
  secondary: string;
  accent: string;

  white: string;
  black: string;
  shadow: string;

  placeholder: string;
  inputBackground: string;
  landingBackground: string;

  imagePlaceholder: string;
  imagePlaceholderText: string;

  successBackground: string;
  dangerBackground: string;
  dangerText: string;

  disabledBackground: string;
  disabledBorder: string;

  overlay: string;
};

/**
 * Colours used when the light theme is active.
 */
export const lightColors: ThemeColors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceSoft: '#F0F0F0',

  textPrimary: '#111111',
  textSecondary: '#5F5F5F',

  border: '#D9D9D9',

  primary: '#C40000',
  secondary: '#2C27FF',
  accent: '#E10600',

  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(0, 0, 0, 0.15)',

  placeholder: '#A9A9A9',
  inputBackground: '#F4F4F4',
  landingBackground: '#EFE8DF',

  imagePlaceholder: '#D1D5DB',
  imagePlaceholderText: '#6B7280',

  successBackground: '#DCFCE7',
  dangerBackground: '#FEE2E2',
  dangerText: '#991B1B',

  disabledBackground: '#E7E7E7',
  disabledBorder: '#BDBDBD',

  overlay: 'rgba(0, 0, 0, 0.35)',
};

/**
 * Colours used when the dark theme is active.
 */
export const darkColors: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  surfaceSoft: '#292929',

  textPrimary: '#F5F5F5',
  textSecondary: '#B5B5B5',

  border: '#3A3A3A',

  primary: '#FF4D4F',
  secondary: '#6C63FF',
  accent: '#FF5A52',

  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(0, 0, 0, 0.45)',

  placeholder: '#8A8A8A',
  inputBackground: '#242424',
  landingBackground: '#171717',

  imagePlaceholder: '#30343B',
  imagePlaceholderText: '#B3B8C2',

  successBackground: '#163A25',
  dangerBackground: '#451F23',
  dangerText: '#FFB4B4',

  disabledBackground: '#2D2D2D',
  disabledBorder: '#484848',

  overlay: 'rgba(0, 0, 0, 0.65)',
};

/**
 * Temporary default export.
 * Existing components will continue using the light theme
 * until they are connected to ThemeContext.
 */
export default lightColors;