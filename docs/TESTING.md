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


### Admin Analytics Expansion — 2026-11-09

- [x] User Growth 30 ngày hiển thị từ createdAt.
- [x] Login Health tính success/failure từ audit events.
- [x] Device & Browser Mix không dùng dữ liệu giả.
- [x] Security Audit Log hiển thị event gần đây.
- [x] Không render password/hash/salt.
- [ ] Production audit phải được chuyển sang backend/server-side.


### Authentication hardening — 2026-11-14

- [ ] Register với mật khẩu 11 ký tự phải bị từ chối.
- [ ] Register với mật khẩu 12 ký tự phải thành công.
- [ ] Change password với mật khẩu mới dưới 12 ký tự phải bị từ chối.
- [ ] Storage JSON hỏng không được tạo uncaught exception.
- [ ] Tài khoản locked không thực hiện password verification trước khi bị từ chối.
- [ ] Admin CSV mở trong spreadsheet không tạo formula từ các giá trị bắt đầu bằng =, +, -, @.


### Performance regression — 2026-11-14

- [ ] Homepage không có animation loop liên tục khi tab bị ẩn.
- [ ] Admin Center không tạo console error khi chuyển tab, refresh hoặc resize.
- [ ] Thiết bị reduced-motion không còn animation không cần thiết.
- [ ] Thiết bị tài nguyên thấp vẫn thao tác được với navigation, filters và user directory.
- [ ] Admin analytics/workspace không gây layout jump đáng kể khi xuất hiện.
- [ ] Kiểm tra 360px, 480px, 768px, 1024px và 1440px.
