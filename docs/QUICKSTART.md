# 🚀 HƯỚNG DẪN CHẠY NHANH

## 📦 Bước 1: Cài đặt Dependencies

Mở terminal tại thư mục dự án và chạy:

```bash
npm install
```

## ▶️ Bước 2: Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:5173**

## 🏗️ Bước 3: Build cho Production (Optional)

```bash
npm run build
```

Kết quả sẽ được tạo trong thư mục `/dist`

## 👀 Bước 4: Preview Build (Optional)

```bash
npm run preview
```

---

## ✅ Checklist Trước Khi Chạy

- [ ] Đã cài Node.js >= 18.0.0
- [ ] Đã có npm hoặc yarn
- [ ] Đang ở đúng thư mục dự án
- [ ] Đã chạy `npm install`

---

## 🎮 Hướng Dẫn Sử Dụng Nhanh

### Tính toán cơ bản
1. Click các số để nhập
2. Click phép toán (+, −, ×, ÷)
3. Click số tiếp theo
4. Click `=` để xem kết quả

### Xem lịch sử
- Click icon 🕐 ở góc phải trên

### Đổi theme
1. Click icon ☰ ở góc trái trên
2. Click nút ở dưới cùng menu

### Xóa
- **CE**: Xóa số hiện tại
- **C**: Xóa toàn bộ
- **⌫**: Xóa ký tự cuối

---

## 🎯 Các Tính Năng Chính

✅ **Phép toán cơ bản**: +, −, ×, ÷  
✅ **Hàm nâng cao**: %, √, x², 1/x, ±  
✅ **Lịch sử**: Lưu và xem lại  
✅ **Dark/Light Mode**: Chuyển đổi theme  
✅ **Responsive**: Hoạt động trên mọi thiết bị  

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Lỗi: Port đã được sử dụng
Vite sẽ tự động chọn port khác (5174, 5175, ...)

### Lỗi: Build failed
```bash
npm run lint
# Fix các lỗi ESLint nếu có
```

---

## 📱 Screenshots Preview

Sau khi chạy, bạn sẽ thấy:
- ✨ Giao diện calculator giống Windows 11
- 🌓 Theme dark mặc định (có thể chuyển sang light)
- 📊 History panel bên phải (click 🕐 để mở)
- 🍔 Hamburger menu bên trái (click ☰ để mở)

---

## 🎉 Enjoy!

Nếu gặp vấn đề, hãy kiểm tra:
1. README.md - Hướng dẫn chi tiết
2. IMPROVEMENTS.md - Chi tiết các cải tiến
3. Console log trong browser
4. Terminal output

**Happy Calculating! 🧮**
