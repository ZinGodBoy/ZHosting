# AI_LOG — ZHosting

> Nhật ký minh bạch về việc sử dụng AI trong quá trình phát triển repository.

## 1. Mục đích

AI được sử dụng như một **trợ lý kỹ thuật** cho các công việc:

- Phân tích cấu trúc giao diện và UX.
- Gợi ý architecture cho frontend.
- Sinh bản nháp HTML/CSS/JavaScript.
- Refactor và chuẩn hóa UI.
- Rà soát các lỗi logic dễ gặp.
- Gợi ý hardening bảo mật phía frontend.
- Viết và cải thiện tài liệu kỹ thuật.

AI không được xem là nguồn xác nhận cuối cùng cho các vấn đề bảo mật, pháp lý, giá dịch vụ hoặc tuyên bố hạ tầng thực tế.

## 2. Các nhóm thay đổi có AI hỗ trợ

| Nhóm | AI hỗ trợ | Người thực hiện kiểm tra |
|---|---|---|
| Landing page | Có | Có |
| UI/UX | Có | Có |
| Animation | Có | Có |
| Authentication demo | Có | Có |
| Dashboard | Có | Có |
| Security hardening | Có | Có |
| Documentation | Có | Có |
| Production backend | Chưa triển khai | Cần thiết kế riêng |

## 3. Nguyên tắc sử dụng

1. AI chỉ tạo đề xuất hoặc bản nháp.
2. Mã nguồn phải được đọc và hiểu trước khi giữ lại.
3. Không đưa secret, API key, credential hoặc dữ liệu khách hàng vào prompt.
4. Không xem output AI là bằng chứng rằng hệ thống đã an toàn tuyệt đối.
5. Các claim production phải được kiểm chứng bằng môi trường thật.
6. Security finding phải được đánh giá lại bằng tooling chuyên dụng.

## 4. Quy trình kiểm tra thay đổi do AI hỗ trợ

### Trước khi commit

- Đọc diff.
- Kiểm tra đường dẫn asset.
- Kiểm tra responsive.
- Kiểm tra console error.
- Kiểm tra auth/session flow.
- Kiểm tra CSP.
- Chạy static security audit.

### Sau khi commit

- Theo dõi GitHub Actions.
- Kiểm tra CodeQL.
- Kiểm tra GitHub Pages.
- Re-test các luồng quan trọng.

## 5. Trách nhiệm của người phát triển

Người duy trì repository chịu trách nhiệm cuối cùng về:

- Tính đúng của nội dung.
- Chất lượng mã nguồn.
- Security review.
- Tính chính xác của tài liệu.
- Kiểm thử trước khi publish.
- Việc không sử dụng demo auth cho dữ liệu thật.

## 6. Giới hạn của AI

AI có thể:

- Bỏ sót context.
- Đề xuất API chưa phù hợp.
- Không nhìn thấy lỗi chỉ xuất hiện trong browser/CI.
- Đánh giá sai threat model nếu thiếu môi trường thật.

Vì vậy, AI không thay thế:

- Code review.
- Browser testing.
- Dependency review.
- Threat modeling.
- Penetration testing.
- Production observability.

## 7. Kết luận

AI giúp tăng tốc quá trình xây dựng ZHosting, nhưng chất lượng cuối cùng phụ thuộc vào việc **đọc hiểu, kiểm thử, kiểm chứng và chịu trách nhiệm của người phát triển**.
