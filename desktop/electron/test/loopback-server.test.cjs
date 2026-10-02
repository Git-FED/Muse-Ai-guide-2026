const assert = require('node:assert/strict');
const test = require('node:test');
const { createLoopbackServer } = require('../src/auth/loopback-server.cjs');

test('loopback server binds localhost and accepts one matching state', async () => {
  const callback = createLoopbackServer({ state: 'state-123', timeoutMs: 5000 });
  await callback.ready;
  const redirect = new URL(callback.getRedirectUri());
  assert.equal(redirect.hostname, '127.0.0.1');
  const response = await fetch(`${redirect.origin}${redirect.pathname}?code=one-time-code&state=state-123`);
  assert.equal(response.status, 200);
  assert.deepEqual(await callback.result, { code: 'one-time-code', state: 'state-123' });
});

test('loopback server rejects a mismatched state', async () => {
  const callback = createLoopbackServer({ state: 'expected', timeoutMs: 5000 });
  await callback.ready;
  const redirect = new URL(callback.getRedirectUri());
  const response = await fetch(`${redirect.origin}${redirect.pathname}?code=bad&state=wrong`);
  assert.equal(response.status, 400);
  callback.close();
  await assert.rejects(callback.result, /cancelled/);
});
