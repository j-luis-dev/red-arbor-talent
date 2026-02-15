import {
  RemotiveApiError,
  fetchCategories,
  fetchJobs,
  isSafeUrl,
} from './remotive';

jest.unmock('@/services/remotive');

describe('isSafeUrl', () => {
  it('returns false for null or undefined', () => {
    expect(isSafeUrl(null)).toBe(false);
    expect(isSafeUrl(undefined)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isSafeUrl('')).toBe(false);
  });

  it('returns false for dangerous protocols', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('data:text/html,<script>')).toBe(false);
    expect(isSafeUrl('vbscript:')).toBe(false);
    expect(isSafeUrl('file:///etc/passwd')).toBe(false);
  });

  it('returns true for https and http', () => {
    expect(isSafeUrl('https://example.com')).toBe(true);
    expect(isSafeUrl('http://example.com')).toBe(true);
    expect(isSafeUrl('  HTTPS://example.com  ')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isSafeUrl('JAVASCRIPT:void(0)')).toBe(false);
    expect(isSafeUrl('HTTP://example.com')).toBe(true);
  });
});

describe('RemotiveApiError', () => {
  it('has name RemotiveApiError', () => {
    const err = new RemotiveApiError('test');
    expect(err.name).toBe('RemotiveApiError');
  });

  it('stores statusCode and isRateLimit', () => {
    const err = new RemotiveApiError('Too many requests', 429, true);
    expect(err.message).toBe('Too many requests');
    expect(err.statusCode).toBe(429);
    expect(err.isRateLimit).toBe(true);
  });
});

describe('fetchJobs', () => {
  const mockJobs = [
    {
      id: 1,
      title: 'Dev',
      company_name: 'Acme',
      category: 'Software',
      job_type: 'full_time',
      publication_date: '2024-01-01',
      candidate_required_location: 'Remote',
      tags: [],
      description: 'Desc',
      url: 'https://example.com/job/1',
      company_logo: null,
    },
  ];

  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  it('returns jobs when API responds with jobs array', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ jobs: mockJobs }),
    });
    const result = await fetchJobs();
    expect(result).toEqual(mockJobs);
  });

  it('returns empty array when API responds with no jobs key', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    const result = await fetchJobs();
    expect(result).toEqual([]);
  });

  it('throws RemotiveApiError on 429', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
    });
    let thrown: unknown;
    try {
      await fetchJobs();
    } catch (e) {
      thrown = e;
    }
    expect(thrown).toBeInstanceOf(RemotiveApiError);
    expect((thrown as RemotiveApiError).statusCode).toBe(429);
    expect((thrown as RemotiveApiError).isRateLimit).toBe(true);
  });

  it(
    'throws RemotiveApiError on non-ok response',
    async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });
      await expect(fetchJobs()).rejects.toMatchObject({
        name: 'RemotiveApiError',
        statusCode: 500,
      });
    },
    15000
  );
});

describe('fetchCategories', () => {
  const mockCategories = [
    { id: 1, name: 'Software', slug: 'software' },
  ];

  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  it('returns categories when API responds with jobs array', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ jobs: mockCategories }),
    });
    const result = await fetchCategories();
    expect(result).toEqual(mockCategories);
  });

  it('returns empty array when API responds with no jobs key', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    const result = await fetchCategories();
    expect(result).toEqual([]);
  });
});
