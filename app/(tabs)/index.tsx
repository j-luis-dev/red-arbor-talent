import { JobCard } from '@/components/JobCard';
import { FilterBar } from '@/components/FilterBar';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { JobListSkeleton } from '@/components/JobListSkeleton';
import { useJobsStore, useFilteredJobs } from '@/store/jobsStore';
import React, { useCallback, useEffect } from 'react';
import { RefreshControl, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Surface } from 'react-native-paper';

export default function JobsListScreen() {
  const insets = useSafeAreaInsets();
  const filteredJobs = useFilteredJobs();
  const loading = useJobsStore((s) => s.loading);
  const error = useJobsStore((s) => s.error);
  const loadJobs = useJobsStore((s) => s.loadJobs);
  const loadCategories = useJobsStore((s) => s.loadCategories);

  useEffect(() => {
    loadJobs();
    loadCategories();
  }, [loadJobs, loadCategories]);

  const onRefresh = useCallback(() => {
    loadJobs();
  }, [loadJobs]);

  if (error && filteredJobs.length === 0) {
    return (
      <Surface style={[styles.container, { paddingTop: insets.top }]}>
        <FilterBar />
        <ErrorState />
      </Surface>
    );
  }

  if (loading && filteredJobs.length === 0) {
    return (
      <Surface style={[styles.container, { paddingTop: insets.top }]}>
        <FilterBar />
        <JobListSkeleton />
      </Surface>
    );
  }

  return (
    <Surface style={[styles.container, { paddingTop: insets.top }]}>
      <FilterBar />
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => <JobCard job={item} index={index} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            title="Sin resultados"
            message="Prueba a cambiar filtros o búsqueda."
          />
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
