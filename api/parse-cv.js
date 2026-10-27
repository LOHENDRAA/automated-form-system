// Vercel serverless function: turns CV text into form fields with OpenAI. The key lives here, never in the form.
const FIELDS = ['name', 'email', 'phone', 'university', 'education', 'linkedin', 'github', 'portfolio'];
const EDUCATION = ['Certificate', 'Foundation', 'Diploma', 'Degree', 'Masters', 'PhD'];
const MAX_CHARS = 20000; // caps OpenAI cost per request

module.exports = async (req, res) => {
  const allowed = process.env.ALLOWED_ORIGIN; // e.g. https://careers.rizurf.com; unset allows any site (testing only)
  res.setHeader('Access-Control-Allow-Origin', allowed || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  // shortcut: the Origin header stops other websites, not scripts that fake it; add rate limiting if the bill gets abused.
  if (allowed && req.headers.origin !== allowed) return res.status(403).json({ error: 'Origin not allowed' });
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY is not set' });

  const text = req.body && req.body.text;
  if (typeof text !== 'string' || !text.trim()) return res.status(400).json({ error: 'text required' });

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      temperature: 0,
      messages: [
        { role: 'system', content: `Extract the applicant's details from this CV. Reply with JSON using exactly these keys: ${FIELDS.join(', ')}. `
          + `Use null when a value is not in the CV. education is the highest level reached, one of: ${EDUCATION.join(', ')}. `
          + 'university is where that highest qualification is from. linkedin, github and portfolio are full URLs.' },
        { role: 'user', content: text.slice(0, MAX_CHARS) },
      ],
    }),
  });
  if (!r.ok) return res.status(502).json({ error: `OpenAI request failed (${r.status})` });

  let out;
  try { out = JSON.parse((await r.json()).choices[0].message.content); } catch { return res.status(502).json({ error: 'Unreadable OpenAI reply' }); }
  // Only known fields, only strings: the reply is model output, not trusted input.
  res.status(200).json(Object.fromEntries(FIELDS.map(k => [k, typeof out[k] === 'string' && out[k].trim() ? out[k].trim() : null])));
};
