# Data model

Suggested production entities:

- users: id, name, email, created_at, status
- sessions: id, user_id, expires_at
- services: id, user_id, plan, status, created_at
- notifications: id, user_id, title, body, read_at, created_at
- audit_logs: id, user_id, action, ip_hash, created_at

This document is a planning schema only; no real database is connected yet.