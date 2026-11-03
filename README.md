# Chùa An Nhiên — Đi chùa online

Bản thử nghiệm game 3D chạy hoàn toàn trên trình duyệt, có thể deploy trực tiếp lên GitHub Pages. Không cần Node.js, backend, database hay build step.

## Chạy local

Vì game dùng JavaScript ES modules, hãy chạy qua một static server (không mở `index.html` bằng `file://`). Ví dụ:

```bash
python -m http.server 8000
```

Mở http://localhost:8000

## Deploy GitHub Pages

1. Giải nén ZIP và đưa toàn bộ nội dung bên trong thư mục `chua-online/` lên thư mục gốc của nhánh `main` (hoặc vào thư mục `/docs` nếu cấu hình Pages dùng `/docs`).
2. Vào **Settings → Pages**.
3. Chọn **Deploy from a branch**, branch `main`, folder `/ (root)` rồi Save.
4. Đợi GitHub Actions/Pages publish và mở URL GitHub Pages của repository.

## Điều khiển

- WASD hoặc phím mũi tên: di chuyển.
- Kéo chuột: xoay góc nhìn.
- Cuộn chuột: zoom.
- Nút hoạt động: lễ Phật, thiền định, lần tràng hạt, dâng hương, thỉnh chuông.
- Nút tên nhân vật: đổi pháp danh.
- Điện thoại: dùng cụm phím điều hướng ở góc dưới trái.

## Ghi chú

- Three.js và OrbitControls được tải từ jsDelivr CDN; cần internet khi mở game.
- Đây là bản demo frontend: số người online, điểm, hoa sen và nhiệm vụ được mô phỏng cục bộ trong trình duyệt; chưa có multiplayer thật, lưu tài khoản hay đồng bộ giữa thiết bị.
- Điểm công đức chỉ là điểm trong trò chơi, không đại diện cho công đức hay việc tu tập ngoài đời thực.
- Mã nguồn và mô hình cảnh được tạo riêng cho bản demo, lấy cảm hứng từ ảnh tham khảo; không sử dụng mã nguồn hoặc tài nguyên độc quyền của game khác.
