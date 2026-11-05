# ZHosting Architecture

## Current
- Static landing page
- Client-side demo authentication
- Dashboard / profile / inbox UI
- Local browser persistence

## Structure
- `index.html` — public landing page
- `auth/` — login and registration screens
- `dashboard/` — authenticated dashboard UI
- `assets/css/` — design system and responsive styles
- `assets/js/` — UI/auth/dashboard logic
- `docs/` — architecture and security notes

## Production roadmap
For real customer accounts, passwords and private data must move to a server-side authentication provider and database. Do not treat localStorage as secure authentication.