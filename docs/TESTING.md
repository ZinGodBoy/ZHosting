# ZHosting Testing Guide

## 1. Test strategy

ZHosting dùng ba lớp:

```text
Static checks
     ↓
Browser functional checks
     ↓
Security checks
```

## 2. Smoke test

### Public

- [ ] Homepage render.
- [ ] Navigation.
- [ ] Mobile menu.
- [ ] Smooth scrolling.
- [ ] Pricing toggle.
- [ ] Config Builder.
- [ ] Network Map.
- [ ] FAQ search.
- [ ] Contact CTA.
- [ ] 404.

### Auth

- [ ] Register valid account.
- [ ] Reject invalid email.
- [ ] Reject short password.
- [ ] Reject mismatched password.
- [ ] Login valid account.
- [ ] Reject wrong password.
- [ ] Password reveal.
- [ ] Remember session.
- [ ] Temporary session.
- [ ] Logout.

### Dashboard

- [ ] Auth guard.
- [ ] Profile information.
- [ ] Edit profile.
- [ ] Inbox rendering.
- [ ] Modal.
- [ ] Logout.

## 3. Security checks

CI chạy:

```text
CodeQL
Static security audit
```

Static audit kiểm tra các pattern nguy hiểm như:

- Inline event handlers.
- `javascript:` URLs.
- `eval()`.
- `new Function()`.
- `document.write()`.
- External script injection.
- Unsafe browser storage patterns.

## 4. Responsive test

Kiểm tra ít nhất:

| Viewport | Priority |
|---|---|
| 1440px | High |
| 1280px | High |
| 1024px | High |
| 768px | High |
| 480px | Critical |
| 360px | Critical |

## 5. Accessibility

- Tab through interactive elements.
- Check focus ring.
- Test form labels.
- Check button names.
- Check reduced motion.
- Test keyboard-only navigation.

## 6. Regression checklist

Sau mỗi thay đổi auth:

- [ ] Register.
- [ ] Login.
- [ ] Session.
- [ ] Dashboard.
- [ ] Logout.
- [ ] Navbar account state.

Sau mỗi thay đổi CSS:

- [ ] Desktop.
- [ ] Mobile.
- [ ] Auth pages.
- [ ] Dashboard.
- [ ] 404.

## 7. Browser console

Production candidate không nên có:

- Uncaught exceptions.
- Failed JS imports.
- Failed CSS imports.
- CSP violation không giải thích được.
- Repeated network errors.

## 8. Limitation

Browser testing không thể chứng minh backend security vì repository hiện chưa có backend production.


## Account Center — 2026-11-06

- Account Command Center.
- Account Insights.
- Workspace Navigator với tìm kiếm khu vực.
- Command Palette với phím tắt Ctrl/Cmd + K.
- Account Tools và Quick Actions.
- Responsive/mobile và reduced-motion support.
- Tài liệu cần được cập nhật cùng mỗi thay đổi đáng kể.


## Admin Center — 2026-11-06

- [x] Admin guard: chỉ admin active được vào.
- [x] User search và filter role/status.
- [x] User details và login history.
- [x] Lock/unlock user, không cho admin tự khóa.
- [x] Revoke session, không cho admin tự revoke phiên của mình.
- [x] Password privacy: không render password/hash/salt.
- [x] Admin controller tải sau auth.js bằng `defer`.


### Admin UX regression — 2026-11-06

- [x] Keyboard focus ring trên control Admin Center.
- [x] Toolbar giữ vị trí khi cuộn trên desktop.
- [x] Hover stats có fallback reduced-motion.
- [x] Mobile toolbar chuyển thành layout dọc.


### Admin hardening — 2026-11-06

- [x] Normalize role/status/login metadata trước khi render.
- [x] Không dùng HTML động cho dữ liệu user.
- [x] Empty login history state.
- [x] Disabled state cho self-lock/self-revoke.
- [x] Mobile login history không tràn ngang.
