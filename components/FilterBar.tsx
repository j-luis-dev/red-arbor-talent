import type { JobType } from '@/types/remotive';
import { useJobsStore } from '@stores/jobs-store';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Menu, Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export function FilterBar() {
  const { t } = useTranslation();
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

  const handleSearch = useCallback((q: string) => setSearchQuery(q), [setSearchQuery]);

  const categoryNames = categories.map((c) => c.name);
  const sortLabel =
    [
      { value: null as const, label: t('No sort') },
      { value: 'date' as const, label: t('By date') },
      { value: 'company' as const, label: t('By company') },
    ].find((o) => o.value === sortBy)?.label ?? t('Sort by');

  const jobTypes: { value: JobType | null; label: string }[] = [
    { value: null, label: t('All') },
    { value: 'full_time', label: t('Full time') },
    { value: 'part_time', label: t('Part time') },
    { value: 'contract', label: t('Contract') },
    { value: 'freelance', label: t('Freelance') },
  ];
  const sortOptions = [
    { value: null as const, label: t('No sort') },
    { value: 'date' as const, label: t('By date') },
    { value: 'company' as const, label: t('By company') },
  ];

  return (
    <View style={styles.wrapper}>
      <Searchbar
        placeholder={t('Search jobs placeholder')}
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.search}
        accessibilityLabel={t('Search jobs label')}
        accessibilityHint={t('Search jobs hint')}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        <Menu
          visible={categoryOpen}
          onDismiss={() => setCategoryOpen(false)}
          anchor={
            <Button
              mode="outlined"
              compact
              onPress={() => setCategoryOpen(true)}
              style={styles.anchorButton}
            >
              {selectedCategory ?? t('Category')}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSelectedCategory(null);
              setCategoryOpen(false);
            }}
            title={t('All')}
          />
          {categoryNames.map((name) => (
            <Menu.Item
              key={name}
              onPress={() => {
                setSelectedCategory(name);
                setCategoryOpen(false);
              }}
              title={name}
            />
          ))}
        </Menu>
        {jobTypes.map(({ value, label }) => (
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
          anchor={
            <Button
              mode="outlined"
              compact
              onPress={() => setSortOpen(true)}
              style={styles.anchorButton}
              icon="sort"
            >
              {sortLabel}
            </Button>
          }
        >
          {sortOptions.map(({ value, label }) => (
            <Menu.Item
              key={String(value)}
              onPress={() => {
                setSortBy(value);
                setSortOpen(false);
              }}
              title={label}
            />
          ))}
        </Menu>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  search: { marginBottom: 4 },
  chips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  chip: { marginRight: 0 },
  anchorButton: { marginRight: 4 },
});
