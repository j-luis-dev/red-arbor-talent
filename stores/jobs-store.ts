import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';
import { create } from 'zustand';
import type { Category, Job, JobType } from '@/types/remotive';
import {
  fetchCategories,
  fetchJobs,
  RemotiveApiError,
} from '@/services/remotive';

const JOBS_CACHE_KEY = '@jobs_cache';
const CATEGORIES_CACHE_KEY = '@categories_cache';

interface JobsState {
  jobs: Job[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  isRevalidating: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  selectedJobType: JobType | null;
  sortBy: 'date' | 'company' | null;
  loadJobs: () => Promise<void>;
  loadCategories: () => Promise<void>;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedJobType: (type: JobType | null) => void;
  setSortBy: (sort: 'date' | 'company' | null) => void;
  clearError: () => void;
}

function filterAndSort(
  jobs: Job[],
  searchQuery: string,
  selectedCategory: string | null,
  selectedJobType: JobType | null,
  sortBy: 'date' | 'company' | null
): Job[] {
  let result = [...jobs];
  const q = searchQuery.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company_name.toLowerCase().includes(q)
    );
  }
  if (selectedCategory) {
    result = result.filter((j) => j.category === selectedCategory);
  }
  if (selectedJobType) {
    result = result.filter((j) => j.job_type === selectedJobType);
  }
  if (sortBy === 'date') {
    result.sort(
      (a, b) =>
        new Date(b.publication_date).getTime() -
        new Date(a.publication_date).getTime()
    );
  } else if (sortBy === 'company') {
    result.sort((a, b) =>
      a.company_name.localeCompare(b.company_name, undefined, {
        sensitivity: 'base',
      })
    );
  }
  return result;
}

export const useJobsStore = create<JobsState>((set, get) => ({
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
      await AsyncStorage.setItem(
        CATEGORIES_CACHE_KEY,
        JSON.stringify(categories)
      );
    } catch {
      try {
        const cached = await AsyncStorage.getItem(CATEGORIES_CACHE_KEY);
        if (cached) {
          const categories = JSON.parse(cached) as Category[];
          set({ categories });
        }
      } catch {
        set({ categories: [] });
      }
    }
  },

  loadJobs: async () => {
    const state = get();
    if (state.jobs.length === 0 && !state.loading) {
      try {
        const cached = await AsyncStorage.getItem(JOBS_CACHE_KEY);
        if (cached) {
          const jobs = JSON.parse(cached) as Job[];
          set({ jobs, isRevalidating: true });
        }
      } catch {
        // ignore
      }
    }

    set({ loading: true, error: null });
    try {
      const jobs = await fetchJobs();
      set({ jobs, loading: false, isRevalidating: false });
      await AsyncStorage.setItem(JOBS_CACHE_KEY, JSON.stringify(jobs));
    } catch (err) {
      const message =
        err instanceof RemotiveApiError
          ? err.message
          : 'Error de red. Comprueba tu conexión e intenta de nuevo.';
      set({
        loading: false,
        error: message,
        isRevalidating: false,
      });
      if (get().jobs.length === 0) {
        try {
          const cached = await AsyncStorage.getItem(JOBS_CACHE_KEY);
          if (cached) {
            const jobs = JSON.parse(cached) as Job[];
            set({ jobs });
          }
        } catch {
          // ignore
        }
      }
    }
  },
}));

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
