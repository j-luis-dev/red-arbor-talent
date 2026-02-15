import { formatDate } from './date';

describe('formatDate', () => {
  it('formats a valid ISO date string with default options', () => {
    const result = formatDate('2024-06-15T12:00:00.000Z');
    expect(result).toMatch(/\d{1,2}/); // day
    expect(result).toMatch(/[A-Za-z]{3}/); // month abbrev
    expect(result).toMatch(/2024/);
  });

  it('uses custom options when provided', () => {
    const result = formatDate('2024-06-15', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    expect(result).toMatch(/2024/);
    expect(result.length).toBeGreaterThan(4);
  });

  it('returns "Invalid Date" for unparseable string', () => {
    expect(formatDate('not-a-date')).toBe('Invalid Date');
  });

  it('returns "Invalid Date" for empty string', () => {
    expect(formatDate('')).toBe('Invalid Date');
  });
});
