# Automated Internship Application Form

A career-fair application form that reads an applicant's CV and fills in the form for them, then hands off to a pre-filled Google Form. Built during my internship; company details have been replaced with a placeholder brand ("Acme").

## What it does

- **CV first.** The applicant drops a PDF (max 10 MB). The form extracts the text in the browser and fills in name, email, phone, university, education level and links.
- **AI with a fallback.** CV text goes to a small Vercel function (`api/parse-cv.js`) that asks OpenAI for structured fields. If the API is unreachable, a built-in rule-based parser takes over, so the form still works offline.
- **No re-typing on submit.** On Continue, the applicant is sent to a Google Form with every answer pre-filled. They attach the CV and press Submit, so each application lands as one row in the linked Google Sheet.
- **Try it without a CV.** A "Try a sample CV" button runs a demo CV through the same parser.
- Tested on desktop Chrome and at 375px / 320px mobile widths.

## Files

| File | What it is |
|---|---|
| `internship-form.html` | The whole form: HTML, CSS and plain JavaScript in one file, no build step. |
| `api/parse-cv.js` | Vercel serverless function that keeps the OpenAI key server-side. |
| `confirmation-email.html` | "Application received" email. Tables and inline styles, with Gmail dark-mode workarounds. |
| `send_test_email.gs` | Google Apps Script that sends the email to yourself for testing. |
| `docs/google-form-mapping.md` | How form fields map to Google Form entry IDs. |
| `test_parse.js`, `test_api.js` | Checks for the CV parser and the API. Run with `node`. |

## Run it

Open `internship-form.html` in a browser. The AI call fails locally and the built-in parser is used.

To use the AI parser, import the repo into Vercel and set `OPENAI_API_KEY` (and optionally `ALLOWED_ORIGIN`, `OPENAI_MODEL`) in Project Settings → Environment Variables. See `.env.example`.

To point it at your own Google Form, set `GOOGLE_FORM` and the `ENTRY` IDs in the form's script (see `docs/google-form-mapping.md`).

```bash
node test_parse.js
```

```bash
node test_api.js
```
