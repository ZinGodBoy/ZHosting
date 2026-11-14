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

### Support Dock regression — 2026-11-14

- [ ] Dock xuất hiện trên Homepage, Login, Register, Account Center, Admin Center và 404.
- [ ] Hai nút đều hình tròn và hiển thị đúng asset logo.
- [ ] Desktop hover/focus mở rộng nhưng không làm layout shift.
- [ ] Mobile không che CTA hoặc nội dung chính.
- [ ] Tab navigation tới được cả hai nút.
- [ ] Reduced motion không tạo animation bắt buộc.
- [ ] Không tạo component trùng khi runtime được tải lại.

### Support Dock V2 regression

- [ ] Zalo/Discord remain circular at rest.
- [ ] Brand logos are centered and not distorted.
- [ ] Desktop hover/focus expands smoothly without layout shift.
- [ ] Zalo and Discord use distinct focus/glow states.
- [ ] Mobile remains compact and does not cover primary actions.
- [ ] `prefers-reduced-motion` disables non-essential animation.


### Performance optimization v1.4.2

- [ ] Desktop máy đủ mạnh giữ animation/visual layer bình thường.
- [ ] Thiết bị <=4 GB RAM hoặc <=4 logical CPU chuyển sang zperf-lite.
- [ ] Save-Data/2G giảm visual effects và noise.
- [ ] Scroll không tạo nhiều callback đồng thời.
- [ ] Chuyển tab sang background không tiếp tục visual work không cần thiết.
- [ ] Mobile vẫn scroll mượt và section lớn không gây layout jump đáng kể.
- [ ] Reduced-motion không chạy animation bắt buộc.
- [ ] Không phát sinh lỗi console sau khi hardening.


## v1.4.4 Performance Smoke Test

- Scroll the homepage continuously on desktop and mobile; verify no visible stutter or pointer-induced card jitter.
- Move the pointer across service/pricing cards; verify hover motion remains smooth without JavaScript tilt calculations.
- Open DevTools Performance and verify no continuous pointermove rendering loop is active for the UI spotlight.
- On a constrained device or with reduced motion, verify decorative grain/grid/blur effects are reduced while content remains readable.
- Sign in and scroll/touch repeatedly; verify session activity remains functional without excessive storage writes.


## v1.4.5 Performance Smoke Test

- Hard-refresh each main route and verify content paints before non-critical UI enhancements.
- Verify login/register/dashboard/Admin Center still initialize correctly with deferred `ui.js`.
- Scroll continuously and verify only the primary scroll-progress runtime updates.

## v1.4.6 Smoke Test

- Log in as a normal user: Admin Center remains hidden.
- Log in as an admin on an untrusted browser: Admin Center remains hidden.
- On a trusted admin device: Admin Center link appears and opens normally.
- Change password with 8–11 characters: rejected.
- Change password with 12+ characters: continues to the authentication layer.

## v1.4.7 Smoke Test

- Desktop with a visible vertical scrollbar: Zalo/Discord bubbles sit immediately beside it with a small safety gap.
- Resize the browser: the dock recalculates its horizontal offset.
- Mobile/overlay-scrollbar browsers: bubbles retain a safe right margin.
- Scroll the page: bubbles remain fixed to the viewport and do not create a new scroll handler.

## v1.4.8 Smoke Test

- Scroll: support bubbles remain fixed beside the scrollbar.
- Resize/orientation: position updates without visible jitter.
- Mobile with a bottom safe area: bubbles remain accessible.
- Clicking/dragging empty space around the dock does not block page interaction.
- Reduced-motion mode removes unnecessary compositor hints.

## v1.4.9 Smoke Test

- Scroll from top to bottom: progress bar remains smooth.
- Active navigation changes as sections enter the navigation observation zone.
- Header scrolled state still activates after scrolling.
- Back-to-top button still appears after the existing threshold.
- Anchor navigation still scrolls to the correct section.
- Reduced-motion mode still uses the existing non-animated scroll behavior.

## v1.4.10 Smoke Test

- Existing trusted admin device still opens Admin Center.
- Untrusted admin device remains blocked.
- First device enrollment still creates the expected adminDevice fingerprint.
- Repeated Admin Center checks do not repeatedly open IndexedDB or re-hash the public key during the same page lifecycle.
- IndexedDB unavailable/error path still returns an untrusted result rather than granting access.


## v1.4.11 Runtime Smoothness Checks

- Drag RAM/CPU sliders continuously and verify the values remain responsive without visible stutter.
- Move the pointer rapidly across Admin Center cards; no pointer-driven tilt loop should run.
- Scroll homepage and Admin Center; verify navigation, progress bars, support dock, and back-to-top remain responsive.
- Test reduced-motion mode and mobile viewport; blur/shadow reductions must not break layout.


## v1.4.12 — Theme Tool Test Notes
- Verify theme panel opens/closes with mouse and keyboard.
- Verify RGB values map correctly to HEX and update the accent/background immediately.
- Verify presets, reset, local persistence, mobile layout, and reduced-motion behavior.


## v1.4.13 — Theme Tool Test Notes
- Verify solid/gradient switching, secondary color, gradient angle, presets and reset.
- Verify reload persistence and mobile/reduced-motion behavior.

### v1.5.1 — Support Bubble Runtime
- [ ] Homepage has exactly two support bubbles, not two overlapping components.
- [ ] Login/Register/Dashboard/Admin/404 also show exactly two bubbles.
- [ ] Bubbles stay near the browser scrollbar and follow the viewport position smoothly while scrolling.
- [ ] Resize/orientation updates horizontal offset without console errors.
- [ ] Reduced-motion disables non-essential bubble animation/compositor hints.
- [ ] Keyboard focus reaches both support links and no layout shift occurs.

### Theme customization regression — v1.5.2
- [ ] Solid background changes update the visible page background.
- [ ] Gradient mode updates both primary and secondary colors.
- [ ] Secondary RGB controls change only the secondary gradient color.
- [ ] Accent RGB/HEX controls remain synchronized.
- [ ] Reload preserves accent, background, secondary background, mode and angle.
- [ ] Browser theme-color metadata follows the selected primary background.
- [ ] Header, cards, buttons and scroll progress remain visually consistent after changing theme colors.
- [ ] Reduced-motion remains functional after theme changes.

### v1.5.3 bugfix regression
- [ ] Support bubbles use the calculated scrollbar-aware right offset on desktop.
- [ ] Support bubbles remain correctly aligned on mobile with and without a browser scrollbar.
- [ ] Scrolling does not cause horizontal layout movement.
- [ ] Low-resource mode disables support bubble animation/blur.
- [ ] Mobile background remains stable without fixed-background rendering.
- [ ] Reduced-motion remains respected.

### v1.5.4 performance regression
- [ ] Support dock scroll remains smooth without repeated layout reads during scroll.
- [ ] Resize/orientation updates recalculate dock positioning correctly.
- [ ] Mobile page has reduced blur/noise/shadow overhead.
- [ ] Low-resource mode remains visually stable.
- [ ] No horizontal overflow is introduced.

### v1.5.5 runtime and visual regression
- [ ] Live clock updates normally while the page is visible.
- [ ] Live clock stops while the tab is hidden and resumes after returning.
- [ ] Homepage scroll progress and back-to-top still work normally.
- [ ] No duplicate scroll-driven visual state is created by `performance.js`.
- [ ] Cards/panels remain visually intact with rendering containment enabled.
- [ ] Keyboard focus rings are visible and do not cause layout shifts.
- [ ] Reduced-motion disables smooth scrolling and decorative motion.
- [ ] Constrained-device mode remains readable and responsive.

### v1.6.0 footer regression
- [ ] Footer brand, description and status render correctly.
- [ ] Service/support links point to valid existing routes or sections.
- [ ] Footer is balanced at 1440px, 1024px, 768px, 520px and 360px.
- [ ] No horizontal overflow is introduced.
- [ ] Footer adds no JavaScript runtime work.
- [ ] Keyboard focus remains visible on footer links.
- [ ] Constrained-device mode keeps the footer readable without heavy effects.

### v1.6.1 support/footer regression
- [ ] Floating support bubbles stay aligned with the viewport scrollbar area after resize/orientation changes.
- [ ] Navigating away cancels pending support animation frames.
- [ ] Footer contact cards remain readable and keyboard-focusable.
- [ ] Footer has no horizontal overflow on narrow screens.
- [ ] Reduced-motion mode removes nonessential footer transitions.

### v1.6.2 runtime/footer regression
- [ ] No constrained-device header blur is re-enabled by later CSS rules.
- [ ] Footer remains visually complete on desktop.
- [ ] Footer shadow/transition load is reduced below 900px and on constrained devices.
- [ ] Performance resize frame is cancelled on pagehide.


## v1.6.3 — Footer & Runtime Checks
- Verify footer contact links at desktop, tablet and mobile widths.
- Verify support bubbles continue to follow scroll and align with the scrollbar offset.
- Verify page navigation does not retain pending support animation frames or `ResizeObserver` work.
- Verify `prefers-reduced-motion` and `zperf-lite` remove non-essential effects.


## v1.6.5 — Support Runtime Verification
- Verify support bubbles remain functional after resize/orientation changes.
- Verify `ResizeObserver` is disconnected during `pagehide`.
- Verify no support animation frame remains scheduled after page exit.


## v1.6.6 — Footer UI Verification
- Verify footer spacing and column balance at wide desktop widths.
- Scroll into the footer and confirm the fixed theme/status utilities fade out instead of covering content.
- Scroll away from the footer and confirm the utilities return normally.
- Verify reduced-motion and `zperf-lite` behavior remains non-animated.


## v1.6.7 — Theme Panel Edge Check
- Verify an opened theme panel is hidden while the footer is visible and restored after leaving the footer.


## v1.6.8 — Whole-Page Verification
- Verify scroll progress remains accurate after resize and content/layout changes.
- Verify navigation, back-to-top and footer utilities remain responsive.
- Verify reduced-motion and constrained-device modes remove non-essential rendering effects.
- Verify section dividers render correctly at desktop/tablet/mobile widths.
- Verify no runtime observer/listener continues after `pagehide`.
