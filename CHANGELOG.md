## Pricing & Config decision UX — 2026-11-14

- Làm rõ từng gói với nhãn **phù hợp với** và phần “Bạn nên chọn gói này nếu”.
- Đổi CTA của bảng giá thành hành động rõ nghĩa hơn như “Tư vấn gói Pro” thay vì chỉ “Chọn gói”.
- Config Builder bổ sung vùng **Gợi ý** theo từng loại dịch vụ.
- Add-on được highlight rõ khi đang chọn.
- Hiển thị lại thông tin giá theo hướng minh bạch: giá minh họa/prototype được ghi chú ngay tại khu vực tính toán.
- Giữ reduced-motion và responsive behavior.

## User guidance & onboarding UX — 2026-11-14

- Thêm khu vực **Bắt đầu nhanh** để người dùng mới hiểu quy trình theo 3 bước: chọn nhu cầu → kiểm tra cấu hình → liên hệ.
- Bổ sung CTA trực tiếp tới Dịch vụ, Config Builder và Liên hệ.
- Thêm hướng dẫn ngắn giải thích rằng người mới không cần hiểu sâu về server trước khi liên hệ.
- Responsive cho desktop/mobile và có reduced-motion fallback.
- Giữ nguyên hệ thống hỗ trợ Zalo/Discord, Account Center và Admin Center.

## User Support Floaters — 2026-11-14

- Thêm bubble hỗ trợ Zalo với số 0828 689 789.
- Thêm bubble Discord với username tdk_208.
- Desktop hiển thị dạng bubble có nhãn; mobile thu gọn thành nút tròn.
- Có focus state và reduced-motion fallback.
- Các nút chỉ điều hướng tới kênh liên hệ, không thu thập dữ liệu người dùng.


## Performance & Admin Center refinement — 2026-11-14

- Tối ưu Admin Center motion: bỏ global pointer/scroll work gây layout pressure, gom scroll processing vào requestAnimationFrame.
- Giảm cường độ tilt và backdrop blur để ưu tiên FPS ổn định.
- IntersectionObserver của Admin Center tự unobserve sau khi reveal.
- Giảm shadow/blur trên viewport nhỏ.
- Tối ưu homepage scroll progress + active navigation bằng một scroll loop duy nhất.
- Loại bỏ forced synchronous layout trong Config Builder animation.
- Tắt config animation khi người dùng bật reduced motion.
- Ngăn tự động enrollment Admin Device từ một browser mới; thiết bị admin mới không được tự claim quyền quản trị.
## Admin Center device-bound access — 2026-11-14

- Thêm browser-bound Admin Device Gate bằng IndexedDB + Web Crypto.
- Admin Center chỉ hiển thị trong navigation/command palette khi tài khoản admin đang ở trusted browser device.
- Admin route kiểm tra trusted device trước khi render dữ liệu quản trị.
- Bỏ cơ chế tự động nâng tài khoản đầu tiên thành admin để tránh privilege escalation trên browser mới.
- Thêm trạng thái TRUSTED DEVICE / DEVICE BOUND trong Admin Center.
- Ghi audit event khi admin truy cập từ thiết bị không được tin cậy.

## Admin Center motion upgrade — 2026-11-14

- Nâng cấp Admin Center với motion suite đồng bộ visual language của Homepage.
- Thêm animated spotlight theo con trỏ, scanline, ambient glow, border flow và shimmer.
- Thêm tilt interaction cho panel/KPI/privacy card và ripple feedback cho button.
- Thêm animated KPI counters, chart stagger, health sweep và activity transitions.
- Thêm header shrink khi scroll và trạng thái detail panel khi chọn user.
- Giữ reduced-motion fallback cho toàn bộ animation mới.

# Changelog
## Shared ZHosting branding — 2026-11-14

- Thêm logo ZHosting SVG dùng chung tại `assets/brand/zhosting-mark.svg`.
- Đồng bộ logo trên Homepage, Login, Register, Account Center, Admin Center và 404.
- Thêm favicon SVG để logo hiển thị trên browser tab cho toàn bộ các trang HTML hiện có.
- Admin Center tiếp tục được nâng cấp với keyboard shortcut `/` và `Ctrl/Cmd + K`, toast feedback cho thao tác, cùng hệ thống logo chung.

## Admin Center homepage synchronization — 2026-11-14

- Đồng bộ Admin Center với design tokens của trang chủ: background, panel, border, typography, cyan/blue accent và glass surface.
- Thêm grid background, noise layer và ambient glow giống visual language của homepage.
- Thêm reveal/stagger animation khi các khu vực Admin Center xuất hiện trong viewport.
- Thêm hover lift, shimmer, glow và micro-interaction cho card, button, table row và activity feed.
- Thêm scroll progress và nút back-to-top.
- Thêm reduced-motion fallback để tắt animation không cần thiết.
- Giữ nguyên chức năng quản trị, audit, session và user management hiện có.

## Admin Center visual upgrade — 2026-11-14

- Thêm branded ZHosting mark mới cho Admin Center theo hướng cyber-SaaS.
- Thêm global search trên header để tìm user trực tiếp từ Control Plane.
- Thêm quick jump tới User Directory.
- Tăng tính nhất quán giữa brand, header, control actions và Admin Center design system.
- Tối ưu header cho desktop, tablet và mobile.

## Admin Center refinement — 2026-11-14

- Nâng User Directory với sắp xếp theo hoạt động gần nhất, tên, số login và ngày đăng ký.
- Nút Làm mới không còn reload toàn trang; Admin Center đọc lại browser storage và cập nhật dữ liệu trực tiếp.
- Giữ trạng thái tài khoản đang chọn sau khi refresh khi dữ liệu còn hợp lệ.
- Highlight dòng user đang được xem và cải thiện keyboard/accessibility label cho thao tác xem.
- Tiếp tục đồng bộ responsive toolbar và table interaction với design system ZHosting.

## 2026-11-14 — Security & UX Hardening

- Hardened browser storage reads so malformed JSON is cleared instead of breaking authentication flows.
- Added session user binding metadata and explicit logout audit events.
- Password changes now require at least 12 characters, reject reusing the current password, and revoke older sessions.
- Hardened the legacy dashboard controller with null-safe navigation and the shared authentication/session layer.
- Added accessible mobile navigation state via `aria-expanded`.
- Continued unified Inter + Space Grotesk typography across the product surfaces.


Tất cả thay đổi đáng chú ý của ZHosting được ghi tại đây.

## [Unreleased]

### Security hardening — 2026-11-14

- Ghi nhận explicit logout vào client audit telemetry khi có session hợp lệ.

- Nâng password policy của tài khoản mới và đổi mật khẩu lên tối thiểu 12 ký tự.
- Thêm recovery khi browser storage chứa JSON không hợp lệ.
- Chặn account locked trước password verification và giữ thông báo đăng nhập chung.
- Harden Admin CSV export chống formula injection và sửa newline CSV chuẩn.
- Bổ sung regression checklist cho các case security mới.

### Added

- Shared ZHosting UI system.
- Config Builder.
- Network Map UI.
- FAQ search.
- Global animation engine.
- Ripple interactions.
- Spotlight/grid/grain effects.
- Login/register polish.
- Logout transition.
- Session guard.
- PBKDF2 password record cho demo authentication.
- Password migration cho format cũ.
- Login throttling phía client.
- CSP và Referrer Policy.
- CodeQL workflow.
- Static security audit.
- Security policy và `security.txt`.
- Professional repository documentation.

### Improved

- Unified Inter + Space Grotesk typography.
- Responsive auth and dashboard.
- Safe DOM rendering.
- Account-aware navbar.
- Session timeout handling.
- Documentation structure.

### Security

- Removed unsafe dynamic HTML construction from major JS modules.
- Added security-focused CI checks.
- Added production authentication limitations to documentation.

## [0.1.0]

### Added

- Initial ZHosting landing page.
- Services section.
- Pricing section.
- Status section.
- FAQ accordion.
- Contact CTA.
- Responsive mobile navigation.

> Phiên bản hiện tại vẫn là prototype/frontend demo; production backend chưa được triển khai.


## Account Center — 2026-11-06

- Account Command Center.
- Account Insights.
- Workspace Navigator với tìm kiếm khu vực.
- Command Palette với phím tắt Ctrl/Cmd + K.
- Account Tools và Quick Actions.
- Responsive/mobile và reduced-motion support.
- Tài liệu cần được cập nhật cùng mỗi thay đổi đáng kể.


## Admin Center — 2026-11-06

- Thêm khu vực Admin User Management.
- Hiển thị danh sách tài khoản theo role và status.
- Theo dõi login count, lần đăng nhập gần nhất và metadata thiết bị/trình duyệt ở mức demo.
- Hỗ trợ lọc, tìm kiếm, xem chi tiết, khóa/mở khóa và thu hồi phiên.
- Không hiển thị mật khẩu người dùng.
- Admin Center chỉ là frontend demo khi dữ liệu còn nằm trong browser storage; production cần backend, database và RBAC server-side.


### Admin navigation — 2026-11-06

- Thêm nút `Admin Center` trong account menu.
- Chỉ render entry khi tài khoản hiện tại có role `admin`.
- Đồng bộ style với Account Center và responsive layout.


### Admin navigation fix — 2026-11-06

- Sửa liên kết Admin Center chưa được bind từ Account Center.
- Admin active được điều hướng trực tiếp sang Admin Center.
- User thường tiếp tục không nhìn thấy entry quản trị.


### Admin hardening — 2026-11-06

- Chuẩn hóa dữ liệu user trước khi render.
- Render tên/email bằng DOM text thay vì HTML động.
- Cải thiện empty state, mobile history và disabled action state.
- Refresh Admin Center tải lại dữ liệu mới nhất từ browser storage.


### Home Command Launch — 2026-11-09

- Thêm **ZHosting Command** section trên trang chủ.
- Quick links tới Account Center, Config Builder, Live Status và Project Brief.
- Thêm live network clock.
- Thêm hover/glow motion và responsive mobile.
- Có reduced-motion fallback.


### Live infrastructure customization — 2026-11-09

- Thêm micro telemetry cho các node HN/HCM/SG/JP.
- Load và latency mô phỏng thay đổi định kỳ để giao diện sống động hơn.
- Timestamp `UPDATED` được đồng bộ theo thời gian trình duyệt.
- Thêm transition mượt cho node meter và ping.


## Admin Center v1.4 — 2026-11-09

- Bổ sung thống kê tài khoản bị khóa.
- Thêm xuất CSV metadata tài khoản phục vụ audit demo.
- CSV chỉ chứa metadata an toàn: ID, tên, email, role, status, thời gian và thiết bị đăng nhập gần nhất.
- Không xuất password, password hash, salt hoặc credential secret.
- Admin Center tiếp tục dùng localStorage trong prototype; production cần backend/database/RBAC server-side.


### Admin Command Center — 2026-11-09

- Thêm Admin Command Bar cho thao tác nhanh.
- Quick action tìm user, lọc tài khoản bị khóa và reset bộ lọc.
- Thêm đồng hồ realtime trong Admin Center.
- Responsive command bar cho mobile.


### Admin Analytics Dashboard — 2026-11-09

- Thêm biểu đồ hoạt động đăng nhập 7 ngày.
- Thêm biểu đồ phân bổ Active/Locked.
- Thêm Session Monitor cho phiên quản trị hiện tại.
- Thêm Recent Activity feed từ login history.
- Responsive và hỗ trợ reduced-motion.
- Dữ liệu analytics lấy từ localStorage prototype; không giả lập số liệu ngoài dữ liệu tài khoản hiện có.


### Admin Analytics Expansion — 2026-11-09

- Thêm biểu đồ tăng trưởng tài khoản 30 ngày dựa trên createdAt.
- Thêm Login Health với số lần đăng nhập thành công/thất bại và tỷ lệ thành công.
- Thêm Device & Browser Mix dựa trên audit/login metadata hiện có.
- Thêm Security Audit Log cho các event đăng ký, đăng nhập thành công và đăng nhập thất bại.
- Audit không lưu hoặc hiển thị mật khẩu, password hash hay salt.
- Các số liệu vẫn là dữ liệu client-side của prototype; không giả lập số liệu.

### Security & Bugfix Pass — 2026-11-14

- Fix Admin Center JavaScript syntax lỗi ở phần thống kê.
- Fix cấu trúc HTML analytics để các card nằm đúng trong grid.
- Fix CSV export: UTF-8 BOM và newline chuẩn.
- Ghi audit event cho thao tác Admin khóa/mở khóa tài khoản và thu hồi phiên.
- Giữ nguyên nguyên tắc không lưu plaintext password.
- Audit client-side được giới hạn 200 event để tránh phình localStorage.

### UI consistency & readiness — 2026-11-14

- Chuẩn hóa typography toàn bộ Homepage, Auth, Account Center và Admin Center về Inter + Space Grotesk.
- Đồng bộ font cho heading, brand, CTA, form controls và dữ liệu.
- Bổ sung baseline metadata `color-scheme` và `robots` cho homepage.
- Xác định roadmap tiếp theo theo hướng hoàn thiện frontend đủ dùng trước khi triển khai backend production.


## Performance & polish pass — 2026-11-14

- Thêm adaptive performance layer tại `assets/js/performance.js`.
- Tự giảm hiệu ứng nặng trên thiết bị có RAM/CPU thấp, Save-Data hoặc người dùng bật reduced motion.
- Tắt/pause các hiệu ứng nền không cần thiết khi tab không visible.
- Giảm chi phí paint/layout bằng `contain`, `content-visibility` và hạn chế `will-change`.
- Tối ưu Admin Center theo hướng ưu tiên độ mượt: analytics/workspace lazy-paint, giảm backdrop-filter và ambient effects trên thiết bị yếu.
- Giữ nguyên trusted-device gate và không thay đổi ranh giới authorization hiện tại.


## Performance runtime refinement — 2026-11-14

- Chuyển timer demo của homepage sang scheduler tự tạm dừng khi tab không visible, thay vì tiếp tục wake-up theo chu kỳ.
- Áp dụng cơ chế này cho hero micro-animation, Live Status, latency demo và launch clock.
- Khi tab hoạt động trở lại, scheduler tự tiếp tục mà không cần reload trang.
- Không thay đổi dữ liệu, auth flow, trusted-device gate hoặc cấu trúc Admin Center.
- Mục tiêu là giảm background CPU wake-up và giữ animation mượt khi người dùng làm việc lâu với website.


## Admin account visibility hardening — 2026-11-14

- Bổ sung vùng thông tin Email và IP trong User Details.
- Admin có thể xem IP khi login metadata/backend cung cấp trường `ip`; không tự suy đoán hoặc gọi dịch vụ IP bên thứ ba.
- Login History, Recent Activity và CSV có thể mang IP metadata nếu có.
- Mật khẩu plaintext không bao giờ được hiển thị trong Admin Center.
- Giữ nguyên trusted-device gate cho Admin Center.


## Stability & regression pass — 2026-11-14

- Fixed duplicate homepage motion/reveal observers between `app.js` and `ui.js`, reducing redundant IntersectionObserver work.
- Added a shared homepage motion-engine flag so secondary UI runtime does not bind duplicate anchor/reveal behavior.
- Debounced Admin Center directory search to avoid excessive table renders while typing.
- Unified homepage footer branding with the shared ZHosting logo asset.
- Fixed the homepage Security footer route from a root-level `SECURITY.md` path to `docs/SECURITY.md`.
- Preserved trusted-device Admin Center protection and adaptive performance fallbacks.


## Frontend loading & regression hardening — 2026-11-14

- Chuyển các runtime frontend không cần blocking sang `defer` và giữ đúng thứ tự dependency.
- Performance layer được chạy trước Homepage/App engine để adaptive mode có hiệu lực sớm.
- Giảm parser blocking từ các script UI/Auth/Admin.
- Sửa regression ở Admin Directory search debounce do escape newline trong source.
- Giữ một motion engine chính trên Homepage để tránh observer/listener trùng.
- Không thay đổi dữ liệu người dùng, auth/session model hoặc trusted-device authorization.


## Frontend regression hardening — 2026-11-14

- Sửa Admin Directory search để không còn newline escape nằm trong JavaScript source.
- Debounce cả Global Search của Admin Center để tránh render liên tục khi nhập nhanh.
- Harden Homepage anchor navigation, tránh selector lỗi làm gián đoạn click handler.
- Làm adaptive performance runtime idempotent, tránh bind resize/visibility listener hai lần nếu script bị nạp lại.
