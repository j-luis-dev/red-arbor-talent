/**
 * Types for Remotive API responses and entities.
 * @see https://remotive.com/api/remote-jobs
 */

export type JobType = 'full_time' | 'part_time' | 'contract' | 'freelance';

export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string | null;
  company_logo_url?: string | null;
  category: string;
  tags: string[];
  job_type: JobType;
  publication_date: string;
  candidate_required_location: string;
  salary?: string | null;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface RemotiveJobsResponse {
  jobs: Job[];
  'job-count'?: number;
  'total-job-count'?: number;
}

export interface RemotiveCategoriesResponse {
  jobs: Category[];
  'job-count'?: number;
  'total-job-count'?: number;
}
