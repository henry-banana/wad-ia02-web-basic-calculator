# WAD IA02 - Web Basic Calculator - 23120262 - Tống Dương Thái Hòa

Ứng dụng **Web-Based Calculator** mô phỏng **Windows 11 Calculator (Basic Mode)**, được xây dựng bằng **React + Vite**.

## 📋 Mô tả

Đây là một ứng dụng máy tính web có đầy đủ chức năng, giao diện giống Windows 11 Calculator với:

- ✨ Giao diện đẹp mắt, hiện đại
- 🌓 Hỗ trợ chế độ Dark/Light Mode
- 📜 Lưu lịch sử tính toán (History)
- 🍔 Menu Hamburger với nhiều chế độ
- 💾 Lưu trữ dữ liệu với localStorage
- 📱 Responsive trên mọi thiết bị
- 🧪 Đầy đủ unit tests và integration tests

## 🚀 Công nghệ sử dụng

- **React 19** - Thư viện UI
- **Vite 7** - Build tool & dev server
- **CSS-in-JS** - Styling với styled-jsx
- **localStorage** - Lưu trữ history và theme
- **Vitest** - Testing framework
- **Testing Library** - React component testing

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

### ✅ Checklist Trước Khi Chạy

- [ ] Đã cài Node.js >= 18.0.0
- [ ] Đã có npm hoặc yarn
- [ ] Đang ở đúng thư mục dự án
- [ ] Đã chạy `npm install`

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

### Chạy tests
```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

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

### Tính toán cơ bản
1. Click các số để nhập
2. Click phép toán (+, −, ×, ÷)
3. Click số tiếp theo
4. Click `=` để xem kết quả

### Các phím xóa
- **CE**: Xóa số hiện tại (Clear Entry)
- **C**: Xóa toàn bộ (Clear All)
- **⌫**: Xóa ký tự cuối (Backspace)

### Xem lịch sử
1. Click icon 🕐 ở góc phải trên
2. Panel History sẽ hiển thị
3. Click vào một item để sử dụng lại kết quả

### Chuyển đổi theme
1. Click icon ☰ ở góc trái trên để mở menu
2. Click nút ở dưới cùng menu để chuyển Dark/Light mode

### Xóa lịch sử
1. Mở History Panel
2. Click nút 🗑️ Clear history

## 🧪 Testing

Dự án sử dụng automated tests với **Vitest** và **Testing Library (React)** để kiểm tra logic tính toán và tương tác UI.

### Testing Framework
- **Method**: Automated unit tests (logic) + integration tests (UI interactions)
- **Frameworks**: Vitest, @testing-library/react, @testing-library/user-event, jsdom
- **Scope**:
  - Logic operations: +, −, ×, ÷ (bao gồm chia cho 0), percent, √, x², 1/x, negate
  - Formatting: thousands separators, decimal point, scientific notation
  - UI flows: button clicks, arithmetic operations, unary operations, history

### Test Files
- Logic tests: `tests/unit/logic/calculatorLogic.test.js`
- UI tests: `tests/integration/components/Calculator.test.jsx`
- Setup: `vitest.setup.js`, `vite.config.js` (test section)

### Test Cases Summary

Tất cả test cases đã được automated và PASS (24/24 tests):

| Feature | Input | Expected Output | Actual Output | Result |
|---------|-------|-----------------|---------------|--------|
| Addition | 2 + 3 = | 5 | 5 | ✅ |
| Subtraction | 5 − 7 = | −2 | −2 | ✅ |
| Multiplication | 3 × 4 = | 12 | 12 | ✅ |
| Division | 12 ÷ 4 = | 3 | 3 | ✅ |
| Division by zero | 1 ÷ 0 = | Error | Error | ✅ |
| Percent (entry) | 10 % | 0.1 | 0.1 | ✅ |
| Percent (entry) | 1,000 % | 10 | 10 | ✅ |
| Square root | √9 | 3 | 3 | ✅ |
| Square root (neg) | √(−1) | Error | Error | ✅ |
| Square | (1.5)² | 2.25 | 2.25 | ✅ |
| Reciprocal | 1/4 | 0.25 | 0.25 | ✅ |
| Reciprocal (0) | 1/0 | Error | Error | ✅ |
| Negate | ±(5) | −5 | −5 | ✅ |
| Grouping | 1234567.8900 | 1,234,567.89 | 1,234,567.89 | ✅ |
| Scientific large | 10000000000 | 1.0000000000e10 | 1.0000000000e10 | ✅ |
| Scientific small | 0.0000000009 | 9.0000000000e−10 | 9.0000000000e-10 | ✅ |
| Operator precedence | 12 + 3 × 2 = | 18 | 18 | ✅ |
| UI flow | 2 + 3 = | 5 on display | 5 | ✅ |
| UI unary | 9 → √ | 3 on display | 3 | ✅ |
| UI percent | 10 → % | 0.1 on display | 0.1 | ✅ |
| UI grouping | type 1000 | 1,000 on display | 1,000 | ✅ |
| UI scientific | type 0.0000000001 | e− notation | e− notation | ✅ |
| History | after 2 × 3 =, select | 6 restored | 6 | ✅ |

### Quality Gates
- ✅ Build: PASS (vite build)
- ⚠️ Lint: PASS (1 warning on React hook deps, no errors)
- ✅ Tests: PASS (24/24 tests)

### Manual Testing (Optional)
- Keyboard input: numbers, ., +−×÷, %, =/Enter, Backspace/Delete, Escape
- Mobile overlays: history toggle open/close
- Theme toggle via hamburger menu
- Responsive design on different screen sizes

## 📝 Ghi chú

- Ứng dụng hỗ trợ thứ tự ưu tiên toán tử (× và ÷ trước + và −)
- Lịch sử được lưu tối đa 50 phép tính gần nhất
- Theme preference được lưu và tự động áp dụng khi quay lại
- Chia cho 0 sẽ hiển thị "Error"
- Căn bậc hai của số âm sẽ hiển thị "Error"

## � Chi Tiết Cải Tiến

### 1. Kiến trúc & Cấu trúc
- ✅ **Tách biệt components**: Tất cả components được tách riêng thành file độc lập
- ✅ **Logic riêng biệt**: Logic tính toán được tách ra `calculatorLogic.js`
- ✅ **Cấu trúc rõ ràng**: Thư mục components/ và logic/ tổ chức khoa học
- ✅ **CSS modular**: Style được viết inline với styled-jsx tránh conflict

### 2. Chức năng tính toán
- ✅ **Operator precedence**: Thứ tự ưu tiên toán tử (× và ÷ trước + và −)
- ✅ **Error handling**: Xử lý lỗi chia cho 0, căn bậc hai số âm
- ✅ **Number formatting**: Format số tự động với exponential notation
- ✅ **Các hàm nâng cao**:
  - `calculatePercent()` - Tính phần trăm
  - `calculateSquareRoot()` - Căn bậc hai
  - `calculateSquare()` - Bình phương
  - `calculateReciprocal()` - Nghịch đảo (1/x)
  - `negate()` - Đổi dấu

### 3. Giao diện người dùng
- ✅ **Dark/Light Mode**: Chuyển đổi theme mượt mà
- ✅ **Responsive Design**: Tự động điều chỉnh trên mọi thiết bị
- ✅ **Smooth transitions**: Hiệu ứng chuyển đổi mượt mà
- ✅ **Windows 11 style**: Thiết kế sát với Windows 11 Calculator
- ✅ **Hover effects**: Hiệu ứng hover cho tất cả buttons
- ✅ **Active states**: Visual feedback khi click buttons

### 4. History & Storage
- ✅ **localStorage integration**: Lưu history và theme preference
- ✅ **History Panel**: Panel riêng hiển thị lịch sử
- ✅ **Click to reuse**: Click vào history item để sử dụng lại
- ✅ **Clear history**: Nút xóa toàn bộ lịch sử
- ✅ **Limit history**: Giới hạn 50 items gần nhất

### 5. Menu & Navigation
- ✅ **Hamburger Menu**: Menu slide-in từ trái
- ✅ **Mode selection**: Chọn các chế độ khác nhau
- ✅ **Converters**: Danh sách các converters (sẽ phát triển)
- ✅ **Settings**: Mục settings trong menu
- ✅ **Theme toggle**: Nút chuyển theme trong menu
- ✅ **Menu overlay**: Overlay tối khi mở menu

### 6. UI/UX Details

#### Colors & Theming
**Dark Mode:**
- Background: `#202020`
- Button: `#3b3b3b`
- Accent: `#60cdff`

**Light Mode:**
- Background: `#f3f3f3`
- Button: `#f9f9f9`
- Border: `#e0e0e0`

#### Typography
- Font: `Segoe UI, system-ui, -apple-system`
- Display value: `48px`, weight `600`
- Expression: `14px`, opacity `0.6`
- Button text: `18px`, weight `500`

#### Layout
- Grid-based keypad: `4 columns × 6 rows`
- Memory buttons: `6 columns × 1 row`
- Responsive breakpoint: `768px`
- History panel: `320px` width

#### Animations
- Transitions: `0.2s` ease
- Hover: `brightness(1.1)`
- Active: `scale(0.95)`
- Menu slide: `0.3s` ease-in-out

### 7. Code Quality
- ✅ **Clean code**: Code sạch, dễ đọc, có comments
- ✅ **Reusable components**: Components có thể tái sử dụng
- ✅ **Props validation**: Sử dụng props đúng cách
- ✅ **Event handling**: Xử lý events hiệu quả
- ✅ **Performance**: Tối ưu re-renders

### 8. React Best Practices
- ✅ Functional components với hooks
- ✅ Proper useEffect dependencies
- ✅ Memoization where needed
- ✅ Clean component hierarchy
- ✅ Minimal re-renders
- ✅ Efficient state updates

### 9. Browser Support
- Modern browsers (Chrome, Edge, Firefox, Safari)
- CSS Grid & Flexbox
- localStorage API
- ES6+ features

## �🐛 Known Issues

- Memory buttons (MC, MR, M+, M−, MS, M∨) chưa được implement
- Keyboard support chưa được triển khai đầy đủ
- Chỉ có mode Standard hoạt động, các mode khác đang phát triển

## 🎯 Roadmap

### Phase 2 - Enhancements
- [ ] Memory functions (MC, MR, M+, M−, MS)
- [ ] Full keyboard support
- [ ] History export/import
- [ ] More themes
- [ ] Font selection in Settings

### Phase 3 - Advanced Modes
- [ ] Scientific mode implementation
- [ ] Programmer mode
- [ ] Date calculation
- [ ] Currency converter
- [ ] Unit converters (Volume, Length, etc.)

### Phase 4 - Polish
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] PWA support
- [ ] Offline functionality

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập và phát triển.

## 👨‍💻 Tác giả

Dự án được phát triển cho môn học Web Application Development - IA02

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc Issue nếu bạn có ý tưởng cải tiến.

## 📱 Screenshots Preview

Sau khi chạy, bạn sẽ thấy:
- ✨ Giao diện calculator giống Windows 11
- 🌓 Theme dark mặc định (có thể chuyển sang light)
- 📊 History panel bên phải (click 🕐 để mở)
- 🍔 Hamburger menu bên trái (click ☰ để mở)

## 🚀 Production Ready

Dự án hiện tại đã:
- ✅ Có đầy đủ chức năng cơ bản
- ✅ Code sạch và có cấu trúc
- ✅ UI/UX hoàn thiện
- ✅ Responsive design
- ✅ Error handling
- ✅ Documentation đầy đủ
- ✅ Test coverage tốt
- ✅ Build configuration
- ✅ Ready to deploy

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập và phát triển.

## 👨‍💻 Tác giả

Dự án được phát triển cho môn học Web Application Development - IA02 bởi 23120262

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo Pull Request hoặc Issue nếu bạn có ý tưởng cải tiến.