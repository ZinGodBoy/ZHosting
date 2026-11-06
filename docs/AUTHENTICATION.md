# ZHosting Authentication

## 1. Phạm vi

Authentication hiện tại là **frontend demo**.

Mục tiêu của implementation:

- Trình diễn UX login/register.
- Thực hành browser storage.
- Trình diễn password derivation.
- Trình diễn session lifecycle.

Không phải hệ thống identity production.

## 2. Register flow

```text
Register
   ↓
Validate input
   ↓
Generate random salt
   ↓
PBKDF2-HMAC-SHA-256
   ↓
Store demo user record
   ↓
Create session
   ↓
Dashboard
```

## 3. Password record

Demo user mới có dạng khái niệm:

```json
{
  "algorithm": "PBKDF2-SHA256",
  "iterations": 600000,
  "salt": "<random>",
  "hash": "<derived>"
}
```

Password plaintext không được lưu vào user record mới.

## 4. Migration

Các account cũ có field `passwordHash` từ implementation trước sẽ:

1. Verify bằng legacy format.
2. Nếu thành công, derive PBKDF2 record mới.
3. Xóa legacy `passwordHash`.
4. Lưu user record mới.

## 5. Session

Demo session gồm:

- ID.
- Email.
- issuedAt.
- lastActivity.

Có:

- Idle timeout.
- Absolute timeout.
- Tab/session handling.
- Logout.
- Session guard.

## 6. Login throttling

Frontend demo giới hạn số lần login sai trong session của browser.

Đây chỉ là defense-in-depth.

Nó **không thay thế server-side rate limiting**.

## 7. Dashboard authorization

Dashboard kiểm tra session trước khi render dữ liệu.

Tuy nhiên vì validation nằm trong browser, người dùng vẫn có thể sửa client state.

Do đó đây không phải server-side authorization.

## 8. Production migration

Production nên chuyển sang:

```text
Browser
  ↓ HTTPS
Backend Auth
  ↓
Server-side Session
  ↓
HttpOnly + Secure + SameSite cookie
  ↓
Database
```

Cần bổ sung:

- Email verification.
- Password reset.
- MFA.
- Rate limiting.
- Account lock policy.
- Audit log.
- Server-side authorization.


## Password visibility control — 2026-11-06

Login/Register sử dụng control hiển thị mật khẩu dùng chung với icon mắt, nhãn `Hiện`/`Ẩn`, `aria-controls`, `aria-label`, `title` và giữ focus sau khi đổi kiểu input. Logic được bind tập trung trong `assets/js/ui.js`.


## Admin navigation — 2026-11-06

Account Center có thể hiển thị entry `Admin Center` dựa trên role của user hiện tại. Đây chỉ là UX guard phía client; quyền quản trị thực tế phải được kiểm tra lại ở backend trước mọi thao tác nhạy cảm.
