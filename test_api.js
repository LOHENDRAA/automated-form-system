// Run: node test_api.js — checks api/parse-cv.js with a fake OpenAI reply (no key or network needed).
const assert = require('assert');
const handler = require('./api/parse-cv');

const call = async (req, openaiContent) => {
  global.fetch = async () => ({ ok: true, json: async () => ({ choices: [{ message: { content: openaiContent } }] }) });
  const res = { code: 0, body: null, headers: {}, setHeader(k, v) { this.headers[k] = v; },
                status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; }, end() { return this; } };
  await handler({ method: 'POST', headers: {}, ...req }, res);
  return res;
};

(async () => {
  process.env.OPENAI_API_KEY = 'test';
  delete process.env.ALLOWED_ORIGIN;

  // Unknown keys and non-strings are dropped.
  let r = await call({ body: { text: 'cv text' } }, JSON.stringify({ name: ' Hosam Najeeb ', email: 'h@gmail.com', phone: 123, evil: 'x' }));
  assert.equal(r.code, 200);
  assert.deepStrictEqual(r.body, { name: 'Hosam Najeeb', email: 'h@gmail.com', phone: null, university: null,
                                   education: null, linkedin: null, github: null, portfolio: null });

  assert.equal((await call({ body: { text: '  ' } }, '{}')).code, 400);
  assert.equal((await call({ body: { text: 'x' } }, 'not json')).code, 502);

  process.env.ALLOWED_ORIGIN = 'https://careers.rizurf.com';
  assert.equal((await call({ body: { text: 'x' }, headers: { origin: 'https://evil.com' } }, '{}')).code, 403);
  assert.equal((await call({ body: { text: 'x' }, headers: { origin: 'https://careers.rizurf.com' } }, '{}')).code, 200);

  delete process.env.ALLOWED_ORIGIN;
  delete process.env.OPENAI_API_KEY;
  assert.equal((await call({ body: { text: 'x' } }, '{}')).code, 500);
  console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
