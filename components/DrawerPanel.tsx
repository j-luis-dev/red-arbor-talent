import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const DRAWER_WIDTH = 280;

export function DrawerPanel({ onClose }: { readonly onClose: () => void }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ScrollView
      style={[styles.panel, { backgroundColor: theme.colors.surface, paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.tint }]}>
          <Text style={[styles.iconText, { color: '#fff' }]}>R</Text>
        </View>
        <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
          redarborTalent
        </Text>
      </View>
      <View style={[styles.section, { borderTopColor: theme.colors.outlineVariant }]}>
        <Text variant="labelSmall" style={[styles.sectionLabel, { color: theme.colors.onSurfaceVariant }]}>
          PREFERENCIAS
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurface, paddingHorizontal: 16, paddingVertical: 8 }}>
          (Modo oscuro e idioma próximamente)
        </Text>
      </View>
    </ScrollView>
  );
}

export const DRAWER_WIDTH_PX = DRAWER_WIDTH;

const styles = StyleSheet.create({
  panel: {
    width: DRAWER_WIDTH,
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
    fontWeight: '700',
  },
  title: {
    fontWeight: '600',
  },
  section: {
    borderTopWidth: 1,
    paddingTop: 16,
    marginTop: 8,
  },
  sectionLabel: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    letterSpacing: 0.5,
  },
});
