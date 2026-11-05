# ZHosting Security

## Scope

This repository is a static GitHub Pages project with a frontend-only authentication demo.

## Security posture

The project includes:

- Content Security Policy metadata.
- Referrer Policy metadata.
- PBKDF2-HMAC-SHA-256 password derivation with per-user random salt for the demo account store.
- Session expiration and idle-time checks in the frontend.
- Client-side login throttling.
- Safer DOM construction for account UI.
- CodeQL JavaScript analysis in GitHub Actions.
- A static security audit for common dangerous browser APIs and inline event handlers.

## Important limitation

This repository does **not** provide real server-side authentication or authorization. GitHub Pages cannot enforce HttpOnly/Secure session cookies, server-side session invalidation, rate limiting, access control, or database-backed identity management.

Do not use this demo to store real passwords, payment details, API keys, private customer data, or other sensitive information.

For production authentication, move identity and sessions to a backend using secure cookies, server-side session storage, strong password hashing, MFA where appropriate, and server-side authorization.

## Reporting

For vulnerabilities in the repository, open a private GitHub security advisory through the repository's Security tab when available.
