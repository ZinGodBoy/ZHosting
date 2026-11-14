## CSS & JS hardening — 2026-11-14

- Tăng cường focus-visible và thao tác touch trên shared CSS.
- Bổ sung responsive hardening cho homepage, Account Center và Admin Center.
- Giảm layout overhead bằng containment ở khu vực Account Health.
- Thêm helper debounce/safe text cho runtime frontend.
- Bổ sung guard helper cho Admin Center khi refresh dữ liệu user.
- Giữ reduced-motion và không thay đổi cơ chế authentication.

## Account Center health overview — 2026-11-14

- Thêm khu vực **Account Health** để người dùng nhìn nhanh trạng thái phiên, bảo mật và lịch sử hoạt động.
- Kiểm tra lại session khi quay lại tab.
- Bổ sung trạng thái trực quan và responsive cho màn hình nhỏ.
- Giữ nguyên reduced-motion và không hiển thị dữ liệu nhạy cảm.

## Contact routing fix — 2026-11-14

- Đồng bộ email liên hệ trên homepage và Contact Flow về `dangkhoita2@gmail.com`.
- Loại bỏ địa chỉ `contact@zhosting.vn` còn sót trong các luồng mailto của frontend.
- Không thay đổi logic thu thập dữ liệu hoặc authentication.

## v1.4.0 — 2026-11-14 — Frontend Hardening & Admin Control Plane

### Added
- Trusted Admin Device Gate using browser-bound ECDSA P-256 keys with IndexedDB.
- Shared ZHosting brand mark and favicon.
- Adaptive performance runtime and reduced-motion handling.
- Admin analytics, global search, directory sorting, audit feed and session controls.

### Changed
- Admin navigation and route access require a trusted admin device.
- Authentication/session lifecycle and browser storage handling were hardened.
- Admin and homepage runtime work was optimized to reduce unnecessary background work.
- Release documentation now follows Semantic Versioning.

### Fixed
- Removed automatic first-user admin promotion.
- Removed duplicate performance runtime on 404.
- Fixed empty/invalid anchor navigation errors.
- Made session guard and Admin clock lifecycle-safe.
- Hardened admin search and CSV export.

### Security
- Admin Center does not render password, hash or salt.
- Trusted-device binding is documented as a frontend prototype boundary, not server-side authorization.

### Version history
- `v1.0.0` — Initial frontend foundation.
- `v1.1.0` — Account Center.
- `v1.1.1` — Account UX/accessibility fixes.
- `v1.2.0` — Authentication & Security.
- `v1.2.1` — Auth/session hardening.
- `v1.3.0` — Admin Center.
- `v1.3.1` — Admin UX/analytics/navigation fixes.
- `v1.4.0` — Frontend hardening & Admin Control Plane.

## Support bubbles readability refinement — 2026-11-14

- Nâng cấp 2 bong bóng hỗ trợ Zalo và Discord thành mini support panel dễ đọc hơn.
- Hiển thị rõ tên kênh, số điện thoại/tên Discord và mục đích liên hệ.
- Thêm trạng thái “Cần hỗ trợ?” và hiệu ứng hover nhẹ.
- Trên màn hình nhỏ chuyển thành nút nổi gọn; vẫn có tooltip khi hover/focus.
- Giữ keyboard focus, responsive và reduced-motion.
- Không thay đổi thông tin liên hệ hiện tại.

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

## Regression hardening — 2026-11-14

- Loại bỏ cơ chế tự cấp admin cho tài khoản đăng ký đầu tiên.
- Xóa script performance.js bị nhúng trùng trên trang 404.
- Làm timer kiểm tra session và đồng hồ Admin Center lifecycle-safe: dừng khi tab nền và cleanup khi rời trang.
- Harden anchor navigation để href="#" hoặc selector không hợp lệ không gây JavaScript exception.

## Support Dock — 2026-11-14

- Thay support bubbles cũ bằng dock nổi cố định dùng chung trên Homepage, Login, Register, Account Center, Admin Center và 404.
- Zalo và Discord hiển thị dạng nút tròn với logo thương hiệu, hover/focus mở rộng thông tin liên hệ.
- Mobile giữ dạng icon-only để không che nội dung.
- Support dock được inject bởi một runtime duy nhất và có guard chống khởi tạo trùng.
- Thêm reduced-motion fallback.

## Support Dock V2 — 2026-11-14

- Nâng cấp hai bong bóng Zalo/Discord thành floating branded support dock.
- Thêm trạng thái `HỖ TRỢ / ONLINE`.
- Icon thương hiệu giữ dạng hình tròn; desktop có hover/focus expansion, shimmer và glow riêng theo từng nền tảng.
- Mobile chuyển về icon-only 50px để tránh che nội dung.

## v1.4.1 — UI Quality & Runtime Hardening — 2026-11-14

### Added
- Shared accessibility focus ring, skip-link, screen-reader utility and print-safe presentation rules.
- Shared runtime quality API for debouncing, busy states, safe display text and page lifecycle hooks.
- Form validation state cleanup and safer handling of links opened in a new tab.
- Account Center and Admin Center lifecycle refresh hooks for returning to a tab/page.

### Changed
- Hardened responsive table behavior and sticky table headers in Admin Center.
- Added lightweight UI state tokens and reduced-motion-safe interaction rules.
- Added final responsive polish for small Account Center layouts.
- Kept performance changes additive and framework-free.

### Security
- No plaintext passwords, secrets or fabricated IP data were introduced.
- target=_blank links are normalized with noopener noreferrer.
- Accessibility helpers do not replace server-side authorization.

### Validation note
- This release remains a static/frontend prototype. Real account security, IP collection, RBAC, billing and hosting control require a backend.


## v1.4.2 — Performance Optimization — 2026-11-14

### Performance
- Reduced main-thread work in the adaptive performance runtime.
- Added passive scroll scheduling with requestAnimationFrame.
- Added network-aware degradation for Save-Data and 2G connections.
- Paused non-essential visual activity when the page is hidden.
- Added mobile content-visibility/containment for large sections.
- Reduced expensive blur, glow and pseudo-element effects on constrained devices.

### UX
- Preserved the full visual system on capable devices.
- Kept reduced-motion and accessibility behavior intact.
- No new runtime dependency was introduced.

\n## v1.4.3 — Regression & Cross-page Hardening — 2026-11-14\n\n### Fixed\n- Fixed malformed escaped newline in `assets/js/ui.js` that could stop the shared UI runtime from parsing.\n- Removed duplicate homepage logout handling so the shared logout controller owns the transition.\n- Added IntersectionObserver fallback so reveal animations degrade to immediately visible content instead of failing on unsupported browsers.\n- Hardened responsive focus, disabled, hidden and reduced-motion states across Homepage, Account Center and Admin Center.\n\n### Quality gate\n- Re-checked JavaScript delimiter balance across core runtime files.\n- Re-checked literal escaped-newline occurrences and confirmed remaining instances are inside intended string literals (email/CSV payloads).\n- No plaintext password exposure was added.\n\n\n## v1.4.4 — Visual Refresh & Micro UX — 2026-11-14\n\n### Changed\n- Đổi visual theme chính từ xanh/cyan sang midnight violet/indigo, giữ độ tương phản và nhận diện ZHosting.\n- Đồng bộ nền Homepage, Account Center và Admin Center.\n\n### Added\n- Live clock hook qua `data-live-clock`.\n- Copy micro-interaction qua `data-copy`.\n- Feedback nhẹ khi click button.\n- Trạng thái copied rõ ràng nhưng không gây layout shift.\n\n### Performance\n- Không thêm dependency. Các hiệu ứng mới có reduced-motion fallback.\n\n
## [1.4.5] — Load & Runtime Cleanup

- Deferred the shared UI runtime consistently across homepage, auth, dashboard, Admin Center and 404 pages.
- Removed the duplicate UI scroll-progress runtime; the primary app engine remains responsible for scroll progress.
- Reduced initial DOM work and avoided a second scroll listener on pages using the shared UI layer.

## v1.4.5 — Live Status & Micro UX — 2026-11-14

### Added
- Live status indicator trên Homepage, Account Center và Admin Center.
- Đồng hồ trạng thái dùng chung, tự dừng khi tab bị ẩn để giảm timer overhead.
- Mobile layout riêng cho status pill, không che nội dung chính.

### Fixed
- Live clock không còn chạy nền liên tục khi người dùng chuyển tab.

### Performance
- Không thêm dependency hoặc request mạng mới.

## v1.4.5 — Runtime Micro-UX Hardening — 2026-11-14

### Fixed
- Chặn việc gắn lặp event click feedback khi shared UI được khởi tạo nhiều lần.
- Clipboard micro-UX kiểm tra khả năng hỗ trợ Clipboard API trước khi gọi.
- Live status pill có focus treatment và fallback khi giảm transparency.

## [1.4.6] — Account/Admin Consistency Fixes

- Removed duplicate Account Center admin-navigation initialization.
- Admin Center entry now requires both an active admin role and a trusted admin device, matching the Admin Center gate.
- Aligned dashboard password-change validation with the 12-character authentication policy.

## [1.4.7] — Support Dock Scrollbar Alignment

- Support Zalo/Discord bubbles now calculate the browser scrollbar width and stay visually aligned beside the right scrollbar.
- Alignment recalculates on viewport resize and orientation changes without a scroll listener.
- Mobile keeps a smaller safe offset.

## v1.4.6 — Performance & Rendering Optimization — 2026-11-14

### Performance
- Giảm chi phí render trên thiết bị RAM/CPU thấp, Save-Data hoặc mạng chậm.
- Tự tắt một số glow/orb/spotlight/tilt và backdrop blur nặng khi vào chế độ lite.
- Tạm dừng animation khi tab bị ẩn.
- Giảm box-shadow trên surface trong performance mode.
- Giữ nguyên layout và chức năng, không thêm dependency.

## [1.4.8] — Support Dock Polish

- Refined the floating Zalo/Discord dock positioning and viewport recalculation.
- Resize/orientation updates are now batched with requestAnimationFrame.
- Added safe-area handling for mobile devices and kept the dock non-blocking outside its buttons.
- Preserved the scrollbar-aware right offset from v1.4.7.

## [1.4.9] — Scroll Navigation Optimization

- Replaced per-scroll section `offsetTop` scanning with IntersectionObserver-based active navigation tracking.
- Scroll progress now uses compositor-friendly `transform: scaleX()` updates instead of changing width.
- Reduced layout reads and main-thread work during continuous scrolling.
- Preserved header state, back-to-top behavior and active section navigation.

## v1.4.6 — Runtime Event Optimization — 2026-11-14

### Performance
- Giảm DOM writes dư thừa trong scroll state.
- Thêm shared requestAnimationFrame throttle helper cho các tác vụ UI cần đồng bộ theo frame.
- Chuyển button feedback sang event delegation, giảm số lượng event listener theo số nút trên trang.

## v1.4.7 — Paint & Event Optimization — 2026-11-14

### Performance
- Copy interaction chuyển sang event delegation, tránh tạo listener riêng cho từng nút.
- Giảm thêm shadow/glow/backdrop paint trong Performance Lite Mode.
- Giữ support dock và live status nhẹ hơn trên thiết bị hạn chế tài nguyên.

## [1.4.10] — Admin Device Gate Runtime Optimization

- Cached the IndexedDB-backed admin ECDSA key pair during the page lifecycle.
- Cached the derived public-key fingerprint to avoid repeated Web Crypto export/hash work.
- Preserved device trust checks and enrollment behavior while reducing repeated async storage/crypto operations.

## [1.4.11] — Runtime Smoothness Pass

- Removed pointer-follow admin card tilt and its per-frame layout reads/writes.
- Batched live hosting configuration recalculation to one animation frame per input frame.
- Removed unnecessary persistent compositor hints from static homepage cards.
- Reduced mobile blur/shadow workload while preserving the visual hierarchy.

## v1.4.8 — Support Bubbles — 2026-11-14

- Khôi phục 2 bong bóng Zalo/Discord dạng tròn với logo thương hiệu.
- Thêm chuyển động nổi nhẹ liên tục, hover/focus nâng bóng và tooltip.
- Tự thu nhỏ trên mobile và tắt animation khi người dùng giảm chuyển động.


## v1.4.12 — Theme Color Customization
- Added a lightweight browser-side theme tool for accent/background customization.
- Supports HEX and RGB editing plus preset palettes.
- Persists user theme preferences locally and provides reset-to-default.
