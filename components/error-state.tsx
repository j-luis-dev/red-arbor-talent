import { useJobsStore } from '@stores/jobs-store';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { Button, Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export const ErrorState = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const error = useJobsStore((s) => s.error);
  const clearError = useJobsStore((s) => s.clearError);
  const loadJobs = useJobsStore((s) => s.loadJobs);

  const handleRetry = () => {
    clearError();
    loadJobs();
  };

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        reduceMotion
          ? { type: 'timing', duration: 0 }
          : { type: 'timing', duration: 300 }
      }
      style={styles.container}
    >
      <Text variant="titleMedium" style={styles.title}>
        {t('Something went wrong')}
      </Text>
      <Text
        variant="bodyMedium"
        style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
      >
        {error ?? t('Something went wrong')}
      </Text>
      <Button
        mode="contained"
        onPress={handleRetry}
        style={styles.button}
        accessibilityLabel={t('Retry load jobs label')}
        accessibilityHint={t('Retry load jobs hint')}
      >
        {t('Retry')}
      </Button>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    minWidth: 160,
  },
});
