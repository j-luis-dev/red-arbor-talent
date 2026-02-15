import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@components/haptic-tab';
import { IconSymbol } from '@components/ui/icon-symbol';
import { Colors } from '@constants/theme';
import { usePreferencesStore } from '@stores/preferences-store';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const colorScheme = usePreferencesStore((s) => s.colorScheme);
  const { t, i18n } = useTranslation();

  return (
    <Tabs
      key={i18n.language}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('Home'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('Explore'),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
