import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@components/ui/icon-symbol';
import { Colors } from '@constants/theme';
import { usePreferencesStore } from '@stores/preferences-store';
import { useTranslation } from 'react-i18next';

type TabIconProps = { color: string };
const JobsTabIcon = ({ color }: TabIconProps) => (
  <IconSymbol size={28} name="briefcase.fill" color={color} />
);
const FavoritosTabIcon = ({ color }: TabIconProps) => (
  <IconSymbol size={28} name="heart.fill" color={color} />
);

export default function TabLayout() {
  const colorScheme = usePreferencesStore((s) => s.colorScheme);
  const { t, i18n } = useTranslation();
  return (
    <Tabs
      key={i18n.language}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen name="index" options={{ title: t('Jobs'), tabBarIcon: JobsTabIcon }} />
      <Tabs.Screen name="favoritos" options={{ title: t('Favorites'), tabBarIcon: FavoritosTabIcon }} />
    </Tabs>
  );
}
