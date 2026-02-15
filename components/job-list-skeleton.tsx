import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { Surface, useTheme } from 'react-native-paper';

const SKELETON_COUNT = 6;

export const JobListSkeleton = () => {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();

  return (
    <View style={styles.container}>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => `skeleton-${i}`).map(
        (id, i) => (
          <MotiView
            key={id}
            from={{ opacity: 0.5 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: [0.5, 1, 0.5] }
            }
            transition={
              reduceMotion
                ? { type: 'timing', duration: 0 }
                : {
                    type: 'timing',
                    duration: 1500,
                    delay: i * 100,
                    loop: true,
                    repeatReverse: true,
                  }
            }
          >
            <Surface style={styles.card} elevation={0}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: theme.colors.surfaceVariant },
                ]}
              />
              <View style={styles.lines}>
                <View
                  style={[
                    styles.line,
                    styles.lineTitle,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                />
                <View
                  style={[
                    styles.line,
                    styles.lineSub,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                />
                <View
                  style={[
                    styles.line,
                    styles.lineMeta,
                    { backgroundColor: theme.colors.surfaceVariant },
                  ]}
                />
              </View>
            </Surface>
          </MotiView>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  lines: {
    flex: 1,
    gap: 6,
  },
  line: {
    height: 12,
    borderRadius: 4,
  },
  lineTitle: {
    width: '85%',
    height: 16,
  },
  lineSub: {
    width: '60%',
  },
  lineMeta: {
    width: '40%',
  },
});
