# Security Notes

This repository currently contains a **frontend demo authentication flow**.

- No password is stored in localStorage.
- The demo validates account existence only in the browser.
- Profile data is stored locally in the browser.
- There is no real email verification.
- There is no production session, database, password hashing or server-side authorization yet.

Before accepting real customers, replace the demo with Clerk, Better Auth or another production authentication provider, use HTTPS, server-side sessions, rate limiting, email verification and a real database. Never store plaintext passwords in browser storage.