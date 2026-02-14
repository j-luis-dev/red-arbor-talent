import { useJobsStore } from '@/store/jobsStore';
import type { JobType } from '@/types/remotive';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Menu, Searchbar } from 'react-native-paper';

const JOB_TYPES: { value: JobType | null; label: string }[] = [
  { value: null, label: 'Todos' },
  { value: 'full_time', label: 'Tiempo completo' },
  { value: 'part_time', label: 'Medio tiempo' },
  { value: 'contract', label: 'Contrato' },
  { value: 'freelance', label: 'Freelance' },
];

const SORT_OPTIONS: { value: 'date' | 'company' | null; label: string }[] = [
  { value: null, label: 'Sin orden' },
  { value: 'date', label: 'Por fecha' },
  { value: 'company', label: 'Por empresa' },
];

export function FilterBar() {
  const searchQuery = useJobsStore((s) => s.searchQuery);
  const setSearchQuery = useJobsStore((s) => s.setSearchQuery);
  const categories = useJobsStore((s) => s.categories);
  const selectedCategory = useJobsStore((s) => s.selectedCategory);
  const setSelectedCategory = useJobsStore((s) => s.setSelectedCategory);
  const selectedJobType = useJobsStore((s) => s.selectedJobType);
  const setSelectedJobType = useJobsStore((s) => s.setSelectedJobType);
  const sortBy = useJobsStore((s) => s.sortBy);
  const setSortBy = useJobsStore((s) => s.setSortBy);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const handleSearch = useCallback(
    (q: string) => setSearchQuery(q),
    [setSearchQuery]
  );

  const categoryNames = categories.map((c) => c.name);
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Ordenar';

  return (
    <View style={styles.wrapper}>
      <Searchbar
        placeholder="Buscar por puesto o empresa..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.search}
        accessibilityLabel="Buscar empleos por título o empresa"
        accessibilityHint="Escribe para filtrar la lista"
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Menu
          visible={categoryOpen}
          onDismiss={() => setCategoryOpen(false)}
          anchor={<Button mode="outlined" compact onPress={() => setCategoryOpen(true)} style={styles.anchorButton}>{selectedCategory ?? 'Categoría'}</Button>}
        >
          <Menu.Item onPress={() => { setSelectedCategory(null); setCategoryOpen(false); }} title="Todas" />
          {categoryNames.map((name) => (
            <Menu.Item key={name} onPress={() => { setSelectedCategory(name); setCategoryOpen(false); }} title={name} />
          ))}
        </Menu>
        {JOB_TYPES.map(({ value, label }) => (
          <Chip
            key={String(value)}
            selected={selectedJobType === value}
            onPress={() => setSelectedJobType(value)}
            style={styles.chip}
            compact
          >
            {label}
          </Chip>
        ))}
        <Menu
          visible={sortOpen}
          onDismiss={() => setSortOpen(false)}
          anchor={<Button mode="outlined" compact onPress={() => setSortOpen(true)} style={styles.anchorButton} icon="sort">{sortLabel}</Button>}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <Menu.Item key={String(value)} onPress={() => { setSortBy(value); setSortOpen(false); }} title={label} />
          ))}
        </Menu>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  search: {
    marginBottom: 4,
  },
  chips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  chip: { marginRight: 0 },
  anchorButton: { marginRight: 4 },
});
