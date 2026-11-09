# Changelog

Tất cả thay đổi đáng chú ý của ZHosting được ghi tại đây.

## [Unreleased]

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
