import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
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
import { CustomDrawerContent } from '@components/drawer-content';
import { usePreferencesStore } from '@stores/preferences-store';
import { useSplashStore } from '@stores/splash-store';

function renderDrawerContent(props: DrawerContentComponentProps) {
  return <CustomDrawerContent {...props} />;
}

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
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <View style={styles.container}>
            <Drawer
              drawerContent={renderDrawerContent}
              screenOptions={{
                headerShown: true,
                headerTitle: 'Red Arbor Talent',
                headerTintColor: Colors[colorScheme ?? 'light'].text,
              }}>
              <Drawer.Screen name="(tabs)" />
            </Drawer>
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
