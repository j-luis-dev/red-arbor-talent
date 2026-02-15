import { filterAndSort, type SortByOption } from '@/lib/filter-jobs';
import {
  fetchCategories,
  fetchJobs,
  RemotiveApiError,
} from '@/services/remotive';
import type { Category, Job, JobType } from '@/types/remotive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const JOBS_STORE_KEY = '@jobs-store';

function getLoadJobsErrorMessage(err: unknown): string {
  return err instanceof RemotiveApiError
    ? err.message
    : 'Error de red. Comprueba tu conexión e intenta de nuevo.';
}

interface JobsState {
  jobs: Job[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  isRevalidating: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  selectedJobType: JobType | null;
  sortBy: SortByOption;
  loadJobs: () => Promise<void>;
  loadCategories: () => Promise<void>;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedJobType: (type: JobType | null) => void;
  setSortBy: (sort: SortByOption) => void;
  clearError: () => void;
}

type PersistedSlice = Pick<
  JobsState,
  | 'jobs'
  | 'categories'
  | 'searchQuery'
  | 'selectedCategory'
  | 'selectedJobType'
  | 'sortBy'
>;

export const useJobsStore = create<JobsState>()(
  persist(
    (set, get) => ({
      jobs: [],
      categories: [],
      loading: false,
      error: null,
      isRevalidating: false,
      searchQuery: '',
      selectedCategory: null,
      selectedJobType: null,
      sortBy: null,

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSelectedJobType: (selectedJobType) => set({ selectedJobType }),
      setSortBy: (sortBy) => set({ sortBy }),
      clearError: () => set({ error: null }),

      loadCategories: async () => {
        try {
          const categories = await fetchCategories();
          set({ categories });
        } catch {
          set({ categories: [] });
        }
      },

      loadJobs: async () => {
        set({ loading: true, error: null });
        try {
          const jobs = await fetchJobs();
          set({ jobs, loading: false, isRevalidating: false });
        } catch (err) {
          set({
            loading: false,
            error: getLoadJobsErrorMessage(err),
            isRevalidating: false,
          });
        }
      },
    }),
    {
      name: JOBS_STORE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): PersistedSlice => ({
        jobs: state.jobs,
        categories: state.categories,
        searchQuery: state.searchQuery,
        selectedCategory: state.selectedCategory,
        selectedJobType: state.selectedJobType,
        sortBy: state.sortBy,
      }),
    }
  )
);

export function useFilteredJobs(): Job[] {
  const jobs = useJobsStore((s) => s.jobs);
  const searchQuery = useJobsStore((s) => s.searchQuery);
  const selectedCategory = useJobsStore((s) => s.selectedCategory);
  const selectedJobType = useJobsStore((s) => s.selectedJobType);
  const sortBy = useJobsStore((s) => s.sortBy);
  return useMemo(
    () =>
      filterAndSort(
        jobs,
        searchQuery,
        selectedCategory,
        selectedJobType,
        sortBy
      ),
    [jobs, searchQuery, selectedCategory, selectedJobType, sortBy]
  );
}
