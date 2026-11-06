# Contributing to ZHosting

Cảm ơn bạn đã quan tâm đến ZHosting.

## 1. Trước khi bắt đầu

Đọc trước:

- [README](README.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Security](SECURITY.md)
- [Testing](docs/TESTING.md)
- [Design System](docs/DESIGN_SYSTEM.md)

## 2. Nguyên tắc

- Giữ giao diện nhất quán với design system hiện tại.
- Ưu tiên HTML semantic và accessibility.
- Không thêm dependency nếu vanilla HTML/CSS/JS đã đáp ứng được.
- Không commit secret hoặc credential.
- Không dùng dữ liệu khách hàng thật trong demo.
- Không sửa auth/session mà bỏ qua security review.
- Không thêm inline event handler.
- Tránh dynamic HTML injection; ưu tiên DOM APIs và `textContent`.

## 3. Branch

Khuyến nghị:

```text
main
└── feature/<ten-tinh-nang>
└── fix/<ten-loi>
└── docs/<ten-tai-lieu>
└── security/<ten-cai-thien>
```

## 4. Commit

Dùng commit message rõ nghĩa:

```text
feat: add config builder
fix: repair mobile navigation
style: polish dashboard cards
security: harden session handling
docs: update architecture guide
test: add security audit
```

Tránh:

```text
update
fix
changes
abc
final
final2
```

## 5. Pull request

PR nên có:

- Mục tiêu thay đổi.
- Những file chính đã sửa.
- Screenshot nếu thay đổi UI.
- Cách test.
- Security impact nếu có.
- Breaking change nếu có.

## 6. Checklist

- [ ] HTML không lỗi cấu trúc.
- [ ] Responsive desktop.
- [ ] Responsive mobile.
- [ ] Keyboard navigation hoạt động.
- [ ] Không có console error.
- [ ] Không có secret.
- [ ] Static security audit pass.
- [ ] CodeQL không có finding mới.
- [ ] README/docs được cập nhật nếu behavior thay đổi.

## 7. Không sửa trực tiếp

Không commit trực tiếp các file generated hoặc secret local vào repository.

Ví dụ:

```text
.env
.env.local
*.pem
*.key
credentials.json
node_modules/
```

## 8. Code review

Reviewer nên ưu tiên:

1. Correctness.
2. Security.
3. Accessibility.
4. Responsive UX.
5. Maintainability.
6. Performance.

## 9. Scope

ZHosting hiện là frontend prototype. Pull request không nên mô tả các tính năng demo như production backend khi chưa có server-side implementation.
