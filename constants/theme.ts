import { Platform } from 'react-native';

const primary = '#c02c39';
const primaryDarkTint = '#fff';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    tint: primary,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primary,
  },
  dark: {
    text: '#e2e8f0',
    background: '#1A202C',
    tint: primaryDarkTint,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryDarkTint,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  }
});
