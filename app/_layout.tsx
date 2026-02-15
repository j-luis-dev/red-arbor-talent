import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { i18n } from '@/lib/i18n';
import { AnimatedSplash } from '@components/animated-splash';
import { AppThemeProvider } from '@components/app-theme-provider';
import { usePreferencesStore } from '@stores/preferences-store';
import { useSplashStore } from '@stores/splash-store';

export default function RootLayout() {
  const colorScheme = usePreferencesStore((s) => s.colorScheme);
  const appReady = useSplashStore((s) => s.appReady);
  const locale = usePreferencesStore((s) => s.locale);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <View style={styles.container}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          {!appReady && <AnimatedSplash />}
        </View>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
