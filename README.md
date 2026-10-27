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

## Not done yet

- **No backend.** Nothing is submitted anywhere. Storing applications and the HR/Workday integration are the next project.
- Replace the low-res logo with the original PNG/SVG, and host it online (real emails can't use the embedded logo reliably).
- Wire the email to be sent on form submit.

## Working together

```bash
git pull          # before you start
# ...make changes...
git add -A
git commit -m "what you changed"
git push
```

Both HTML files are single files, so avoid editing the same one at the same time. Agree who takes which first.
