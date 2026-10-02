const http = require('node:http');

/**
 * Optional OAuth callback helper. It binds only to 127.0.0.1, accepts one
 * matching state value, and closes after one callback or timeout. It is not
 * enabled by the default offline-first application.
 */
function createLoopbackServer({ state, timeoutMs = 120000 } = {}) {
  if (!state || typeof state !== 'string') throw new TypeError('A random OAuth state is required');
  let timer;
  let settled = false;
  let resolveResult;
  let rejectResult;
  let resolveReady;
  const result = new Promise((resolve, reject) => { resolveResult = resolve; rejectResult = reject; });
  const ready = new Promise((resolve) => { resolveReady = resolve; });
  const server = http.createServer((request, response) => {
    if (request.url === '/favicon.ico') { response.writeHead(404); response.end(); return; }
    const url = new URL(request.url, 'http://127.0.0.1');
    if (url.pathname !== '/oauth/callback' || url.searchParams.get('state') !== state) {
      response.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Invalid OAuth callback');
      return;
    }
    response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Authentication complete. You can close this window.');
    finish(null, { code: url.searchParams.get('code'), state });
  });
  function finish(error, value) {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    server.close();
    if (error) rejectResult(error); else resolveResult(value);
  }
  server.on('error', (error) => finish(error));
  server.listen(0, '127.0.0.1', () => {
    timer = setTimeout(() => finish(new Error('OAuth callback timed out')), timeoutMs);
    timer.unref?.();
    resolveReady();
  });
  return {
    result,
    ready,
    getRedirectUri: () => {
      const address = server.address();
      if (!address || typeof address === 'string') throw new Error('Loopback server is not ready');
      return `http://127.0.0.1:${address.port}/oauth/callback`;
    },
    close: () => finish(new Error('OAuth callback cancelled'))
  };
}

module.exports = { createLoopbackServer };
