// Calculator Logic Module
// Hỗ trợ số lớn và số thập phân chính xác bằng decimal.js
import Decimal from 'decimal.js';

// Cấu hình: tăng precision và tránh dùng exponential notation
Decimal.set({ precision: 80, toExpNeg: -1000, toExpPos: 1000, rounding: Decimal.ROUND_HALF_UP });
const THRESHOLD_EXP = new Decimal(10).pow(10); // 1e10 -> hiển thị dạng khoa học
const SMALL_THRESHOLD_EXP = new Decimal(10).pow(-9); // 1e-9 -> hiển thị dạng khoa học
const MAX_PLAIN_LEN = 18; // Nếu chuỗi số dài hơn, chuyển sang e- dạng viết gọn

const stripCommas = (v) => (typeof v === 'string' ? v.replace(/,/g, '') : v);

const toDecimal = (v) => {
  try {
    const s = stripCommas(v);
    if (s === '' || s === '-' || s === '+') return new Decimal(0);
    return new Decimal(s);
  } catch {
    return null;
  }
};

const formatWithGrouping = (input) => {
  // input: string in non-exponential form, may contain '-'
  if (input === 'Error') return input;
  if (typeof input !== 'string') input = String(input);

  // Handle sign
  let sign = '';
  if (input.startsWith('-')) {
    sign = '-';
    input = input.slice(1);
  }

  let [intPart, fracPart] = input.split('.');

  // Add commas to integer part
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Trim trailing zeros in fraction, but keep if significant
  if (fracPart !== undefined) {
    fracPart = fracPart.replace(/0+$/g, '');
    if (fracPart.length > 0) {
      return `${sign}${intPart}.${fracPart}`;
    }
    return `${sign}${intPart}`;
  }
  return `${sign}${intPart}`;
};

export const calculatorLogic = {
  /**
   * Tính toán phép toán cơ bản
   * @param {string|number|Decimal} a - Toán hạng thứ nhất
   * @param {string} operator - Toán tử (+, −, ×, ÷)
   * @param {string|number|Decimal} b - Toán hạng thứ hai
   * @returns {Decimal|string} - Kết quả Decimal hoặc 'Error'
   */
  calculate: (a, operator, b) => {
    const num1 = toDecimal(a);
    const num2 = toDecimal(b);
    if (!num1 || !num2) return 'Error';
    try {
      switch (operator) {
        case '+':
          return num1.plus(num2);
        case '−':
        case '-':
          return num1.minus(num2);
        case '×':
        case '*':
          return num1.times(num2);
        case '÷':
        case '/':
          if (num2.isZero()) return 'Error';
          return num1.div(num2);
        default:
          return num2;
      }
    } catch {
      return 'Error';
    }
  },
  
  /**
   * Format số để hiển thị (phân tách hàng nghìn bằng dấu phẩy, dấu chấm thập phân)
   * @param {Decimal|number|string} num - Số cần format
  * @returns {string} - Số đã được format
   */
  formatNumber: (num) => {
    if (num === 'Error') return num;
    if (num === undefined || num === null) return '0';
    let d = num;
    if (!(d instanceof Decimal)) {
      d = toDecimal(num);
    }
    if (!d) return 'Error';
    // Hiển thị exponential nếu quá lớn (|x| >= 1e10) hoặc quá nhỏ (|x| <= 1e-9 và != 0)
    if (!d.isZero() && (d.abs().gte(THRESHOLD_EXP) || d.abs().lte(SMALL_THRESHOLD_EXP))) {
      // 11 chữ số có nghĩa: 1 + 10 phần thập phân
      const exp = d.toExponential(10).replace('e+', 'e');
      return exp;
    }
    // Nếu chuỗi hiển thị quá dài, cũng chuyển sang e- để gọn lại
    const plain = d.toString();
    if (plain.replace('-', '').replace('.', '').length > MAX_PLAIN_LEN) {
      return d.toExponential(10).replace('e+', 'e');
    }
    // toString không ở dạng exponential nhờ config
    return formatWithGrouping(plain);
  },
  
  /**
   * Tính phần trăm
   * @param {string|number|Decimal} value - Giá trị cần tính %
   * @returns {Decimal|string} - Kết quả hoặc 'Error'
   */
  calculatePercent: (value) => {
    const d = toDecimal(value);
    if (!d) return 'Error';
    return d.div(100);
  },
  
  /**
   * Tính căn bậc hai
   * @param {string|number|Decimal} value - Giá trị cần tính căn
   * @returns {Decimal|string} - Kết quả hoặc 'Error'
   */
  calculateSquareRoot: (value) => {
    const d = toDecimal(value);
    if (!d) return 'Error';
    if (d.isNeg()) return 'Error';
    try { return d.sqrt(); } catch { return 'Error'; }
  },
  
  /**
   * Tính bình phương
   * @param {string|number|Decimal} value - Giá trị cần bình phương
   * @returns {Decimal|string} - Kết quả
   */
  calculateSquare: (value) => {
    const d = toDecimal(value);
    if (!d) return 'Error';
    return d.times(d);
  },
  
  /**
   * Tính nghịch đảo (1/x)
   * @param {string|number|Decimal} value - Giá trị cần tính nghịch đảo
   * @returns {Decimal|string} - Kết quả hoặc 'Error'
   */
  calculateReciprocal: (value) => {
    const d = toDecimal(value);
    if (!d) return 'Error';
    if (d.isZero()) return 'Error';
    return new Decimal(1).div(d);
  },
  
  /**
   * Đổi dấu
   * @param {string|number|Decimal} value - Giá trị cần đổi dấu
   * @returns {Decimal|string} - Kết quả
   */
  negate: (value) => {
    const d = toDecimal(value);
    if (!d) return 'Error';
    return d.neg();
  }
};

export default calculatorLogic;
