import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Platform, Pressable, StyleSheet } from 'react-native';
import { IconButton, PaperProvider, useTheme } from 'react-native-paper';
import 'react-native-reanimated';

import { DrawerPanel, DRAWER_WIDTH_PX } from '@/components/DrawerPanel';
import { DrawerProvider, useDrawer } from '@/context/DrawerContext';
import { RedarborDarkTheme, RedarborLightTheme } from '@/constants/paperTheme';
import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

function DrawerTrigger() {
  const { open } = useDrawer();
  return (
    <IconButton
      icon="menu"
      size={24}
      onPress={open}
      accessibilityLabel="Abrir menú"
      style={{ marginLeft: 8 }}
    />
  );
}

function RootStack() {
  const theme = useTheme();
  const drawer = useDrawer();
  const animValue = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (drawer.isOpen) {
      setModalVisible(true);
      Animated.timing(animValue, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    } else {
      Animated.timing(animValue, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setModalVisible(false));
    }
  }, [drawer.isOpen, animValue]);

  const backdropOpacity = animValue.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] });
  const panelTranslateX = animValue.interpolate({ inputRange: [0, 1], outputRange: [-DRAWER_WIDTH_PX, 0] });

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            title: 'Empleos',
            headerLeft: DrawerTrigger,
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.onSurface,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="job/[id]" options={{ title: 'Detalle', presentation: 'card' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>

      <Modal visible={modalVisible} transparent animationType="none" statusBarTranslucent>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: '#000', opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={drawer.close} />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, { flexDirection: 'row' }]}>
          <Animated.View style={[{ transform: [{ translateX: panelTranslateX }], width: DRAWER_WIDTH_PX, height: '100%' }]}>
            <DrawerPanel onClose={drawer.close} />
          </Animated.View>
          <Pressable style={{ flex: 1 }} onPress={drawer.close} />
        </Animated.View>
      </Modal>
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? RedarborDarkTheme : RedarborLightTheme;
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAppReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!appReady) return;
    void SplashScreen.hideAsync().catch(() => {});
  }, [appReady]);

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    NavigationBar.setStyle(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={paperTheme}>
        <DrawerProvider>
          <RootStack />
        </DrawerProvider>
        <StatusBar style="auto" />
      </PaperProvider>
    </ThemeProvider>
  );
}
