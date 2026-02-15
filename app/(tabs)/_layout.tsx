import { DrawerActions } from '@react-navigation/native';
import { Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { IconSymbol } from '@components/ui/icon-symbol';
import { Colors } from '@constants/theme';
import { usePreferencesStore } from '@stores/preferences-store';
import { useTranslation } from 'react-i18next';

function DrawerHeaderButton() {
  const navigation = useNavigation();
  const colorScheme = usePreferencesStore((s) => s.colorScheme);
  const color = Colors[colorScheme ?? 'light'].text;
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, padding: 8 }]}>
      <IconSymbol size={28} name="line.3.horizontal" color={color} />
    </Pressable>
  );
}

type TabIconProps = { color: string };

const JobsTabIcon = ({ color }: TabIconProps) => (
  <IconSymbol size={28} name="briefcase.fill" color={color} />
);

const FavoritosTabIcon = ({ color }: TabIconProps) => (
  <IconSymbol size={28} name="heart.fill" color={color} />
);

const ExploreTabIcon = ({ color }: TabIconProps) => (
  <IconSymbol size={28} name="paperplane.fill" color={color} />
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
      <Tabs.Screen
        name="index"
        options={{
          title: t('Jobs'),
          tabBarIcon: JobsTabIcon,
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: t('Favorites'),
          tabBarIcon: FavoritosTabIcon,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('Explore'),
          tabBarIcon: ExploreTabIcon,
        }}
      />
    </Tabs>
  );
}
