import type { JobType } from '@/types/remotive';
import { useDebounce } from '@hooks/use-debounce';
import { useJobsStore } from '@stores/jobs-store';
import { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  CATEGORY_MENU_HEIGHT_RATIO,
  SEARCH_DEBOUNCE_MS,
} from './constants';

export type SortOptionValue = 'date' | 'company' | null;

export function useFilterBar() {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

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
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const debouncedSearch = useDebounce(localSearch, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const handleSearch = useCallback((q: string) => setLocalSearch(q), []);

  const categoryNames = categories.map((c) => c.name);

  const sortOptionsForLabel: { value: SortOptionValue; label: string }[] = [
    { value: null, label: t('No sort') },
    { value: 'date', label: t('By date') },
    { value: 'company', label: t('By company') },
  ];
  const sortLabel =
    sortOptionsForLabel.find((o) => o.value === sortBy)?.label ?? t('Sort by');

  const jobTypes: { value: JobType | null; label: string }[] = [
    { value: null, label: t('All') },
    { value: 'full_time', label: t('Full time') },
    { value: 'part_time', label: t('Part time') },
    { value: 'contract', label: t('Contract') },
    { value: 'freelance', label: t('Freelance') },
  ];

  const sortOptions: { value: SortOptionValue; label: string }[] = [
    { value: null, label: t('No sort') },
    { value: 'date', label: t('By date') },
    { value: 'company', label: t('By company') },
  ];

  const categoryMenuMaxHeight = height * CATEGORY_MENU_HEIGHT_RATIO;

  return {
    t,
    localSearch,
    handleSearch,
    categoryOpen,
    setCategoryOpen,
    sortOpen,
    setSortOpen,
    categoryNames,
    selectedCategory,
    setSelectedCategory,
    sortLabel,
    jobTypes,
    selectedJobType,
    setSelectedJobType,
    sortOptions,
    setSortBy,
    categoryMenuMaxHeight,
  };
}
