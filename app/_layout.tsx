import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppThemeProvider } from '@/components/app-theme-provider';
import { Colors } from '@/constants/theme';
import { i18n } from '@/lib/i18n';
import { AnimatedSplash } from '@components/animated-splash';
import { usePreferencesStore } from '@stores/preferences-store';
import { useSplashStore } from '@stores/splash-store';

export default function RootLayout() {
  const colorScheme = usePreferencesStore((s) => s.colorScheme);
  const appReady = useSplashStore((s) => s.appReady);
  const locale = usePreferencesStore((s) => s.locale);
  const headerTintColor = Colors[colorScheme ?? 'light'].text;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <View style={styles.container}>
            <Stack
              screenOptions={{
                headerShown: true,
                headerTitle: 'Red Arbor Talent taco',
                headerTintColor,
                animation: 'fade',
              }}>
              <Stack.Screen
                name="(drawer)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="job/[id]"
                options={{
                  title: 'Detalle',
                  headerBackTitle: '',
                }}
              />
            </Stack>
            {!appReady && <AnimatedSplash />}
          </View>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </AppThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
