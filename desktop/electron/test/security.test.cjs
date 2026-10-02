const assert = require('node:assert/strict');
const test = require('node:test');

function isSafeExternalUrl(rawUrl) {
  try {
    return new Set(['http:', 'https:', 'mailto:']).has(new URL(rawUrl).protocol);
  } catch {
    return false;
  }
}

test('only explicit external protocols are allowed', () => {
  assert.equal(isSafeExternalUrl('https://example.com'), true);
  assert.equal(isSafeExternalUrl('mailto:support@example.com'), true);
  assert.equal(isSafeExternalUrl('file:///etc/passwd'), false);
  assert.equal(isSafeExternalUrl('javascript:alert(1)'), false);
  assert.equal(isSafeExternalUrl('data:text/html,alert(1)'), false);
});
