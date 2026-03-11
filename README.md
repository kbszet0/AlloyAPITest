# Alloy KYC Banking App

Prototype banking app that talks to Alloy's KYC Evaluation API. The web form collects applicant info, the backend passes the data to Alloy's sandbox, and the UI shows whether they're approved, denied, or sent to manual review.

## Workflow

```
Browser → POST /api/post → Express (server.js) → POST sandbox.alloy.co/v1/evaluations → response
```


## Files

- `server.js` — Express server. Reads credentials from `.env`, base64-encodes them for Basic Authentication, relays the form data to the Alloy Evaluation API which returns the response.
- `public/index.html` — The web form with a CSS grid layout.

- `public/main.js` — Handles form submission, calls `/api/post`, reads `summary.outcome` from the response and displays a colored banner.

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

The form will recognize the last name, and output the correct outcome based on the last name used.
