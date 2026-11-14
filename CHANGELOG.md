## Contact routing fix — 2026-11-14

- Đồng bộ các luồng mailto của Contact Flow về `dangkhoita2@gmail.com`.

# Changelog
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
