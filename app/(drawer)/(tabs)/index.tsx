import { EmptyState } from '@components/empty-state';
import { ErrorState } from '@components/error-state';
import { FilterBar } from '@components/filter-bar';
import { JobCard } from '@components/job-card';
import { JobListSkeleton } from '@components/job-list-skeleton';
import { useFilteredJobs, useJobsStore } from '@stores/jobs-store';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

export default function JobsListScreen() {
  const { t } = useTranslation();
  const filteredJobs = useFilteredJobs();
  const loading = useJobsStore((s) => s.loading);
  const error = useJobsStore((s) => s.error);
  const loadJobs = useJobsStore((s) => s.loadJobs);
  const loadCategories = useJobsStore((s) => s.loadCategories);

  useEffect(() => {
    loadJobs();
    loadCategories();
  }, [loadJobs, loadCategories]);

  const onRefresh = useCallback(() => loadJobs(), [loadJobs]);

  if (error && filteredJobs.length === 0) {
    return (
      <Surface style={styles.container}>
        <FilterBar />
        <ErrorState />
      </Surface>
    );
  }

  if (loading && filteredJobs.length === 0) {
    return (
      <Surface style={styles.container}>
        <FilterBar />
        <JobListSkeleton />
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <FilterBar />
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => <JobCard job={item} index={index} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState title={t('No results')} message={t('No results message')} />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingVertical: 8, paddingBottom: 24 },
});
