import { JobCard } from '@/components/JobCard';
import { EmptyState } from '@/components/EmptyState';
import { useJobsStore } from '@/store/jobsStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Surface, Text } from 'react-native-paper';

export default function FavoritosScreen() {
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
          title="Sin favoritos"
          message="Los empleos que guardes con el corazón aparecerán aquí."
        />
      </Surface>
    );
  }

  if (favoriteJobs.length === 0) {
    return (
      <Surface style={[styles.container, { paddingTop: insets.top }]}>
        <EmptyState
          title="Cargando favoritos..."
          message="La lista de empleos se está cargando."
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
        ListHeaderComponent={<Text variant="bodySmall" style={styles.count}>{favoriteJobs.length} guardados</Text>}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingVertical: 8, paddingBottom: 24 },
  count: { paddingHorizontal: 16, paddingVertical: 8, opacity: 0.7 },
});
