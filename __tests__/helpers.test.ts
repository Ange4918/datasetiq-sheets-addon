import { describe, expect, it } from 'vitest';
import { buildArrayResult, normalizeDateInput, normalizeOptionalString } from '../src/Code';

describe('normalizeOptionalString', () => {
  it('trims and normalizes nullish', () => {
    expect(normalizeOptionalString(null)).toBeUndefined();
    expect(normalizeOptionalString(undefined)).toBeUndefined();
    expect(normalizeOptionalString(' abc ')).toBe('abc');
  });
});

describe('normalizeDateInput', () => {
  it('formats dates to UTC ISO', () => {
    const date = new Date(Date.UTC(2024, 0, 2));
    expect(normalizeDateInput(date)).toBe('2024-01-02');
  });

  it('passes through strings', () => {
    expect(normalizeDateInput('2024-01-02')).toBe('2024-01-02');
  });
});

describe('buildArrayResult', () => {
  it('always returns headers and sorts newest first', () => {
    const result = buildArrayResult([
      ['2023-01-01', 1],
      ['2024-01-01', 2],
    ]);
    expect(result[0]).toEqual(['Date', 'Value']);
    expect(result[1][0]).toBe('2024-01-01');
  });
});
