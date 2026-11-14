# ZHosting

> **Hosting mạnh. Web nhanh. Server ổn định.**

ZHosting là website giới thiệu và mô phỏng trải nghiệm quản trị dịch vụ **Minecraft Hosting, Web Hosting, VPS/Server và Web Development**. Dự án được xây theo hướng **static-first, responsive, animation-rich và security-aware**, phù hợp để chạy trên GitHub Pages.

[![GitHub](https://img.shields.io/badge/GitHub-ZinGodBoy%2FZHosting-181717?logo=github)](https://github.com/ZinGodBoy/ZHosting)
[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-222?logo=github)](https://zingodboy.github.io/ZHosting/)
[![Security](https://img.shields.io/badge/Security-CodeQL%20%2B%20Static%20Audit-2ea44f)](https://github.com/ZinGodBoy/ZHosting/actions)
[![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)](#license)

## ✨ Tổng quan

ZHosting được thiết kế như một **hosting brand website + frontend control-center prototype**.

Dự án hiện có:

- Landing page giới thiệu dịch vụ.
- Bảng giá theo tháng/năm.
- Config Builder tính giá mô phỏng theo RAM, CPU và add-on.
- Network Map mô phỏng node hạ tầng.
- Live infrastructure UI.
- FAQ accordion + tìm kiếm câu hỏi.
- Login / Register / Logout flow.
- Dashboard tài khoản.
- Profile editing và inbox demo.
- Hệ thống animation và design system dùng chung.
- CSP, Referrer Policy, CodeQL và static security audit.
- PBKDF2-HMAC-SHA-256 cho password record của demo account.
- Responsive desktop / tablet / mobile.

> **Quan trọng:** authentication và dữ liệu tài khoản hiện vẫn là **frontend demo**. Không sử dụng repository này để lưu tài khoản, API key, payment data hoặc thông tin khách hàng thật.

## 🎯 Mục tiêu dự án

1. Xây một giao diện hosting hiện đại có khả năng mở rộng.
2. Giữ toàn bộ website nhất quán về typography, màu sắc, spacing và motion.
3. Thực hành HTML semantic, CSS architecture và JavaScript modular-by-convention.
4. Làm rõ ranh giới giữa **frontend prototype** và **production backend**.
5. Duy trì quy trình kiểm thử và security review ngay từ giai đoạn frontend.

## 🧩 Công nghệ

| Thành phần | Sử dụng |
|---|---|
| Markup | HTML5 semantic |
| Styling | CSS3, responsive CSS, design tokens |
| Logic | Vanilla JavaScript (ES6+) |
| Typography | Inter + Space Grotesk |
| Hosting | GitHub Pages |
| Security automation | GitHub Actions + CodeQL |
| Static audit | Node.js script |
| Auth demo | Web Crypto API + PBKDF2 |
| Storage demo | localStorage / sessionStorage |

Không phụ thuộc React, Vue, Tailwind hay backend framework trong phiên bản hiện tại.

## 🗂️ Cấu trúc repository

```text
ZHosting/
├── index.html
├── 404.html
├── auth/
│   ├── login.html
│   └── register.html
├── dashboard/
│   ├── index.html
│   └── dashboard.css
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── ui.css
│   └── js/
│       ├── app.js
│       ├── auth.js
│       ├── dashboard.js
│       └── ui.js
├── docs/
│   ├── ARCHITECTURE.md
│   ├── AUTHENTICATION.md
│   ├── DEPLOYMENT.md
│   ├── DESIGN_SYSTEM.md
│   ├── SECURITY.md
│   └── TESTING.md
├── scripts/
│   └── security-audit.mjs
├── .github/
│   └── workflows/
│       └── security.yml
├── .well-known/
│   └── security.txt
├── AI_LOG.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── ROADMAP.md
├── SECURITY.md
└── SUPPORT.md
```

## 🚀 Chạy local

Cách đơn giản nhất:

```bash
git clone https://github.com/ZinGodBoy/ZHosting.git
cd ZHosting
```

Sau đó mở repository bằng VS Code và chạy bằng **Live Server** hoặc một static server.

Ví dụ với Node.js:

```bash
npx serve .
```

Không nên mở một số flow auth phức tạp bằng `file://` nếu trình duyệt giới hạn Web Crypto hoặc storage behavior.

## 🌐 Deploy GitHub Pages

1. Mở **Settings → Pages**.
2. Chọn **Deploy from a branch**.
3. Branch: `main`.
4. Folder: `/(root)`.
5. Save.
6. Chờ GitHub Pages publish website.

Kiểm tra thêm:

- Homepage.
- Login / Register.
- Dashboard redirect.
- Logout.
- Mobile navigation.
- CSP không chặn tài nguyên cần thiết.
- GitHub Actions security workflow.

## 🔐 Security

Các lớp bảo vệ hiện có:

- Content Security Policy metadata.
- Referrer Policy.
- PBKDF2-HMAC-SHA-256 + random salt cho demo password record.
- Session idle timeout và absolute timeout.
- Client-side login throttling.
- Safe DOM APIs thay cho dynamic HTML injection.
- CodeQL workflow.
- Static security audit.
- Security policy và `.well-known/security.txt`.

Xem chi tiết:

- [Security Policy](SECURITY.md)
- [Authentication](docs/AUTHENTICATION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Testing](docs/TESTING.md)

### Production warning

GitHub Pages là static hosting. Nó **không thể tự cung cấp**:

- HttpOnly session cookies.
- Secure server-side sessions.
- Server-side authorization.
- Database transactions.
- Server-side rate limiting.
- MFA enforcement.
- Secret management.

Muốn đưa ZHosting thành hệ thống kinh doanh thật cần backend + database + secure session architecture.

## 🎨 Design system

Toàn bộ page dùng cùng hệ visual:

- **Inter** cho body/UI text.
- **Space Grotesk** cho heading/display.
- Dark navy background.
- Cyan / blue gradient accents.
- Glassmorphism.
- Soft border system.
- 3D hover.
- Reveal/stagger animation.
- Ripple interaction.
- Reduced-motion fallback.

Design system dùng chung nằm trong `assets/css/ui.css` và `assets/js/ui.js`.

Xem thêm: [Design System](docs/DESIGN_SYSTEM.md).

## 🧪 Quality & testing

Trước khi merge thay đổi lớn nên kiểm tra:

- Navigation desktop/mobile.
- Login/Register.
- Password show/hide.
- Password migration.
- Session expiry.
- Logout.
- Dashboard guard.
- Config Builder.
- FAQ search.
- Pricing toggle.
- Responsive breakpoints.
- CSP.
- CodeQL.
- Static audit.

Xem checklist đầy đủ tại [Testing](docs/TESTING.md).

## 🤖 Sử dụng AI

AI được dùng như công cụ hỗ trợ phát triển, không thay thế việc đọc, kiểm tra và chịu trách nhiệm với mã nguồn.

Nhật ký sử dụng AI: [AI_LOG.md](AI_LOG.md).

## 🤝 Đóng góp

Đọc [CONTRIBUTING.md](CONTRIBUTING.md) trước khi tạo pull request.

## 🗺️ Roadmap

Xem [ROADMAP.md](ROADMAP.md).

## 📜 Changelog

Xem [CHANGELOG.md](CHANGELOG.md).

## 🆘 Hỗ trợ

Xem [SUPPORT.md](SUPPORT.md).

## 📄 License

Repository hiện **chưa công bố một open-source license chính thức**. Việc xem, fork hoặc tái sử dụng mã nguồn cần tuân theo quyền sở hữu của chủ repository cho đến khi có license rõ ràng.

---

Built with HTML, CSS, JavaScript and a lot of iteration.

**ZHosting — Built for creators, communities & businesses.**



## Release status

**Current release track:** `v1.4.0` — Frontend Hardening & Admin Control Plane

- Account Center + Admin Center frontend prototype.
- Trusted Admin Device Gate.
- Shared branding/favicon.
- Adaptive performance + reduced-motion support.
- Authentication/session hardening.
- Navigation/runtime regression fixes.

### Semantic Versioning

- `v1.0.0` — Initial frontend foundation.
- `v1.1.0` — Account Center.
- `v1.1.1` — Account UX/accessibility fixes.
- `v1.2.0` — Authentication & Security foundation.
- `v1.2.1` — Auth/session hardening.
- `v1.3.0` — Admin Center.
- `v1.3.1` — Admin UX/analytics/navigation fixes.
- `v1.4.0` — Frontend hardening, performance and trusted-device gate.

## Account Center — 2026-11-06

- Account Command Center.
- Account Insights.
- Workspace Navigator với tìm kiếm khu vực.
- Command Palette với phím tắt Ctrl/Cmd + K.
- Account Tools và Quick Actions.
- Responsive/mobile và reduced-motion support.
- Tài liệu cần được cập nhật cùng mỗi thay đổi đáng kể.


## Admin account audit — 2026-11-06

- Chuẩn hóa metadata tài khoản: role, status, loginCount và loginHistory.
- Ghi nhận lần đăng nhập thành công cùng thiết bị/trình duyệt ở mức demo cục bộ.
- Admin Center có trusted-device gate; tài khoản đăng ký mới mặc định là `user`.
- Hỗ trợ cờ thu hồi phiên và khóa tài khoản ở client demo.
- Không hiển thị hoặc lưu mật khẩu dạng plaintext.
- Đây vẫn là cơ chế frontend/localStorage; production cần backend, database và RBAC server-side.


## Admin Center — 2026-11-06

- Admin Center có entry trực tiếp từ Account Center khi role là `admin`.
- Entry chỉ hiển thị cho admin và không hiển thị cho user thường.
- Điều hướng vẫn tuân theo guard phía Admin Center; frontend demo không thay thế RBAC server-side.


## Admin navigation fix — 2026-11-06

- Account Center now binds `Admin Center` navigation from the authenticated user role.
- The entry is hidden for non-admin accounts and active admin accounts are routed to `/admin/`.
- Navigation remains client-side UX only; sensitive authorization must still be enforced server-side in production.


## Home Command Launch — 2026-11-09

Trang chủ được mở rộng thêm khu vực **ZHosting Command** với các lối tắt tới Account Center, Config Builder, Live Status và Project Brief. Khu vực này dùng card tương tác, live clock và reduced-motion fallback.


## Live Infrastructure UI — 2026-11-09

Trang chủ có thêm lớp micro-telemetry mô phỏng cho Network Map: load, latency và timestamp được cập nhật định kỳ phía trình duyệt. Đây là dữ liệu demo, chưa phải monitoring thật.


## UI consistency — 2026-11-14

ZHosting sử dụng một hệ typography thống nhất trên Homepage, Auth, Account Center và Admin Center:

- **Inter**: body text, form controls, navigation và dữ liệu.
- **Space Grotesk**: heading, brand, CTA và các điểm nhấn giao diện.
- Responsive và reduced-motion tiếp tục được hỗ trợ.

## Product readiness

Mục tiêu của các đợt update tiếp theo là đưa prototype về mức **đủ dùng cho demo/portfolio và vận hành frontend**, gồm UI consistency, auth UX, account management, admin analytics, accessibility, responsive behavior và security hardening. Backend production vẫn là phase riêng.


## Performance architecture — 2026-11-14

ZHosting có thêm lớp **Adaptive Performance Layer** để giữ visual system hiện đại nhưng tránh animation và rendering cost không cần thiết.

- `assets/js/performance.js` là runtime nhẹ, không thêm framework.
- Tự hạ hiệu ứng khi phát hiện reduced-motion, thiết bị tài nguyên thấp hoặc Save-Data.
- Background telemetry và clock được pause về mặt callback khi tab bị ẩn.
- CSS dùng containment/content-visibility cho các khu vực có chi phí render cao.
- Admin Center được ưu tiên tối ưu riêng vì có nhiều chart, feed, table và motion layer.

### Support Dock

Website có support dock nổi dùng chung trên toàn bộ page. Zalo và Discord được hiển thị bằng icon tròn; desktop mở rộng khi hover/focus, mobile giữ dạng gọn. Đây là lớp điều hướng liên hệ, không thu thập dữ liệu người dùng.

### Support Dock V2

Zalo và Discord hiện dùng floating branded bubbles với logo tròn, trạng thái hỗ trợ online, hover expansion trên desktop và chế độ icon-only trên mobile.

## v1.4.1 quality pass

The current release track includes a final UI/runtime hardening pass focused on maintainability and predictable browser behavior:

- Unified focus-visible behavior and accessibility helpers.
- Print-safe and reduced-motion-safe UI rules.
- Shared ZHostingUI runtime helpers for small frontend interactions.
- Safer external-link handling and form validation state cleanup.
- Account Center/Admin Center lifecycle refresh behavior.
- Responsive Admin table hardening and sticky headers.

The project remains intentionally framework-free. These improvements are frontend quality controls, not a replacement for server-side authentication, authorization, rate limiting or audit persistence.


## Performance Optimization — 2026-11-14 (v1.4.2)

- Runtime performance layer được tinh gọn, giảm callback không cần thiết và gom các cập nhật viewport/scroll bằng requestAnimationFrame.
- Tự nhận diện reduced-motion, thiết bị ít RAM/CPU, Save-Data và mạng 2G để giảm hiệu ứng/rendering cost.
- Tạm dừng visual work khi tab bị ẩn.
- Mobile sử dụng containment/content-visibility cho section lớn để giảm chi phí layout/paint ban đầu.
- Giảm các hiệu ứng blur/glow/animation nặng trên thiết bị yếu mà không thay đổi trải nghiệm trên máy đủ mạnh.
- Không thêm framework hoặc dependency mới.

\n## Release v1.4.3 — Regression hardening\n\nBản cập nhật tập trung vào độ ổn định cross-page: shared UI runtime, logout ownership, browser fallback, responsive focus/disabled states và reduced-motion. Đây là frontend hardening; không thay thế backend authorization, server-side session hoặc audit persistence.\n\n\n## Visual Refresh v1.4.4\n\nZHosting hiện sử dụng nền **midnight violet / indigo** thay cho nền xanh-cyan cũ. Homepage, Account Center và Admin Center được đồng bộ surface, accent và glow để giao diện thống nhất hơn.\n\nBản này cũng bổ sung một số micro-interaction nhỏ như live clock hook, copy feedback và button feedback; không thêm thư viện bên ngoài.\n\n
- `v1.4.5` — Load & Runtime Cleanup

- `v1.4.6` — Account/Admin Consistency Fixes

- `v1.4.7` — Support Dock Scrollbar Alignment

- `v1.4.8` — Support Dock Polish

- `v1.4.9` — Scroll Navigation Optimization

- `v1.4.10` — Admin Device Gate Runtime Optimization

- `v1.4.11` — Runtime Smoothness Pass: lighter Admin Center interactions, batched config updates, and reduced compositor overhead.


### Support Bubble Scroll Follow
- Zalo và Discord dùng floating bubble dạng tròn với logo thương hiệu.
- Vị trí dock thay đổi nhẹ theo tiến trình cuộn trang để giữ cảm giác bám theo vùng scrollbar.
- Scroll handler dùng requestAnimationFrame và passive listener để hạn chế layout work.
