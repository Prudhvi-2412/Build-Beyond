const test = require('node:test');
const assert = require('node:assert/strict');

const { parseOrigins } = require('../config/constants');

test('parseOrigins splits comma-separated urls and trims whitespace', () => {
  const result = parseOrigins('https://a.com, https://b.com ,https://c.com');
  assert.deepEqual(result, ['https://a.com', 'https://b.com', 'https://c.com']);
});

test('parseOrigins returns empty array for empty input', () => {
  const result = parseOrigins('');
  assert.deepEqual(result, []);
});
