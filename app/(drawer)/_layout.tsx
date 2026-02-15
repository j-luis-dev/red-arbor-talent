import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

import { CustomDrawerContent } from '@components/drawer-content';
import { Colors } from '@constants/theme';
import { usePreferencesStore } from '@stores/preferences-store';

function renderDrawerContent(props: DrawerContentComponentProps) {
  return <CustomDrawerContent {...props} />;
}

export default function DrawerLayout() {
  const colorScheme = usePreferencesStore((s) => s.colorScheme);
  const headerTintColor = Colors[colorScheme ?? 'light'].text;

  return (
    <Drawer
      drawerContent={renderDrawerContent}
      screenOptions={{
        headerShown: true,
        headerTitle: 'Red Arbor Talent',
        headerTintColor,
      }}>
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}
