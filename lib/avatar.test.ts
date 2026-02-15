import { getInitials, hashColor } from './avatar';

describe('getInitials', () => {
  it('returns "?" for empty string', () => {
    expect(getInitials('')).toBe('?');
  });

  it('returns "?" for whitespace-only string', () => {
    expect(getInitials('   ')).toBe('?');
  });

  it('returns first two chars for a single word', () => {
    expect(getInitials('John')).toBe('JO');
    expect(getInitials('A')).toBe('A');
  });

  it('returns first letter of first and last word for multiple words', () => {
    expect(getInitials('John Doe')).toBe('JD');
    expect(getInitials('Mary Jane Watson')).toBe('MW');
  });

  it('trims leading and trailing whitespace', () => {
    expect(getInitials('  John Doe  ')).toBe('JD');
  });
});

describe('hashColor', () => {
  it('returns an HSL string with hue 0-359', () => {
    const result = hashColor('test');
    expect(result).toMatch(/^hsl\(\d{1,3}, 45%, 40%\)$/);
  });

  it('returns stable color for the same input', () => {
    expect(hashColor('Alice')).toBe(hashColor('Alice'));
  });

  it('returns different colors for different inputs', () => {
    const a = hashColor('Alice');
    const b = hashColor('Bob');
    expect(a).not.toBe(b);
  });
});
