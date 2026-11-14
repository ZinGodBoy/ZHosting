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


## Admin access boundary

Admin navigation and the Admin Center route use `assets/js/admin-access.js` as a browser-local privileged-device gate. The module stores a non-extractable ECDSA P-256 private key in IndexedDB and binds the corresponding public-key fingerprint to the existing admin user record. This improves separation between ordinary user browsers and the trusted admin browser while the project remains a static/localStorage demo.

For production, this boundary must move to a backend authorization service with server-side sessions and device/permission policy enforcement.


## Frontend performance runtime

`assets/js/performance.js` cung cấp adaptive performance flags theo reduced motion, device memory, CPU concurrency và Save-Data. Các timer demo của `assets/js/app.js` dùng scheduler tự tạm dừng khi document hidden để tránh background wake-up không cần thiết. Đây là tối ưu runtime phía client, không thay đổi authorization hoặc dữ liệu nghiệp vụ.

## Runtime regression safeguards

Frontend timers phải dùng lifecycle-aware scheduling: không chạy callback khi document.hidden và phải cleanup khi page rời khỏi. Navigation handlers phải kiểm tra selector trước khi gọi querySelector. Registration không được tự nâng quyền admin; quyền admin phải đến từ provisioning/authorization có chủ đích.

## v1.4.0 architecture baseline

The release baseline is static-first. Public pages, auth demo, Account Center and Admin Center share common UI/runtime layers. Admin privilege additionally uses a browser-bound trusted-device layer. Production authorization remains a backend responsibility.

Changes must preserve separation between presentation, client session state, demo telemetry and future server-side authority. Optimizations must not silently disable security or lifecycle controls.
