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
- Tài khoản đầu tiên trong demo được đánh dấu `admin` nếu chưa có admin.
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
