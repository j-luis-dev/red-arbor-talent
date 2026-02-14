/**
 * Paper themes aligned with Redarbor colors from constants/theme.ts.
 * Uses MD3 base and overrides primary, background and surface colors.
 */

import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Colors } from '@/constants/theme';

export const RedarborLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.light.tint,
    background: Colors.light.background,
    surface: Colors.light.background,
    onSurface: Colors.light.text,
    onBackground: Colors.light.text,
    outline: Colors.light.icon,
  },
};

export const RedarborDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.dark.tint,
    background: Colors.dark.background,
    surface: Colors.dark.background,
    onSurface: Colors.dark.text,
    onBackground: Colors.dark.text,
    outline: Colors.dark.icon,
  },
};
