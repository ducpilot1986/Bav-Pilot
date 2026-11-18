# BAV PILOT – Hướng dẫn đưa lên mạng và cài vào iPhone/iPad

## 1. Đưa lên Netlify (miễn phí, khoảng 2 phút)
1. Giải nén file `bav-pilot-pwa.zip` ra một thư mục.
2. Mở https://app.netlify.com/drop trên máy tính (đăng nhập bằng email hoặc Google).
3. Kéo **cả thư mục** vào trang đó, chờ khoảng 1 phút → Netlify cấp một link dạng `https://ten-ngau-nhien.netlify.app`.
4. (Tuỳ chọn) Site settings → Change site name → đặt tên, ví dụ `bav-pilot` → link thành `https://bav-pilot.netlify.app`.

File `_headers` trong gói đã cấu hình đúng MIME type cho manifest và không cho trình duyệt giữ bản cũ của `sw.js`, `index.html`.

## 2. Thêm vào màn hình chính
**iPhone/iPad (Safari):** mở link → nút Chia sẻ → "Thêm vào MH chính" → tên hiện sẵn **BAV PILOT** → Thêm.
**Android (Chrome):** mở link → menu ⋮ → "Cài đặt ứng dụng".

## 3. Danh sách kiểm tra trên máy thật
- [ ] Icon trên màn hình chính là logo BAV PILOT, không bị cắt, không viền trắng.
- [ ] Tên dưới icon là "BAV PILOT".
- [ ] Mở từ icon: không có thanh địa chỉ Safari, thanh trạng thái hoà vào nền tối.
- [ ] Splash: radar quét, máy bay bay vào, chữ BAV ánh kim, PILOT hiện sau, khoảng 2,6 giây rồi vào trang bìa. Chạm để bỏ qua.
- [ ] Trang bìa và nút Cleared for Takeoff → trang 2 vẫn chạy như trước.
- [ ] Xoay ngang iPad: bố cục vẫn đẹp.
- [ ] Bật chế độ máy bay, mở lại app: vẫn mở được (bản đã lưu) hoặc hiện trang "Không có kết nối".

## 4. Khi đổi logo/icon về sau
1. Thay file trong `icons/` và `branding/`.
2. Tăng số phiên bản: `?v=1` → `?v=2` trong `index.html`, `manifest.json`, `sw.js`, và `CACHE_VERSION = 'bav-pilot-v2'` trong `sw.js`.
3. Kéo thả lại lên Netlify (Deploys → kéo thư mục mới vào).
4. Trên iPhone: icon màn hình chính được lưu lúc thêm, nên cần **xoá icon cũ và thêm lại** để thấy icon mới.

## 5. Ghi chú
- Splash chỉ hiện lần đầu mỗi phiên mở app; mở lại sau khi tắt hẳn app sẽ hiện lại.
- Máy bật "Giảm chuyển động" sẽ thấy logo tĩnh, không có hiệu ứng.
- Icon màn hình chính trên iOS luôn là ảnh tĩnh; hiệu ứng chỉ chạy bên trong app.
