# ZHosting Architecture

## 1. Kiến trúc hiện tại

ZHosting hiện là một **static-first frontend application**.

```text
GitHub Pages
    │
    ├── index.html
    │
    ├── auth/
    │   ├── login.html
    │   └── register.html
    │
    ├── dashboard/
    │   └── index.html
    │
    └── assets/
        ├── css/
        └── js/
```

## 2. Public layer

`index.html` chịu trách nhiệm:

- Brand presentation.
- Services.
- Pricing.
- Config Builder.
- Network Map.
- Live status UI.
- FAQ.
- Contact CTA.

## 3. Shared UI layer

### `assets/css/ui.css`

Chứa design system dùng chung:

- Typography.
- Motion tokens.
- Reveal.
- Stagger.
- Glow.
- Ripple.
- Spotlight.
- Toast.
- Auth animation.
- Dashboard motion.
- Responsive motion rules.

### `assets/js/ui.js`

Chứa interaction layer dùng chung:

- Page initialization.
- Scroll progress.
- Reveal observer.
- Spotlight.
- Ripple effect.
- Tilt effect.
- Toast.
- Logout transition.
- Session guard.
- Input feedback.

## 4. Application logic

### `assets/js/app.js`

Logic public site:

- Mobile navigation.
- Smooth scrolling.
- Pricing switch.
- Counters.
- Active navigation.
- Live latency demo.
- Config Builder.
- FAQ search.
- Keyboard shortcuts.
- Account-aware navbar.

### `assets/js/auth.js`

Logic authentication demo:

- Registration.
- Login.
- Password derivation.
- Password migration.
- Session creation.
- Session timeout.
- Login throttling.
- Logout.

### `assets/js/dashboard.js`

Logic dashboard:

- Session verification.
- Profile loading.
- Profile editing.
- Notification rendering.
- Dashboard interactions.

## 5. Data storage

Hiện tại browser storage được dùng cho demo:

- `localStorage`: persistent demo session + user records.
- `sessionStorage`: temporary session + login guard.

Đây không phải trusted data store.

## 6. Security architecture

```text
HTML
 │
 ├── CSP metadata
 ├── Referrer Policy
 └── Same-origin scripts
        │
        ├── UI layer
        ├── Auth layer
        └── Dashboard layer
```

CI:

```text
Push / PR / Schedule
       │
       ├── CodeQL
       └── Static Security Audit
```

## 7. Production target architecture

```text
Browser
   │
   │ HTTPS
   ▼
CDN / WAF
   │
   ▼
Application API
   ├── Auth service
   ├── Rate limiting
   ├── Authorization
   ├── Audit logging
   └── Billing/service logic
        │
        ▼
     Database
```

Production session nên nằm trong secure server-side architecture thay vì browser storage.

## 8. Design principle

Frontend nên giữ:

- Clear separation.
- Progressive enhancement.
- Accessibility.
- Low coupling.
- Shared design tokens.
- Small, auditable JS modules.


## Account Center — 2026-11-06

- Account Command Center.
- Account Insights.
- Workspace Navigator với tìm kiếm khu vực.
- Command Palette với phím tắt Ctrl/Cmd + K.
- Account Tools và Quick Actions.
- Responsive/mobile và reduced-motion support.
- Tài liệu cần được cập nhật cùng mỗi thay đổi đáng kể.
