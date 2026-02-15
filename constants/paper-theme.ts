import {
  MD3DarkTheme,
  MD3LightTheme,
  type MD3Theme
} from 'react-native-paper';

/** App palette - primary, secondary, accent */
const primary = '#c02c39';
const secondary = '#39c02c';
const tertiary = '#2c39c0';
const onAccent = '#ffffff';

/** Light theme neutrals */
const lightBackground = '#ffffff';
const lightSurface = '#ffffff';
const lightOnBackground = '#000000';
const lightOnSurface = '#000000';
const lightOutline = '#79747e';
const lightSurfaceVariant = '#e7e0ec';
const lightOnSurfaceVariant = '#49454f';

/** Dark theme neutrals (from references) */
const darkBackground = '#1A202C';
const darkSurface = '#2D3748';
const darkOnBackground = '#f7fafc';
const darkOnSurface = '#e2e8f0';
const darkOutline = '#938f99';
const darkSurfaceVariant = '#49454f';
const darkOnSurfaceVariant = '#cac4d0';

/** Error (keep readable in both modes) */
const errorLight = '#ba1a1a';
const errorDark = '#ffb4ab';

export const lightPaperTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary,
    onPrimary: onAccent,
    primaryContainer: '#ffdad6',
    onPrimaryContainer: '#410002',
    secondary,
    onSecondary: onAccent,
    secondaryContainer: '#d4f8cd',
    onSecondaryContainer: '#002203',
    tertiary,
    onTertiary: onAccent,
    tertiaryContainer: '#dde1ff',
    onTertiaryContainer: '#000f5c',
    background: lightBackground,
    onBackground: lightOnBackground,
    surface: lightSurface,
    onSurface: lightOnSurface,
    surfaceVariant: lightSurfaceVariant,
    onSurfaceVariant: lightOnSurfaceVariant,
    outline: lightOutline,
    outlineVariant: '#cac4d0',
    error: errorLight,
    onError: onAccent,
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(247, 243, 249)',
      level2: 'rgb(243, 237, 246)',
      level3: 'rgb(238, 232, 244)',
      level4: 'rgb(236, 230, 243)',
      level5: 'rgb(233, 227, 241)',
    },
  },
};

export const darkPaperTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary,
    onPrimary: onAccent,
    primaryContainer: '#93000a',
    onPrimaryContainer: '#ffdad6',
    secondary,
    onSecondary: onAccent,
    secondaryContainer: '#00520c',
    onSecondaryContainer: '#d4f8cd',
    tertiary,
    onTertiary: onAccent,
    tertiaryContainer: '#363e90',
    onTertiaryContainer: '#dde1ff',
    background: darkBackground,
    onBackground: darkOnBackground,
    surface: darkSurface,
    onSurface: darkOnSurface,
    surfaceVariant: darkSurfaceVariant,
    onSurfaceVariant: darkOnSurfaceVariant,
    outline: darkOutline,
    outlineVariant: darkSurfaceVariant,
    error: errorDark,
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(37, 35, 42)',
      level2: 'rgb(44, 40, 49)',
      level3: 'rgb(49, 44, 56)',
      level4: 'rgb(51, 46, 58)',
      level5: 'rgb(52, 49, 63)',
    },
  },
};

export type AppColorScheme = 'light' | 'dark';

export const getAppPaperTheme = (colorScheme: AppColorScheme): MD3Theme =>
  colorScheme === 'dark' ? darkPaperTheme : lightPaperTheme;
