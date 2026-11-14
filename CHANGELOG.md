## v1.7.2 — Lifecycle Deduplication & CSS Integrity — 2026-11-14

### Fixed
- Gộp lifecycle `pageshow/visibilitychange` của Account Center để tránh chạy `syncHealth()` và `touchSession()` qua các listener trùng nhau.
- Sửa newline CSS bị escape trong lần hardening Dashboard, tránh để chuỗi `\\n` xuất hiện trong stylesheet.

### Performance
- Giảm callback UI trùng khi tab quay lại foreground.
- Giữ nguyên cơ chế pause khi tab ẩn và reduced-motion.

### Quality
- Không thay đổi auth/session semantics.
- Không thêm dependency, timer nền hoặc observer mới.

## v1.7.1 — Cross-page Rendering Hardening — 2026-11-14

### Performance
- Tối ưu thêm UI constrained-device cho Homepage, Account Center và Admin Center.
- Giảm backdrop-filter trên toast/modal/palette khi thiết bị bị giới hạn.
- Tắt ambient grid/noise/scanline và các pulse animation không cần thiết trong Admin Center trên performance mode.
- Giữ reduced-motion nhất quán cho badge, trạng thái và indicator.

### Quality
- Không thay đổi authentication, session, dữ liệu tài khoản hoặc navigation.
- Không thêm dependency và không tạo thêm background timer/observer.

## v1.7.0 — Performance Finishing & Runtime Cleanup — 2026-11-14

### Fixed
- Loại bỏ `ResizeObserver` khỏi support dock vì chiều cao tài liệu đã được đo qua lifecycle resize/pageshow; tránh callback layout không cần thiết khi DOM thay đổi.
- Giữ cleanup RAF/resize đầy đủ khi rời trang.

### Performance
- Tắt các decorative pulse trên constrained-device và reduced-motion.
- Loại bỏ backdrop-filter khỏi theme tools trên thiết bị/network bị giới hạn.
- Không thay đổi hành vi điều hướng, authentication hoặc dữ liệu tài khoản.

### UI
- Giữ hiệu ứng desktop đầy đủ.
- Thiết bị yếu vẫn giữ hierarchy, màu sắc và trạng thái tương tác nhưng giảm hiệu ứng gây tốn paint/compositing.

## v1.6.9 — Runtime Stability & Interaction Polish — 2026-11-14

### Fixed
- Sửa lifecycle của chế độ reduced-motion để listener được đăng ký/hủy đúng handler.
- Giữ trạng thái adaptive performance đồng bộ khi người dùng thay đổi Reduce Motion trong lúc trang đang mở.

### Performance
- Giảm xử lý click feedback lặp lại trên cùng nút trong khoảng thời gian rất ngắn.
- Không thêm observer hoặc timer nền mới cho UI.

### UI
- Giữ hiệu ứng click ngắn, ổn định và tương thích reduced-motion.
- Không thay đổi cấu trúc footer; tiếp tục ưu tiên bố cục sạch, vùng chạm rõ và hiệu ứng nhẹ.

## v1.6.8 — Footer Runtime & Layout Hardening — 2026-11-14

### Fixed
- Đồng bộ biến CSS của support dock với runtime `--support-right`, loại bỏ fallback biến cũ.
- Giảm cập nhật class `footer-in-view` thừa khi trạng thái viewport không thay đổi.

### Performance
- Footer contact cards dùng containment nhẹ cho layout/paint, không thêm animation runtime.
- Giữ nguyên constrained-device, reduced-motion và responsive behavior.

### UI
- Tinh chỉnh vùng chạm ở liên kết footer trên mobile.
- Giữ bố cục liên hệ Zalo, Discord, Email cân đối và không che nội dung cuối trang.


## v1.6.4 — Footer UX & Visual Polish — 2026-11-14

### Changed
- Làm lại khu vực liên hệ cuối trang với Zalo, Discord và Email rõ ràng hơn.
- Bổ sung CTA hỗ trợ ngay trước footer-bottom, giảm khoảng trống và tăng phân cấp thị giác.
- Bổ sung liên kết Liên hệ ở footer-bottom để điều hướng nhanh trên mobile.

### Performance
- Footer dùng hiệu ứng nhẹ, không thêm animation runtime hoặc observer mới.
- Giữ chế độ reduced-motion và constrained-device tương thích với footer.
- Không sử dụng blur/backdrop-filter mới trong khu vực footer.

### UI
- Đồng bộ footer với Midnight Violet/Indigo.
- Cải thiện responsive ở tablet/mobile, kích thước chữ và vùng chạm.
- Giữ trạng thái focus-visible cho khả năng truy cập.

## v1.6.1 — Runtime Lifecycle & Performance Follow-up — 2026-11-14

### Fixed
- Support bubbles dừng RAF/resize work khi tab bị ẩn và tự đo lại khi quay lại.
- Đồng bộ biến vị trí support dock với runtime CSS `--support-right`.
- Scheduler vẫn tiếp tục vòng lặp sau exception; chỉ log lỗi khi bật `window.ZHostingDebug`.
- FAQ search được debounce để tránh lọc DOM liên tục khi người dùng gõ nhanh.

### Performance
- Loại bỏ `will-change: transform` cố định còn sót trên shared selectors.
- Chế độ constrained tự phản ứng khi trạng thái mạng `saveData/effectiveType` thay đổi.
- Giảm shadow/shimmer không cần thiết trên thiết bị hoặc mạng bị giới hạn.

### Quality
- Không thay đổi cấu trúc UI, authentication hoặc dữ liệu tài khoản.
- Ưu tiên lifecycle đúng, giảm main-thread work và giữ nguyên visual language hiện tại.

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


## v1.5.0 — Support Bubble Viewport Guard — 2026-11-14

- Thêm viewport guard để cụm Zalo/Discord tránh vùng quá sát mép trên/dưới khi cuộn.
- Tự điều chỉnh kích thước trên viewport thấp và khi xoay màn hình.
- Giữ scroll-follow nhẹ bằng requestAnimationFrame.


## v1.4.13 — Advanced Theme Backgrounds
- Extended the theme tool with solid/gradient background modes.
- Added secondary background color and gradient angle controls.
- Presets now include coordinated secondary colors.


## v1.5.1 — Support Bubble Motion Fix — 2026-11-14

- Sửa lỗi support dock có class nhưng thiếu runtime styling nên 2 bong bóng không có chuyển động.
- Bổ sung animation nổi độc lập và lệch nhịp giữa Zalo/Discord.
- Scroll-follow được xử lý tập trung trong assets/js/support.js bằng requestAnimationFrame.
- Loại bỏ scroll listener trùng trong app.js để giảm main-thread work.
- Giữ responsive, reduced-motion, scrollbar alignment và Performance Lite Mode.


## v1.5.2 — Support Dock Follow Refinement — 2026-11-14

- Sửa offset để 2 bong bóng bám đúng mép phải, có tính scrollbar.
- Đồng bộ lại vị trí khi pageshow/orientation change.
- Hủy RAF khi pagehide để tránh giữ animation task khi rời trang.

## v1.5.1 — Unified Support Bubble Runtime
- Replaced the duplicated homepage support bubble markup with one shared runtime component.
- Zalo/Discord bubbles are now generated consistently across public, auth, dashboard, admin and 404 routes.
- Scroll-follow positioning and scrollbar-aware horizontal alignment are now owned by the shared support runtime to avoid duplicate scroll handlers.
- Preserved responsive and reduced-motion behavior.

## v1.5.3 — Shared UI Runtime Hardening — 2026-11-14

### Performance
- Thêm guard idempotent cho assets/js/ui.js, tránh bind lại runtime nếu script vô tình được nạp nhiều lần.
- Chuyển ripple feedback từ listener riêng trên từng nút sang event delegation cấp document.
- Giảm số lượng event listener và giữ ripple hoạt động với các nút được render động.
- Không thay đổi auth, session, Admin Center hoặc dữ liệu người dùng.

## v1.5.2 — Theme Token Consistency
- Theme customization now uses shared CSS tokens for the page background and major UI surfaces instead of relying only on an inline body background.
- Added RGB controls for the secondary gradient color.
- Fixed secondary RGB edits previously targeting the primary background.
- Theme changes now update the browser `theme-color` metadata and persist the selected gradient/solid mode.
- Shared accent/background tokens are reused by buttons, cards, header and scroll progress.

## v1.5.3 — Runtime Bugfix Hardening
- Fixed support bubble scrollbar alignment after the shared runtime switched to a mismatched CSS custom-property name.
- Restored consistent right-offset behavior on desktop and mobile.
- Reduced expensive fixed-background rendering on mobile.
- Added constrained-device support bubble fallback to remove unnecessary animation and blur.
- Kept reduced-motion behavior intact.

## v1.5.4 — Runtime Lag & Event Optimization — 2026-11-14

### Performance
- Hợp nhất visibility scheduler của Homepage: nhiều timer demo dùng chung một `visibilitychange` listener thay vì tạo listener riêng.
- Dừng scheduler khi trang rời lifecycle để tránh background work không cần thiết.
- Chuyển validation input chung của UI runtime sang event delegation, giảm listener theo số lượng input/textarea.
- Giữ nguyên hành vi validation, live status, command UI và reduced-motion.

### Fixed
- Giảm nguy cơ duplicate runtime work khi có nhiều thành phần UI hoạt động cùng trang.
- Không thay đổi auth/session, Admin Center, trusted-device gate hoặc dữ liệu người dùng.

## v1.5.5 — Duplicate Listener & Render Write Fixes — 2026-11-14

### Fixed
- Gộp validation form về event delegation, loại bỏ listener `input` riêng trên từng form.
- Giữ xử lý `invalid` ở cấp document để không phát sinh listener lặp theo số lượng form.
- Giảm nguy cơ duplicate UI feedback khi trang có nhiều form/component.

### Performance
- Performance layer không ghi lại `--z-viewport-height` nếu chiều cao viewport không thực sự thay đổi.
- Giảm các style write không cần thiết trong resize lifecycle.
- Không thay đổi chức năng đăng nhập, dashboard, Admin Center hoặc cấu hình hosting.

## v1.5.4 — Runtime Performance Pass
- Cached support-dock scroll metrics instead of reading document height on every scroll frame.
- Kept scroll updates passive and rAF-batched.
- Added lightweight containment/backface hints for the floating support dock.
- Reduced mobile blur/noise/shadow overhead.

## v1.5.6 — Lifecycle, Performance & Visual Consistency — 2026-11-14

### Fixed
- Sửa scheduler dùng chung để tương thích BFCache: pagehide chỉ pause, pageshow tự resume thay vì hủy vĩnh viễn job.
- Tránh tình trạng live status/clock không chạy lại sau khi quay lại trang bằng Back/Forward cache.

### Performance
- Giữ scheduler ở trạng thái ngủ khi tab nền và khởi động lại đúng lifecycle.
- Giảm render work không cần thiết khi quay lại trang.

### UI
- Đồng bộ hệ màu Midnight Violet / Indigo cho Homepage, UI runtime và Admin Center.
- Giữ accent violet/indigo làm màu chính, trạng thái thành công vẫn dùng green để phân biệt rõ trạng thái.

## v1.5.7 — Runtime Resilience & GPU Memory Pass — 2026-11-14

### Fixed
- Scheduler demo không còn bị dừng vĩnh viễn nếu một callback runtime phát sinh exception.
- Callback được bảo vệ để scheduler luôn tự lập lịch vòng tiếp theo.
- Loại bỏ biến scheduler dư thừa không được sử dụng.

### Performance
- Gỡ các will-change cố định trên card/reveal/support bubble để tránh GPU layer promotion liên tục và giảm memory pressure.
- Giữ promotion chỉ cho các thành phần thực sự cần thiết theo trạng thái runtime.

### Quality
- Ưu tiên runtime ổn định trước animation: lỗi của một hiệu ứng/demo không được làm chết các tác vụ cập nhật khác.

## v1.5.5 — Serious Runtime & Visual Hardening
- Replaced the homepage live clock interval with a lifecycle-safe timeout scheduler.
- Cached live-clock DOM nodes instead of querying the document every second.
- Removed the duplicate global scroll observer from the performance layer; homepage scroll progress remains owned by the app runtime.
- Added containment to large visual surfaces to reduce paint/layout propagation.
- Improved keyboard focus visibility and scroll offset consistency.
- Added stronger constrained-device fallbacks and a complete reduced-motion override.
- Preserved the existing theme customization, support dock, account and admin behavior.

## v1.5.8 — Support Runtime & Visual Polish — 2026-11-14

### Fixed
- Sửa lệch biến CSS khiến vị trí hai nút hỗ trợ không đồng bộ với scrollbar offset runtime.
- Loại bỏ `ResizeObserver` riêng của support dock để tránh thêm observer liên tục cho một UI phụ.

### Performance
- Chế độ máy yếu/Data Saver tắt backdrop blur và animation của support bubbles.
- Giảm paint/compositing work nhưng vẫn giữ bố cục và khả năng liên hệ.

### UI
- Giữ hai bubble Zalo/Discord đồng nhất vị trí, kích thước và hành vi responsive.
- Reduced Motion tắt transition/animation của support dock.

## v1.6.0 — Footer & Runtime Polish
- Redesigned the homepage footer into a structured three-column information area with responsive mobile layouts.
- Added clearer brand description, system status, service navigation and support navigation.
- Added a compact footer utility row and consistent keyboard focus states.
- Removed the unused homepage `support-bubble-status` marker.
- Reduced footer visual overhead on constrained devices while preserving the main visual hierarchy.

## v1.6.1 — Footer Refinement & Support Dock Fix
- Fixed the support bubble scrollbar-offset variable mismatch so the floating contact dock uses its intended right offset.
- Added pagehide cleanup for pending support-dock animation frames.
- Refined footer contact cards, focus states, navigation hover treatment and constrained-device rendering.
- Kept footer improvements CSS-only to avoid additional runtime work.

## v1.5.9 — Runtime Timer Consolidation — 2026-11-14

### Fixed
- Giảm các runtime demo cập nhật trùng nhau trên trang chủ.
- Gộp heartbeat Live Status và Latency thành một chu kỳ cập nhật thay vì hai timer độc lập.

### Performance
- Giảm số timer định kỳ và số lần wake-up JavaScript khi trang đang hoạt động.
- Giữ cơ chế pause/resume khi tab bị ẩn thông qua scheduler dùng chung.

### Quality
- Live Status vẫn cập nhật Load, Latency và timestamp trong cùng một luồng runtime.
- Không thay đổi dữ liệu cấu hình, đăng nhập hoặc giao diện điều khiển tài khoản.

## v1.6.2 — Runtime Cleanup & Responsive Footer Hardening
- Added page-exit cleanup for the adaptive performance resize frame.
- Consolidated the final low-resource header/footer fallback so constrained devices do not re-enable expensive blur effects.
- Reduced footer shadows and hover transitions on smaller/constrained devices.
- Preserved the full footer visual hierarchy on normal desktop hardware.

## v1.6.0 — Rendering & Accessibility Hardening — 2026-11-14

### Fixed
- Loại bỏ một số `will-change: transform` cố định trên card/support UI để tránh GPU layer promotion liên tục.
- Performance layer phản ứng khi người dùng thay đổi `prefers-reduced-motion` trong lúc trang đang mở.

### Performance
- Giảm persistent compositing pressure trên homepage, dashboard và admin.
- Chế độ thiết bị hạn chế tiếp tục giảm hiệu ứng không cần thiết mà không thay đổi cấu trúc UI.
- Reduced Motion được áp dụng nhất quán hơn cho animation và transition.

### UI
- Giữ nguyên bố cục Midnight Violet/Indigo và các trạng thái hover/focus cần thiết.
- Ưu tiên chuyển động theo trạng thái tương tác thay vì giữ GPU promotion liên tục.

## v1.6.2 — Runtime Cleanup & Responsive Footer Hardening
- Added page-exit cleanup for the adaptive performance resize frame.
- Consolidated the final low-resource header/footer fallback so constrained devices do not re-enable expensive blur effects.
- Reduced footer shadows and hover transitions on smaller/constrained devices.


## v1.6.3 — Footer Refinement & Support Runtime Cleanup
- Refined footer contact hierarchy and responsive layout.
- Added a low-cost visual accent instead of heavier effects.
- Optimized support bubble lifecycle by disconnecting `ResizeObserver` and cancelling pending frames on page exit.


## v1.6.5 — Support Observer Lifecycle Cleanup
- Finalized `ResizeObserver` cleanup for the shared support bubble runtime.
- Prevented observer retention after `pagehide` while keeping scroll/resize behavior unchanged.


## v1.6.6 — Footer Finishing & Utility Collision Guard
- Tightened footer spacing and desktop column proportions for a cleaner hierarchy.
- Added a viewport-aware guard so fixed theme/status controls do not overlap footer content.
- Kept the change lightweight with one `IntersectionObserver` and page-exit cleanup.


## v1.6.7 — Theme Panel Footer Collision Fix
- Prevented an open theme panel from remaining above the footer while the footer is in view.


## v1.6.8 — Whole-Page Runtime & Visual Hardening
- Cached homepage scroll bounds instead of recalculating document height on every scroll frame.
- Added lifecycle cleanup for adaptive performance observers, network listeners and idle callbacks.
- Refined whole-page rendering with stable scrollbar geometry, section dividers, text rendering and low-cost containment.
- Preserved reduced-motion and constrained-device paths.


## v1.6.9 — Runtime Recovery & Mobile Rendering Hardening
- Fixed an accidental JavaScript comment boundary that disabled the homepage counter/account runtime block.
- Reduced scroll work by caching document bounds and refreshing them only on layout changes.
- Disabled non-essential backdrop filtering on tablet/mobile and constrained modes to reduce compositing cost.
- Preserved the desktop visual language while keeping smaller viewports lighter.


## v1.7.1 — Observer Hardening & Constrained Visual Pass
- Hardened homepage counter initialization with a non-IntersectionObserver fallback.
- Added explicit cleanup for homepage reveal/navigation observers on page exit.
- Reduced auth-page blur, grid opacity and card shadow on smaller/constrained devices.
- Disabled non-essential footer decorative layers and server-card motion in constrained mode.


## v1.7.2 — Observer Scope & Lifecycle Fix
- Fixed homepage navigation observer scope so the actual observer is retained and disconnected on page exit.
- Added explicit counter observer cleanup on `pagehide`.
- Kept the runtime event-driven without adding continuous polling or pointer effects.


## v1.7.2 — Observer Scope & Lifecycle Fix
- Fixed homepage navigation observer scope so the actual observer is retained and disconnected on page exit.
- Added explicit counter observer cleanup on `pagehide`.
- Kept the runtime event-driven without adding continuous polling or pointer effects.
