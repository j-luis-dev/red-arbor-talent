/**
 * Remotive API client: fetch jobs and categories with retry and 429 handling.
 */

import type {
  Category,
  Job,
  RemotiveCategoriesResponse,
  RemotiveJobsResponse,
} from '@/types/remotive';

const REMOTIVE_JOBS_URL = 'https://remotive.com/api/remote-jobs';
const REMOTIVE_CATEGORIES_URL = 'https://remotive.com/api/remote-jobs/categories';

const MAX_RETRIES = 3;
const BACKOFF_MS = [1000, 2000, 4000];

export class RemotiveApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isRateLimit = false
  ) {
    super(message);
    this.name = 'RemotiveApiError';
  }
}

/**
 * Validates that a URL is safe to open (https/http only; no javascript:, data: with scripts, etc.).
 */
export function isSafeUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('javascript:')) return false;
  if (trimmed.startsWith('data:')) return false;
  if (trimmed.startsWith('vbscript:')) return false;
  if (trimmed.startsWith('file:')) return false;
  return trimmed.startsWith('https://') || trimmed.startsWith('http://');
}

async function fetchWithRetry<T>(
  url: string,
  parse: (data: unknown) => T
): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.status === 429) {
        throw new RemotiveApiError(
          'Demasiadas solicitudes, intenta más tarde',
          429,
          true
        );
      }
      if (!res.ok) {
        throw new RemotiveApiError(
          `Error ${res.status}: ${res.statusText}`,
          res.status
        );
      }
      const data = (await res.json()) as unknown;
      return parse(data);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (err instanceof RemotiveApiError && err.isRateLimit) throw err;
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, BACKOFF_MS[attempt]));
      } else {
        throw lastError;
      }
    }
  }
  throw lastError ?? new Error('Unknown error');
}

function parseJobsResponse(data: unknown): Job[] {
  const obj = data as RemotiveJobsResponse;
  if (!obj || !Array.isArray(obj.jobs)) return [];
  return obj.jobs as Job[];
}

function parseCategoriesResponse(data: unknown): Category[] {
  const obj = data as RemotiveCategoriesResponse;
  if (!obj || !Array.isArray(obj.jobs)) return [];
  return obj.jobs as Category[];
}

export async function fetchJobs(): Promise<Job[]> {
  return fetchWithRetry(REMOTIVE_JOBS_URL, parseJobsResponse);
}

export async function fetchCategories(): Promise<Category[]> {
  return fetchWithRetry(REMOTIVE_CATEGORIES_URL, parseCategoriesResponse);
}
