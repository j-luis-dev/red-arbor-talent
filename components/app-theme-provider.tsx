import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { type PropsWithChildren } from 'react';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';

import {
  darkPaperTheme,
  getAppPaperTheme,
  lightPaperTheme,
} from '@constants/paper-theme';
import { usePreferencesStore } from '@stores/preferences-store';

const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } =
  adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkTheme,
    materialLight: lightPaperTheme,
    materialDark: darkPaperTheme,
  });

export function AppThemeProvider({ children }: Readonly<PropsWithChildren>) {
  const colorScheme = usePreferencesStore((s) => s.colorScheme);
  const paperTheme = getAppPaperTheme(colorScheme ?? 'light');
  const navigationTheme =
    colorScheme === 'dark' ? AdaptedDarkTheme : AdaptedLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>
    </PaperProvider>
  );
}
