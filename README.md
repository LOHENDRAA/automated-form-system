# Rizurf Internship Application – Automated Form System

A career-fair application form for **interns only**, plus the confirmation email sent after applying.

## Files

| File | What it is |
|---|---|
| `Rizurf_Internship_Form.html` | Self-contained application form (single file, logo embedded). Open in a browser. |
| `Rizurf_Confirmation_Email.html` | "Application Received" email. Tables + inline styles, with Gmail dark-mode workarounds. |
| `send_test_email.gs` | Google Apps Script that sends the email to a test address. |
| `test_parse.js` | Checks the CV parser. Run: `node test_parse.js` |
| `logo.png` | Rizurf logo (low-res crop, needs the real PNG/SVG). |

## How the form works

- CV upload comes first (required, PDF, max 10 MB). The form auto-fills from the CV.
- "Try a sample CV" button loads a demo, no real CV needed.
- Full name is a single field. Dates are required. "Career fair" is preselected for "How did you hear".
- Branding: Rizurf navy/teal. Tested on desktop Chrome and at 375px / 320px mobile widths.

## Email

- Suggested subject: `Rizurf Internship: Application Received ✓`
- Tested in Gmail light and dark mode (logo, header text, ✓ marks, button).

## Where submissions go

On Continue, the applicant is sent to the Rizurf Google Form with every answer pre-filled (`GOOGLE_FORM` and `ENTRY` in the form's script; Plan A in `docs/google-form-mapping.md`). They attach the CV there and press Submit, so each application is one row in the Google Sheet with the real CV file.

## CV auto-fill with OpenAI

`api/parse-cv.js` is a Vercel function that holds the OpenAI key. The form sends it the CV's text and gets the fields back. If it is unreachable (for example when the HTML is opened as a local file), the form falls back to the built-in parser.

1. Import this repo into Vercel.
2. In Project Settings → Environment Variables, add `OPENAI_API_KEY` (and `ALLOWED_ORIGIN` once the form's URL is known). See `.env.example`.
3. Redeploy, then open `/Rizurf_Internship_Form.html` on the Vercel URL.

When the form moves to Hostinger, set `PARSE_API` in the form to the full Vercel URL (`https://<project>.vercel.app/api/parse-cv`) and `ALLOWED_ORIGIN` to the Hostinger site's address.

Never put the key in the HTML or commit a `.env` file: anyone who opens the form could read it.

## Not done yet

- The HR/Workday integration is a separate project. The confirmation email is not needed for now.
- Replace the low-res logo with the original PNG/SVG.

## Working together

```bash
git pull          # before you start
# ...make changes...
git add -A
git commit -m "what you changed"
git push
```

Both HTML files are single files, so avoid editing the same one at the same time. Agree who takes which first.
