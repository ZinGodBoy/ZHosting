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


## Performance regression checks — 2026-11-14

- [ ] Mở homepage, cuộn toàn trang và kiểm tra không có animation liên tục gây giật.
- [ ] Chuyển tab sang background ít nhất 30 giây; các demo timer không được tiếp tục cập nhật liên tục.
- [ ] Quay lại tab; Live Status, clock và micro-animation tiếp tục hoạt động bình thường.
- [ ] Admin Center: mở/đóng detail, lọc user, refresh và cuộn dài không tạo lỗi console.
- [ ] Admin Center trên mobile không có backdrop/ambient effect nặng gây giảm FPS rõ rệt.
- [ ] Bật prefers-reduced-motion và xác nhận animation được giảm/tắt phù hợp.
- [ ] Kiểm tra thiết bị yếu/Save-Data: visual effects được hạ cấp nhưng chức năng vẫn đầy đủ.


### Frontend navigation hardening — 2026-11-14

- [ ] Click anchor `#section` hợp lệ không tạo console error.
- [ ] Anchor rỗng hoặc `#` không làm hỏng navigation runtime.
- [ ] Admin Global Search không render liên tục khi nhập nhanh.
- [ ] Admin Directory Search và Global Search cùng cập nhật đúng filter.
- [ ] Nạp lại runtime không tạo duplicate performance listeners.

### Regression pass — 2026-11-14

- [ ] 404 chỉ tải assets/js/performance.js một lần.
- [ ] Đăng ký tài khoản mới luôn nhận role user; không có first-user admin promotion.
- [ ] Anchor # rỗng và selector lỗi không làm crash navigation.
- [ ] Session guard không tạo interval chạy nền liên tục.
- [ ] Admin clock dừng khi tab hidden và được cleanup khi pagehide.
- [ ] Existing admin account vẫn giữ role admin và trusted-device gate hoạt động bình thường.

## v1.4.0 release regression matrix

| Area | Required result |
|---|---|
| Registration | New account is always `user` |
| Admin | Only trusted admin device sees/opens Admin Center |
| Session | Hidden-tab timer does not continue callback work |
| Navigation | Empty/invalid anchors do not throw |
| 404 | Performance runtime loads once |
| Admin search | Debounced and stable during rapid typing |
| CSV | Formula-like values are escaped |
| Reduced motion | Non-essential motion is disabled |
| Responsive | 360/480/768/1024/1440px remain usable |

Release completion requires browser smoke testing plus passing CI/security checks.
