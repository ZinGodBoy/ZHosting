# ZHosting Roadmap

Roadmap này mô tả hướng phát triển từ website prototype thành hosting platform có backend thực tế.

## Phase 1 — Frontend Foundation

**Status: Done / In progress**

- [x] Landing page.
- [x] Responsive navigation.
- [x] Pricing.
- [x] Service cards.
- [x] FAQ.
- [x] Config Builder.
- [x] Network Map.
- [x] Shared design system.
- [x] Authentication demo.
- [x] Dashboard demo.
- [x] Security documentation.

## Phase 2 — Product UX

**Status: Next**

- [ ] Service detail page.
- [ ] Server detail page.
- [ ] Resource usage charts.
- [ ] Activity timeline.
- [ ] Ticket center.
- [ ] Notification center.
- [ ] Improved profile settings.
- [ ] Search across dashboard.
- [ ] Better empty/loading/error states.

## Phase 3 — Real Backend

- [ ] REST/JSON API.
- [ ] Database.
- [ ] Server-side authentication.
- [ ] Secure session cookies.
- [ ] Password reset.
- [ ] Email verification.
- [ ] MFA.
- [ ] Role-based authorization.
- [ ] Server-side rate limiting.
- [ ] Audit logging.

## Phase 4 — Hosting Operations

- [ ] Create service.
- [ ] Start/stop/restart server.
- [ ] Console.
- [ ] File manager.
- [ ] Backup manager.
- [ ] Scheduled tasks.
- [ ] Resource limits.
- [ ] Server logs.
- [ ] Node health monitoring.

## Phase 5 — Billing

- [ ] Product catalog.
- [ ] Invoice model.
- [ ] Payment provider integration.
- [ ] Subscription lifecycle.
- [ ] Renewal.
- [ ] Refund workflow.
- [ ] Billing audit log.

## Phase 6 — Production

- [ ] WAF/CDN.
- [ ] Centralized secrets.
- [ ] Server-side observability.
- [ ] Error tracking.
- [ ] Database backup.
- [ ] Disaster recovery.
- [ ] Load testing.
- [ ] Security review.
- [ ] Privacy policy.
- [ ] Terms of service.

## Guiding principle

Không gọi một tính năng là “production” cho đến khi phần backend, security, monitoring và failure handling tương ứng đã tồn tại.


## Account Center — 2026-11-06

- Account Command Center.
- Account Insights.
- Workspace Navigator với tìm kiếm khu vực.
- Command Palette với phím tắt Ctrl/Cmd + K.
- Account Tools và Quick Actions.
- Responsive/mobile và reduced-motion support.
- Tài liệu cần được cập nhật cùng mỗi thay đổi đáng kể.


## Admin UX — 2026-11-06

- [x] Admin Center entry trong Account Center.
- [x] Role-aware navigation cho tài khoản admin.
- [ ] Server-side RBAC cho Admin Center.
- [ ] Persistent admin audit log trên backend.


## Home Customization — 2026-11-09

- [x] ZHosting Command Launch section.
- [x] Quick navigation cards.
- [x] Live clock micro-interaction.
- [x] Responsive/reduced-motion support.
- [ ] Connect launch metrics to real backend telemetry.


### Admin Center security next step
- [x] Browser-bound trusted admin device gate
- [x] Remove automatic first-account admin promotion
- [x] Hide Admin Center navigation on untrusted devices
- [ ] Move admin identity/session/authorization to a backend
- [ ] Add server-side device enrollment and revocation
- [ ] Add WebAuthn/passkey step-up authentication for privileged actions

## Release track

### v1.4.0 — Frontend Hardening & Admin Control Plane
**Status: Release candidate**

- [x] Shared branding/logo/favicon.
- [x] Account Center.
- [x] Admin Center user directory, analytics and audit views.
- [x] Trusted Admin Device Gate.
- [x] Authentication/session hardening.
- [x] Adaptive performance and reduced-motion handling.
- [x] Navigation/runtime regression hardening.
- [x] Release documentation and SemVer policy.
- [ ] Production backend authorization.
- [ ] Server-side sessions and audit log.
- [ ] Real hosting node integration.
