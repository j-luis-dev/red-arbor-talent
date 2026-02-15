import { EmptyState } from '@components/EmptyState';
import { JobCard } from '@components/JobCard';
import { useFavoritesStore } from '@stores/favorites-store';
import { useJobsStore } from '@stores/jobs-store';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Surface, Text } from 'react-native-paper';

export default function FavoritosScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const jobs = useJobsStore((s) => s.jobs);
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const favoriteJobs = useMemo(
    () => jobs.filter((j) => favoriteIds.includes(j.id)),
    [jobs, favoriteIds]
  );

  if (favoriteIds.length === 0) {
    return (
      <Surface style={[styles.container, { paddingTop: insets.top }]}>
        <EmptyState
          title={t('No favorites')}
          message={t('No favorites message')}
        />
      </Surface>
    );
  }

  if (favoriteJobs.length === 0) {
    return (
      <Surface style={[styles.container, { paddingTop: insets.top }]}>
        <EmptyState
          title={t('Loading favorites')}
          message={t('Loading favorites message')}
        />
      </Surface>
    );
  }

  return (
    <Surface style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={favoriteJobs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => <JobCard job={item} index={index} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text variant="bodySmall" style={styles.count}>
            {favoriteJobs.length} {t('saved')}
          </Text>
        }
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingVertical: 8, paddingBottom: 24 },
  count: { paddingHorizontal: 16, paddingVertical: 8, opacity: 0.7 },
});
