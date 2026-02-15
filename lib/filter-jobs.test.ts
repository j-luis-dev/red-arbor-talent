import type { Job } from '@/types/remotive';
import { filterAndSort } from './filter-jobs';

function makeJob(overrides: Partial<Job> = {}): Job {
  return {
    id: 1,
    url: 'https://example.com/job/1',
    title: 'Software Engineer',
    company_name: 'Acme Inc',
    company_logo: null,
    category: 'Software',
    tags: [],
    job_type: 'full_time',
    publication_date: '2024-06-01T00:00:00.000Z',
    candidate_required_location: 'Worldwide',
    description: 'Description',
    ...overrides,
  };
}

describe('filterAndSort', () => {
  const jobs: Job[] = [
    makeJob({ id: 1, title: 'Frontend Dev', company_name: 'Acme', category: 'Software', job_type: 'full_time', publication_date: '2024-06-01T00:00:00.000Z' }),
    makeJob({ id: 2, title: 'Backend Dev', company_name: 'Beta Co', category: 'Software', job_type: 'part_time', publication_date: '2024-06-15T00:00:00.000Z' }),
    makeJob({ id: 3, title: 'Designer', company_name: 'Acme', category: 'Design', job_type: 'contract', publication_date: '2024-05-20T00:00:00.000Z' }),
  ];

  it('returns a copy of jobs when no filters or sort applied', () => {
    const result = filterAndSort(jobs, '', null, null, null);
    expect(result).toHaveLength(3);
    expect(result).not.toBe(jobs);
  });

  it('filters by search query (title)', () => {
    const result = filterAndSort(jobs, 'Frontend', null, null, null);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Frontend Dev');
  });

  it('filters by search query (company)', () => {
    const result = filterAndSort(jobs, 'Beta', null, null, null);
    expect(result).toHaveLength(1);
    expect(result[0].company_name).toBe('Beta Co');
  });

  it('filters by category', () => {
    const result = filterAndSort(jobs, '', 'Design', null, null);
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('Design');
  });

  it('filters by job type', () => {
    const result = filterAndSort(jobs, '', null, 'part_time', null);
    expect(result).toHaveLength(1);
    expect(result[0].job_type).toBe('part_time');
  });

  it('sorts by date (newest first)', () => {
    const result = filterAndSort(jobs, '', null, null, 'date');
    expect(result[0].publication_date).toBe('2024-06-15T00:00:00.000Z');
    expect(result[2].publication_date).toBe('2024-05-20T00:00:00.000Z');
  });

  it('sorts by company name', () => {
    const result = filterAndSort(jobs, '', null, null, 'company');
    expect(result[0].company_name).toBe('Acme');
    expect(result[result.length - 1].company_name).toBe('Beta Co');
  });
});
