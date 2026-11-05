# Security Notes

This repository currently contains a **frontend demo authentication flow**.

- The demo stores only a client-side SHA-256 password hash in localStorage; this is still NOT production authentication.
- Authentication and authorization are performed entirely in the browser for demo purposes.
- Profile data is stored locally in the browser.
- There is no real email verification.
- There is no production session, database, password hashing or server-side authorization yet.

Before accepting real customers, replace the demo with Clerk, Better Auth or another production authentication provider, use HTTPS, server-side sessions, rate limiting, email verification and a real database. Never store plaintext passwords in browser storage.