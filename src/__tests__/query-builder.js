const qb = require('../query-builder');

const key = 'title';
const value = 'Hello!';

describe('query-builder', () => {
  test('equals', () => {
    expect(qb.equals(key, value)).toBe(`${key}[equals]${value}`);
    expect(qb.eq(key, value)).toBe(`${key}[equals]${value}`);
  });

  test('notEquals', () => {
    expect(qb.notEquals(key, value)).toBe(`${key}[not_equals]${value}`);
    expect(qb.neq(key, value)).toBe(`${key}[not_equals]${value}`);
  });

  test('lessThan', () => {
    expect(qb.lessThan(key, value)).toBe(`${key}[less_than]${value}`);
    expect(qb.lt(key, value)).toBe(`${key}[less_than]${value}`);
  });

  test('greaterThan', () => {
    expect(qb.greaterThan(key, value)).toBe(`${key}[greater_than]${value}`);
    expect(qb.gt(key, value)).toBe(`${key}[greater_than]${value}`);
  });

  test('contains', () => {
    expect(qb.contains(key, value)).toBe(`${key}[contains]${value}`);
  });

  test('exists', () => {
    expect(qb.exists(key)).toBe(`${key}[exists]`);
  });

  test('notExists', () => {
    expect(qb.notExists(key)).toBe(`${key}[not_exists]`);
  });

  test('beginsWith', () => {
    expect(qb.beginsWith(key, value)).toBe(`${key}[begins_with]${value}`);
  });

  test('and', () => {
    expect(qb.and('filter1', 'filter2')).toBe(`filter1[and]filter2`);
  });

  test('or', () => {
    expect(qb.or('filter1', 'filter2')).toBe(`filter1[or]filter2`);
  });
});
