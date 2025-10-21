import { describe, it, expect } from 'vitest';
import Decimal from 'decimal.js';
import calculatorLogic, { calculatorLogic as namedLogic } from '../../../src/logic/calculatorLogic';

const logic = calculatorLogic || namedLogic;

describe('calculatorLogic.calculate', () => {
  it('adds two numbers', () => {
    const r = logic.calculate('2', '+', '3');
    expect(r instanceof Decimal ? r.toString() : r).toBe('5');
  });

  it('subtracts two numbers', () => {
    const r = logic.calculate('5', '−', '7');
    expect(r instanceof Decimal ? r.toString() : r).toBe('-2');
  });

  it('multiplies two numbers', () => {
    const r = logic.calculate('3', '×', '4');
    expect(r instanceof Decimal ? r.toString() : r).toBe('12');
  });

  it('divides two numbers', () => {
    const r = logic.calculate('12', '÷', '4');
    expect(r instanceof Decimal ? r.toString() : r).toBe('3');
  });

  it('division by zero returns Error', () => {
    const r = logic.calculate('1', '÷', '0');
    expect(r).toBe('Error');
  });
});

describe('calculatorLogic.calculatePercent', () => {
  it('computes percent of current entry (10% = 0.1)', () => {
    const r = logic.calculatePercent('10');
    expect(r instanceof Decimal ? r.toString() : r).toBe('0.1');
  });

  it('handles decimal strings with commas', () => {
    const r = logic.calculatePercent('1,000');
    expect(r instanceof Decimal ? r.toString() : r).toBe('10');
  });
});

describe('calculatorLogic.unary operations', () => {
  it('square root of 9 is 3', () => {
    const r = logic.calculateSquareRoot('9');
    expect(r instanceof Decimal ? r.toString() : r).toBe('3');
  });

  it('square root of negative is Error', () => {
    const r = logic.calculateSquareRoot('-1');
    expect(r).toBe('Error');
  });

  it('square of 1.5 is 2.25', () => {
    const r = logic.calculateSquare('1.5');
    expect(r instanceof Decimal ? r.toString() : r).toBe('2.25');
  });

  it('reciprocal of 4 is 0.25', () => {
    const r = logic.calculateReciprocal('4');
    expect(r instanceof Decimal ? r.toString() : r).toBe('0.25');
  });

  it('reciprocal of 0 is Error', () => {
    const r = logic.calculateReciprocal('0');
    expect(r).toBe('Error');
  });

  it('negate flips the sign', () => {
    const r = logic.negate('5');
    expect(r instanceof Decimal ? r.toString() : r).toBe('-5');
  });
});

describe('calculatorLogic.formatNumber', () => {
  it('formats with thousand separators and dot decimal', () => {
    const s = logic.formatNumber('1234567.8900');
    expect(s).toBe('1,234,567.89');
  });

  it('uses scientific notation for very large numbers (>=1e10)', () => {
    const s = logic.formatNumber('10000000000');
    expect(s).toMatch(/^1\.0+e10$/);
  });

  it('uses scientific notation for very small numbers (<=1e-9)', () => {
    const s = logic.formatNumber('0.0000000009'); // 9e-10
    expect(s).toMatch(/e-\d+$/);
  });

  it('falls back to scientific for too-long plain decimals', () => {
    const s = logic.formatNumber('0.' + '6'.repeat(25));
    expect(s).toMatch(/e-/);
  });

  it('preserves negative sign and grouping', () => {
    const s = logic.formatNumber('-1234567.00');
    expect(s).toBe('-1,234,567');
  });
});
