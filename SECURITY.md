# ZHosting Security Policy

## 1. Phạm vi

Repository này là một website static chạy trên GitHub Pages với authentication/demo dashboard phía client.

## 2. Security controls hiện tại

- Content Security Policy metadata.
- Strict Referrer Policy.
- PBKDF2-HMAC-SHA-256 với random salt cho demo password record.
- Migration từ hash format cũ.
- Session idle timeout.
- Absolute session timeout.
- Client-side login throttling.
- Safe DOM construction.
- CodeQL JavaScript workflow.
- Static security audit.
- Security policy và `.well-known/security.txt`.

## 3. Threat model

Các rủi ro chính của mô hình hiện tại:

| Rủi ro | Trạng thái |
|---|---|
| XSS do dynamic HTML | Đã giảm bằng safe DOM APIs |
| Dangerous JS APIs | Static audit |
| Password plaintext | Không sử dụng trong password record mới |
| Browser storage theft | Vẫn tồn tại do frontend-only |
| Session spoofing | Vẫn tồn tại trong frontend demo |
| Server-side authorization | Chưa có |
| Real rate limiting | Chưa có |
| HttpOnly cookies | Chưa có |
| MFA | Chưa có |

## 4. Giới hạn quan trọng

Đây **không phải production authentication system**.

Client-side JavaScript không thể cung cấp cùng mức bảo vệ như:

- HttpOnly cookies.
- Secure cookies.
- Server-side session invalidation.
- Database authorization.
- Server-side rate limiting.
- Secret management.
- Trusted backend validation.

Không lưu:

- Password thật.
- API key.
- Access token.
- Payment card.
- Private customer data.
- Production database credentials.

## 5. Báo cáo lỗ hổng

Không công khai PoC nhạy cảm trong issue nếu có nguy cơ khai thác.

Ưu tiên:

1. GitHub Security Advisory khi khả dụng.
2. Liên hệ maintainer qua kênh phù hợp.
3. Cung cấp bước tái hiện tối thiểu.
4. Nêu impact rõ ràng.
5. Không gửi secret thật.

Security contact:

https://github.com/ZinGodBoy/ZHosting/security/advisories/new

## 6. Disclosure

Sau khi xác nhận:

- Reproduce.
- Đánh giá mức độ ảnh hưởng.
- Patch.
- Test regression.
- Publish advisory/changelog nếu cần.

## 7. Production roadmap

Production authentication nên chuyển sang:

```text
Browser
  ↓ HTTPS
Backend API
  ↓
Server-side Session
  ↓
Database
  ↓
Authorization / Audit / Rate Limit
```

Mật khẩu nên được hash bằng thuật toán password hashing được server-side framework/provider hỗ trợ, có salt và policy phù hợp.

## 8. Security principle

> Demo frontend có thể được harden, nhưng không nên giả định nó có khả năng bảo vệ dữ liệu production.
