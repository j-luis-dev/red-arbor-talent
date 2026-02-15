import type { Job, JobType } from '@/types/remotive';

export type SortByOption = 'date' | 'company' | null;

export function filterAndSort(
  jobs: Job[],
  searchQuery: string,
  selectedCategory: string | null,
  selectedJobType: JobType | null,
  sortBy: SortByOption
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
