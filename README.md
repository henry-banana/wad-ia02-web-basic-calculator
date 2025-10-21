# WAD IA02 - Web Basic Calculator

Ứng dụng **Web-Based Calculator** mô phỏng **Windows 11 Calculator (Basic Mode)**, được xây dựng bằng **React + Vite**.

## 📋 Mô tả

Đây là một ứng dụng máy tính web có đầy đủ chức năng, giao diện giống Windows 11 Calculator với:

- ✨ Giao diện đẹp mắt, hiện đại
- 🌓 Hỗ trợ chế độ Dark/Light Mode
- 📜 Lưu lịch sử tính toán (History)
- 🍔 Menu Hamburger với nhiều chế độ
- 💾 Lưu trữ dữ liệu với localStorage
- 📱 Responsive trên mọi thiết bị

## 🚀 Công nghệ sử dụng

- **React 19** - Thư viện UI
- **Vite 7** - Build tool & dev server
- **CSS-in-JS** - Styling với styled-jsx
- **localStorage** - Lưu trữ history và theme

## 📁 Cấu trúc thư mục

```
wad-ia02-web-basic-calculator/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ Button.jsx              # Component nút bấm
│  │  ├─ Display.jsx             # Component màn hình hiển thị
│  │  ├─ Calculator.jsx          # Component chính
│  │  ├─ HistoryPanel.jsx        # Panel lịch sử
│  │  └─ HamburgerMenu.jsx       # Menu hamburger
│  ├─ logic/
│  │  └─ calculatorLogic.js      # Logic tính toán
│  ├─ App.jsx                     # Root component
│  ├─ App.css                     # App styles
│  ├─ index.css                   # Global styles
│  └─ main.jsx                    # Entry point
├─ index.html
├─ vite.config.js                 # Vite configuration
└─ package.json
```

## 🛠️ Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository hoặc tải source code
2. Di chuyển vào thư mục dự án:
```bash
cd wad-ia02-web-basic-calculator
```

3. Cài đặt dependencies:
```bash
npm install
```

## 🎮 Chạy ứng dụng

### Development mode
```bash
npm run dev
```
Sau đó mở trình duyệt tại: `http://localhost:5173`

### Build cho production
```bash
npm run build
```
Kết quả build sẽ nằm trong thư mục `/dist`

### Preview build
```bash
npm run preview
```

### Chạy test (nếu có)
```bash
npm run test
```

## ✨ Tính năng

### Chức năng cơ bản
- ✅ Các phép toán: `+`, `−`, `×`, `÷`
- ✅ Nhập số từ 0-9 và dấu thập phân `.`
- ✅ Phần trăm `%`
- ✅ Căn bậc hai `√`
- ✅ Bình phương `x²`
- ✅ Nghịch đảo `1/x`
- ✅ Đổi dấu `±`
- ✅ Xóa: `CE` (Clear Entry), `C` (Clear All)
- ✅ Backspace `⌫`

### Tính năng nâng cao
- ✅ **History Panel**: Lưu và xem lại lịch sử tính toán
- ✅ **Dark/Light Mode**: Chuyển đổi giao diện sáng/tối
- ✅ **Hamburger Menu**: Menu với các chế độ khác nhau
- ✅ **Responsive**: Tự động điều chỉnh theo màn hình
- ✅ **localStorage**: Lưu history và theme preference

### Các chế độ (Modes)
- ✅ **Standard** (Đang hoạt động)
- ⏳ **Scientific** (Coming soon)
- ⏳ **Graphing** (Coming soon)
- ⏳ **Programmer** (Coming soon)
- ⏳ **Date calculation** (Coming soon)

### Converters (Coming soon)
- ⏳ Currency
- ⏳ Volume
- ⏳ Length

## 📖 Hướng dẫn sử dụng

### Thực hiện phép tính
1. Nhấn các số để nhập
2. Chọn phép toán (+, −, ×, ÷)
3. Nhập số thứ hai
4. Nhấn `=` để xem kết quả

### Xem lịch sử
1. Nhấn icon 🕐 ở góc trên bên phải
2. Panel History sẽ hiển thị
3. Click vào một item để sử dụng lại kết quả

### Chuyển đổi theme
1. Nhấn icon ☰ để mở menu
2. Nhấn nút ở cuối menu để chuyển Dark/Light mode

### Xóa lịch sử
1. Mở History Panel
2. Nhấn nút 🗑️ Clear history

## 🧪 Testing

### Test cases cơ bản

| Input | Expected Output | Status |
|-------|----------------|--------|
| 2 + 3 = | 5 | ✅ |
| 10 − 4 = | 6 | ✅ |
| 3 × 5 = | 15 | ✅ |
| 20 ÷ 4 = | 5 | ✅ |
| √9 | 3 | ✅ |
| 5² | 25 | ✅ |
| 10% | 0.1 | ✅ |
| 1/2 (reciprocal) | 0.5 | ✅ |
| 5 ± | -5 | ✅ |
| 12 + 3 × 2 = | 18 | ✅ |

## 📝 Ghi chú

- Ứng dụng hỗ trợ thứ tự ưu tiên toán tử (× và ÷ trước + và −)
- Lịch sử được lưu tối đa 50 phép tính gần nhất
- Theme preference được lưu và tự động áp dụng khi quay lại
- Chia cho 0 sẽ hiển thị "Error"
- Căn bậc hai của số âm sẽ hiển thị "Error"

## 🐛 Known Issues

- Memory buttons (MC, MR, M+, M−, MS, M∨) chưa được implement
- Keyboard support chưa được triển khai
- Chỉ có mode Standard hoạt động, các mode khác đang phát triển

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập và phát triển.

## 👨‍💻 Tác giả

Dự án được phát triển cho môn học Web Application Development - IA02

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc Issue nếu bạn có ý tưởng cải tiến.

---

**Chúc bạn sử dụng vui vẻ! 🎉**

