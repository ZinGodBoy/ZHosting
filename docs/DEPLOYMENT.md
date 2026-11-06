# ZHosting Deployment

## 1. GitHub Pages

ZHosting hiện phù hợp với GitHub Pages vì frontend là static.

### Thiết lập

1. Push lên branch `main`.
2. Vào **Settings → Pages**.
3. Chọn **Deploy from a branch**.
4. Branch: `main`.
5. Folder: `/(root)`.
6. Save.
7. Kiểm tra generated Pages URL.

## 2. Local preview

VS Code + Live Server là lựa chọn đơn giản.

Hoặc:

```bash
npx serve .
```

## 3. Pre-deploy checklist

- [ ] Homepage mở được.
- [ ] 404 page hoạt động.
- [ ] Login page mở được.
- [ ] Register page mở được.
- [ ] Dashboard redirect đúng.
- [ ] Logout redirect đúng.
- [ ] CSS/JS relative paths đúng.
- [ ] Font load bình thường.
- [ ] CSP không block tài nguyên cần thiết.
- [ ] Security workflow pass.

## 4. Production backend

Khi có backend, kiến trúc deploy nên tách:

```text
CDN / Pages
    │
    ├── Public frontend
    │
    ▼
Backend API
    │
    ├── Auth
    ├── Services
    ├── Billing
    └── Monitoring
        │
        ▼
     Database
```

## 5. Secrets

Không đặt secret trong:

- HTML.
- CSS.
- Browser JavaScript.
- Git history.
- README.
- Public configuration.

Dùng secret manager hoặc CI secret storage khi backend tồn tại.

## 6. Rollback

Nếu deployment mới gây lỗi:

1. Xác định commit cuối cùng hoạt động.
2. Kiểm tra diff.
3. Revert commit lỗi hoặc rollback deployment.
4. Chạy lại security/functional checks.
5. Publish changelog nếu behavior thay đổi.
