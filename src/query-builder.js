/**
 * [equals]
 * @param {string} key
 * @param {string} value
 */
const equals = (key, value) => `${key}[equals]${value}`;

/**
 * [not_equals]
 * @param {string} key
 * @param {string} value
 */
const notEquals = (key, value) => `${key}[not_equals]${value}`;

/**
 * [less_than]
 * @param {string} key
 * @param {string} value
 */
const lessThan = (key, value) => `${key}[less_than]${value}`;

/**
 * [greater_than]
 * @param {string} key
 * @param {string} value
 */
const greaterThan = (key, value) => `${key}[greater_than]${value}`;

/**
 * [contains]
 * @param {string} key
 * @param {string} value
 */
const contains = (key, value) => `${key}[contains]${value}`;

/**
 * [exists]
 * @param {string} key
 */
const exists = key => `${key}[exists]`;

/**
 * [not_exists]
 * @param {string} key
 */
const notExists = key => `${key}[not_exists]`;

/**
 * [begins_with]
 * @param {string} key
 * @param {string} value
 */
const beginsWith = (key, value) => `${key}[begins_with]${value}`;

/**
 * [and]
 * @param  {...string} filters
 */
const and = (...filters) => filters.join('[and]');

/**
 * [or]
 * @param  {...string} filters
 */
const or = (...filters) => filters.join('[or]');

module.exports = {
  equals,
  notEquals,
  lessThan,
  greaterThan,
  contains,
  exists,
  notExists,
  beginsWith,
  and,
  or,
  // alias
  eq: equals,
  neq: notEquals,
  lt: lessThan,
  gt: greaterThan,
};
