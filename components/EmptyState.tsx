import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { Surface, Text, useTheme } from 'react-native-paper';

interface EmptyStateProps {
  readonly title: string;
  readonly message?: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduceMotion ? { type: 'timing', duration: 0 } : { type: 'timing', duration: 400 }}
      style={styles.wrapper}
    >
      <Surface style={styles.surface} elevation={0}>
        <Text variant="headlineSmall" style={styles.title}>
          {title}
        </Text>
        {message ? (
          <Text variant="bodyMedium" style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
            {message}
          </Text>
        ) : null}
      </Surface>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  surface: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 240,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
  },
});
