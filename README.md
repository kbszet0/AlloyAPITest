# Alloy KYC Banking App

Prototype banking app that talks to Alloy's KYC Evaluation API. A web form collects applicant info, the backend proxies it to Alloy's sandbox, and the UI shows whether they're approved, denied, or sent to manual review.

## How it works

```
Browser → POST /api/post → Express (server.js) → POST sandbox.alloy.co/v1/evaluations → response back
```

The browser never talks to Alloy directly. The Express server sits in the middle so API credentials stay server-side (in `.env`) and we avoid CORS issues.

## Files

- `server.js` — Express server. Reads credentials from `.env`, base64-encodes them for Basic Auth, proxies the form data to Alloy, returns the response.
- `public/index.html` — The form. CSS Grid layout, two columns where it makes sense.
- `public/main.js` — Handles form submission, calls `/api/post`, reads `summary.outcome` from the response, shows a colored banner.

## Setup

```bash
npm install
```

Create `.env` in the project root:

```
API_TOKEN=your_workflow_token
API_SECRET=your_workflow_secret
```

Run it:

```bash
npm start
# → http://localhost:3000
```

## Testing with sandbox personas

Alloy's sandbox returns different outcomes based on the applicant's last name:

- Any normal name (e.g. `Smith`) → **Approved** → green banner
- Last name `Deny` → **Denied** → red banner
- Last name `Review` → **Manual Review** → amber banner

Fill the form with fake data, swap the last name, and you'll see each outcome.
