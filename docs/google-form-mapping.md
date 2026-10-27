# Google Form mapping

Our form submits to the company's existing Google Form ("Rizurf Apprenticeship - Application Form").
The HR system is not ready yet, and no confirmation email is sent for now.

- Form ID: `1FAIpQLSdoHL8opn_51oLNs8Nsh744Qsho1fiAlUMUIlYTX0KujvDYqg`
- POST to: `https://docs.google.com/forms/d/e/<FORM ID>/formResponse`
- Read from the form's own page data on 2026-10-27. If someone edits the Google Form's questions, these IDs may change.

## Entry IDs

| Our field (`name=`) | Entry ID | Required in Google |
|---|---|---|
| first name (new, see note 1) | `entry.851204678` | yes |
| last name (new, see note 1) | `entry.2142187308` | yes |
| `email` | `entry.1190359073` | yes |
| `phone` | `entry.756689484` | yes |
| `nationality` | `entry.2066529468` | yes |
| `education` | `entry.635388759` | yes |
| `university` | `entry.406614572` | yes |
| `position` | `entry.1133062944` | yes |
| `start` | `entry.577128580` | no |
| `end` | `entry.1650332114` | no |
| `channel` | `entry.233748710` | no |
| `linkedin` | `entry.794138953` | no |
| `github` | `entry.1068025778` | no |
| `portfolio` | `entry.259018255` | no |
| `notes` | `entry.221000101` | no |
| `cv` (file upload) | `entry.383462074` | no |

## Where our form differs from theirs

1. **Name.** Google has First Name + Last Name; ours has one `name` field. Recommended: split ours into two fields. Splitting at the first space breaks names like "Nurul Aisyah bin Ahmad".
2. **Channel option.** Google's option is `Job Platforms (LinkedIn, Jobstreet, Indeed, etc.)`. Ours is `Job Platforms`. Send the Google wording. All other option values already match exactly; Google rejects answers that don't.
3. **"Other" answers** (nationality, channel). Send `entry.X=__other_option__` and `entry.X.other_option_response=<typed text>`.
4. **Dates.** Send three values per date: `entry.X_year`, `entry.X_month`, `entry.X_day`.
5. **CV.** It is an optional file upload in Google, and uploading requires a Google sign-in. A custom form cannot send the file. Decision pending with the manager: (A) applicant uploads on the Google Form after ours, (B) drop the file and add a CV link question, (C) Apps Script that stores the file in Drive.
6. **Wording.** Decided: use "Apprenticeship", as in the Google Form. Done in the HTML title, header pill and section heading.

## Sending (no-CORS)

`fetch(url, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(data) })`. The response is opaque, so treat a resolved promise as success.
