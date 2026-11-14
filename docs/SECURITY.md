

## Admin device enrollment policy

Admin Device Gate không còn tự động đăng ký một browser mới cho tài khoản admin. Browser phải có trusted public-key fingerprint đã tồn tại; nếu không, Admin Center navigation bị ẩn và route guard từ chối truy cập. Điều này tránh việc một thiết bị lạ có thể tự claim binding chỉ vì local record chưa có fingerprint.
# Security Notes

This document is a concise security overview for the current ZHosting frontend prototype.

## Current implementation

- Content Security Policy metadata.
- Referrer Policy.
- PBKDF2-HMAC-SHA-256 password records with per-user random salt for new demo accounts.
- Automatic migration from the legacy SHA-256 demo format after successful login.
- Session idle timeout and absolute timeout.
- Client-side login throttling.
- Safe DOM construction for dynamic account and notification UI.
- CodeQL workflow.
- Static security audit.

## Important limitation

Authentication and authorization are still performed in the browser for demonstration purposes.

Browser storage is **not a trusted security boundary**. A malicious script running in the same origin may access client-side state.

Do not store production:

- passwords,
- access tokens,
- API keys,
- payment information,
- private customer data.

## Production requirements

Before real customer accounts are supported, move authentication and authorization to a backend with:

- server-side sessions,
- HttpOnly + Secure + SameSite cookies,
- server-side authorization,
- rate limiting,
- password reset and email verification,
- MFA where appropriate,
- audit logging,
- database-backed identity and permissions.

See [SECURITY.md](../SECURITY.md) and [AUTHENTICATION.md](AUTHENTICATION.md) for the complete security model.


## Admin audit telemetry

Admin Center có audit telemetry phía client cho prototype:

- register
- login_success
- login_failed

Audit chỉ lưu metadata cần cho giao diện quản trị demo như thời gian, email/user ID, thiết bị và trình duyệt. Không ghi password, password hash hoặc salt.

> localStorage vẫn không phải security boundary. Audit log client-side có thể bị sửa/xóa bởi người có quyền trên trình duyệt. Production cần audit log server-side, append-only hoặc tamper-resistant, cùng RBAC ở backend.

## Admin action auditing

Các thao tác quản trị nhạy cảm trong prototype được ghi audit event:

- `admin_lock`
- `admin_unlock`
- `admin_revoke_session`

Audit chứa admin ID/email và target ID/email cùng thời điểm thao tác; không chứa password hoặc credential material.

Đây là telemetry phía client. Không xem `localStorage` là vùng tin cậy. Production cần chuyển authorization, session management và audit log sang backend.


## Security hardening — 2026-11-14

### Authentication

- Password policy mới: tối thiểu 12 ký tự cho register và change-password.
- Guard state được validate khi đọc từ sessionStorage; dữ liệu hỏng được reset an toàn.
- User/session storage parsing có failure recovery thay vì để JSON lỗi phá auth flow.
- Locked accounts bị chặn trước password verification và ghi nhận login_failed với reason nội bộ.

### Admin export

- CSV export escape dấu ngoặc kép đúng chuẩn.
- Dòng CSV dùng newline thật thay vì chuỗi escape.
- Các trường bắt đầu bằng =, +, -, @ được prefix apostrophe để giảm rủi ro formula injection khi mở bằng spreadsheet.

Các biện pháp trên chỉ harden prototype. Không thay thế backend authorization, server-side rate limiting hoặc trusted audit logging.


### Logout audit — 2026-11-14

- Explicit logout được ghi nhận bằng audit event logout nếu có session hợp lệ.
- Event chỉ lưu email tham chiếu; không lưu password, token hoặc session secret.


## Latest hardening pass

The 2026-11-14 hardening pass adds malformed-storage recovery, stronger password-change rules, session revocation after credential changes, explicit logout audit events, and safer navigation state handling. These controls improve the demo but do not turn localStorage into a trusted security boundary.

For production deployment, authentication must move to a backend with server-side password verification, HttpOnly/Secure/SameSite cookies or equivalent protected tokens, server-side session revocation, rate limiting, RBAC enforcement, and tamper-resistant audit logging.


## Admin device binding

Admin Center hiện có lớp bảo vệ phía trình duyệt: tài khoản admin được bind với một khóa ECDSA P-256 lưu trong IndexedDB, trong đó private key được lưu dưới dạng non-extractable. Navigation và route guard chỉ cho phép Admin Center khi public-key fingerprint khớp với trusted device đã đăng ký.

Đây là lớp bảo vệ frontend cho bản demo static/localStorage. Không xem nó là boundary bảo mật tuyệt đối: authorization thật phải được enforce ở backend/server-side. OWASP khuyến nghị không dùng client-side checks hoặc hidden UI làm cơ chế authorization quyết định. Khi chuyển sang production, cần server-side session, role/permission policy và device binding phía server.


## Admin account visibility policy — 2026-11-14

- Admin Center được phép hiển thị thông tin tài khoản cần cho vận hành như tên, email, trạng thái, vai trò, lịch sử đăng nhập, thiết bị/trình duyệt và IP **chỉ khi hệ thống xác thực đã cung cấp trường IP hợp lệ**.
- Repository frontend hiện là prototype localStorage nên không thể biết IP public thật của các thiết bị khác một cách đáng tin cậy. Không dùng API IP bên thứ ba để giả lập dữ liệu quản trị.
- Mật khẩu plaintext, password hash và salt không được hiển thị trong Admin Center và không được đưa vào CSV export.
- Muốn quản trị IP/session của mọi thiết bị thật sự cần backend/server-side authentication, session store và audit log.
