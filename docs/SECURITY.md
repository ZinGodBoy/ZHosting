# Security Notes

This document is a concise security overview for the current ZHosting frontend prototype.

## Current implementation

- Content Security Policy metadata.
- Referrer Policy.
- PBKDF2-HMAC-SHA-256 password records with per-user random salt for new demo accounts.
- Automatic migration from the legacy SHA-256 demo format after successful login.
- Session idle timeout and absolute timeout.
- Client-side login throttling.
- Safe DOM construction for dynamic account and notification UI.
- CodeQL workflow.
- Static security audit.

## Important limitation

Authentication and authorization are still performed in the browser for demonstration purposes.

Browser storage is **not a trusted security boundary**. A malicious script running in the same origin may access client-side state.

Do not store production:

- passwords,
- access tokens,
- API keys,
- payment information,
- private customer data.

## Production requirements

Before real customer accounts are supported, move authentication and authorization to a backend with:

- server-side sessions,
- HttpOnly + Secure + SameSite cookies,
- server-side authorization,
- rate limiting,
- password reset and email verification,
- MFA where appropriate,
- audit logging,
- database-backed identity and permissions.

See [SECURITY.md](../SECURITY.md) and [AUTHENTICATION.md](AUTHENTICATION.md) for the complete security model.
