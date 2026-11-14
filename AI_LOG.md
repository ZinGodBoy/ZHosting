

## 2026-11-14 — Performance refinement

Đã thực hiện performance pass cho toàn site và Admin Center: hợp nhất scroll handlers, giảm pointer event frequency bằng RAF, unobserve reveal nodes sau khi visible, giảm blur/shadow theo viewport, loại bỏ forced reflow trong Config Builder và giữ reduced-motion support. Admin Center được ưu tiên vì có nhiều chart, table, detail panel và micro-interactions.
# AI_LOG — ZHosting

> Nhật ký minh bạch về việc sử dụng AI trong quá trình phát triển repository.

## 1. Mục đích

AI được sử dụng như một **trợ lý kỹ thuật** cho các công việc:

- Phân tích cấu trúc giao diện và UX.
- Gợi ý architecture cho frontend.
- Sinh bản nháp HTML/CSS/JavaScript.
- Refactor và chuẩn hóa UI.
- Rà soát các lỗi logic dễ gặp.
- Gợi ý hardening bảo mật phía frontend.
- Viết và cải thiện tài liệu kỹ thuật.

AI không được xem là nguồn xác nhận cuối cùng cho các vấn đề bảo mật, pháp lý, giá dịch vụ hoặc tuyên bố hạ tầng thực tế.

## 2. Các nhóm thay đổi có AI hỗ trợ

| Nhóm | AI hỗ trợ | Người thực hiện kiểm tra |
|---|---|---|
| Landing page | Có | Có |
| UI/UX | Có | Có |
| Animation | Có | Có |
| Authentication demo | Có | Có |
| Dashboard | Có | Có |
| Security hardening | Có | Có |
| Documentation | Có | Có |
| Production backend | Chưa triển khai | Cần thiết kế riêng |

## 3. Nguyên tắc sử dụng

1. AI chỉ tạo đề xuất hoặc bản nháp.
2. Mã nguồn phải được đọc và hiểu trước khi giữ lại.
3. Không đưa secret, API key, credential hoặc dữ liệu khách hàng vào prompt.
4. Không xem output AI là bằng chứng rằng hệ thống đã an toàn tuyệt đối.
5. Các claim production phải được kiểm chứng bằng môi trường thật.
6. Security finding phải được đánh giá lại bằng tooling chuyên dụng.

## 4. Quy trình kiểm tra thay đổi do AI hỗ trợ

### Trước khi commit

- Đọc diff.
- Kiểm tra đường dẫn asset.
- Kiểm tra responsive.
- Kiểm tra console error.
- Kiểm tra auth/session flow.
- Kiểm tra CSP.
- Chạy static security audit.

### Sau khi commit

- Theo dõi GitHub Actions.
- Kiểm tra CodeQL.
- Kiểm tra GitHub Pages.
- Re-test các luồng quan trọng.

## 5. Trách nhiệm của người phát triển

Người duy trì repository chịu trách nhiệm cuối cùng về:

- Tính đúng của nội dung.
- Chất lượng mã nguồn.
- Security review.
- Tính chính xác của tài liệu.
- Kiểm thử trước khi publish.
- Việc không sử dụng demo auth cho dữ liệu thật.

## 6. Giới hạn của AI

AI có thể:

- Bỏ sót context.
- Đề xuất API chưa phù hợp.
- Không nhìn thấy lỗi chỉ xuất hiện trong browser/CI.
- Đánh giá sai threat model nếu thiếu môi trường thật.

Vì vậy, AI không thay thế:

- Code review.
- Browser testing.
- Dependency review.
- Threat modeling.
- Penetration testing.
- Production observability.

## 7. Kết luận

AI giúp tăng tốc quá trình xây dựng ZHosting, nhưng chất lượng cuối cùng phụ thuộc vào việc **đọc hiểu, kiểm thử, kiểm chứng và chịu trách nhiệm của người phát triển**.


## Account Center — 2026-11-06

- Account Command Center.
- Account Insights.
- Workspace Navigator với tìm kiếm khu vực.
- Command Palette với phím tắt Ctrl/Cmd + K.
- Account Tools và Quick Actions.
- Responsive/mobile và reduced-motion support.
- Tài liệu cần được cập nhật cùng mỗi thay đổi đáng kể.


## 2026-11-14 — Admin Center Motion Suite

Tiếp tục nâng cấp Admin Center với spotlight theo con trỏ, tilt card, ripple, animated counters, chart stagger, scanline, border flow, header shrink, detail-panel state và reduced-motion fallback.


## 2026-11-14 — Admin Device Gate

Thêm trusted-device layer cho Admin Center: IndexedDB + non-extractable ECDSA private key, public-key fingerprint binding, hidden admin navigation trên thiết bị không được tin cậy, route guard và audit event. Đồng thời loại bỏ auto-promote tài khoản đầu tiên thành admin.

## Regression hardening — 2026-11-14

- Removed automatic first-user admin promotion from registration.
- Removed duplicated performance runtime on 404.html.
- Reworked UI session polling and Admin Center clock scheduling to pause in background tabs and clean up on page lifecycle changes.
- Hardened hash-anchor navigation against empty or invalid selectors.

## 2026-11-14 — v1.4.0 release hardening

AI-assisted review focused on preventing regression across authentication, Admin Center authorization, timers, navigation and performance runtime. Existing behavior was inspected before each fix so optimizations did not replace or disable another control. Documentation was synchronized with the implementation.

## 2026-11-14 — Persistent support dock

Đồng bộ hai kênh liên hệ thành một component floating dùng chung. Component được tách khỏi từng page, dùng local brand assets, có responsive/reduced-motion behavior và guard chống khởi tạo trùng để tránh một page tự thêm nhiều dock.

## 2026-11-14 — Support Dock V2

Polished the persistent Zalo/Discord bubbles into a branded floating support dock with online status, circular logos, channel-specific glow, hover expansion, mobile compact mode and reduced-motion handling.

## 2026-11-14 — v1.4.1 UI/runtime quality pass

Đợt rà soát cuối tập trung vào các lớp dùng chung thay vì thêm framework: focus-visible, skip-link, reduced-motion, print behavior, trạng thái form, external-link safety, lifecycle refresh và responsive table. Các thay đổi được thiết kế theo hướng additive để giảm nguy cơ phá vỡ flow auth/account/admin hiện có.


## 2026-11-14 — Performance Optimization v1.4.2

Tối ưu theo hướng progressive enhancement: máy mạnh giữ giao diện đầy đủ, thiết bị yếu hoặc mạng hạn chế tự giảm rendering cost. Runtime được rút gọn, scroll/viewport update được schedule bằng requestAnimationFrame, background visual work được giảm khi tab ẩn, và mobile section lớn được áp dụng content-visibility/containment. Mục tiêu là giảm jank, giảm main-thread pressure và cải thiện perceived load time mà không phá vỡ UI hiện tại.


## v1.4.3 — Brand & Contact UX Refinement

- Refined the single shared ZHosting logo asset so the same mark works consistently as header branding, footer branding and favicon.
- Reduced floating support controls to compact Zalo/Discord bubbles with lightweight hover disclosure instead of large persistent labels.
- Improved homepage contact presentation with channel icons, readable labels and responsive stacking on narrow screens.
- Preserved reduced-motion behavior and avoided introducing new dependencies or runtime polling.


## v1.4.4 — Runtime Smoothness & Rendering Optimization

- Audited the main UI runtime for high-frequency pointer and scroll work.
- Removed pointer-follow spotlight and JavaScript card tilt handlers; hover motion is now CSS-only.
- Moved UI progress updates behind `requestAnimationFrame` to coalesce scroll events.
- Throttled `ZAuth.touchSession()` activity persistence to a 15-second window, preventing repeated localStorage writes from scroll/touch activity.
- Added constrained-device CSS fallbacks that remove expensive blur, shadow and decorative layers while preserving core content and navigation.
