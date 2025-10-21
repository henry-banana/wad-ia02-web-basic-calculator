import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';
import HistoryPanel from './HistoryPanel';
import HamburgerMenu from './HamburgerMenu';
import calculatorLogic from '../logic/calculatorLogic';
import Decimal from 'decimal.js';

// Helpers for raw input and formatted display (grouping + scientific when needed)
const unformatNumberString = (s) => (s || '').replace(/,/g, '');
const groupInt = (i) => (i || '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const isScientificCandidate = (raw) => {
  try {
    const d = new Decimal(raw);
    if (d.isZero()) return false;
    const abs = d.abs();
    return abs.gte(new Decimal(10).pow(10)) || abs.lte(new Decimal(10).pow(-9));
  } catch {
    return false;
  }
};
const formatDisplayValue = (raw) => {
  if (raw == null) return '0';
  if (raw === 'Error') return 'Error';
  let s = String(raw);
  const negative = s.startsWith('-');
  if (negative) s = s.slice(1);
  const hasTrailingDot = s.endsWith('.') && s.indexOf('.') === s.length - 1;
  const [i, f] = s.split('.');
  // Cho phép chuyển sang dạng e… ngay cả khi có phần thập phân (miễn không có dấu chấm treo)
  const tooLong = s.replace('.', '').length > 18; // fallback nếu quá dài
  if (!hasTrailingDot && (isScientificCandidate(raw) || tooLong)) {
    return calculatorLogic.formatNumber(raw);
  }
  const intFmt = groupInt(i);
  let out = (negative ? '-' : '') + intFmt;
  if (hasTrailingDot) return out + '.';
  if (f !== undefined) return out + '.' + f;
  return out;
};

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [mode, setMode] = useState('Standard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load history and theme from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
    
    const savedTheme = localStorage.getItem('calcTheme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('calcHistory', JSON.stringify(history));
  }, [history]);
  
  // Save theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('calcTheme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleNumber = (num) => {
    if (displayValue === 'Error') {
      setDisplayValue(num);
      setExpression('');
      setOverwrite(false);
      return;
    }
    
    if (overwrite || displayValue === '0') {
      setDisplayValue(num);
      setOverwrite(false);
    } else {
      const raw = unformatNumberString(displayValue) + num;
      setDisplayValue(raw);
    }
  };

  const handleDecimal = () => {
    if (displayValue === 'Error') return;
    
    if (overwrite) {
      setDisplayValue('0.');
      setOverwrite(false);
    } else {
      const raw = unformatNumberString(displayValue);
      if (!raw.includes('.')) setDisplayValue(raw + '.');
    }
  };

  const handleOperator = (op) => {
    if (displayValue === 'Error') return;
    
    const current = unformatNumberString(displayValue);
    
    if (previousValue === null) {
      setPreviousValue(current);
      setExpression(`${calculatorLogic.formatNumber(current)} ${op}`);
    } else if (operator) {
      const result = calculatorLogic.calculate(previousValue, operator, current);
      if (result === 'Error') {
        setDisplayValue('Error');
        setExpression('');
        setPreviousValue(null);
        setOperator(null);
        return;
      }
      const formatted = calculatorLogic.formatNumber(result);
      
      setPreviousValue(result.toString());
      setDisplayValue(result.toString());
      setExpression(`${formatted} ${op}`);
    }
    
    setOperator(op);
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (displayValue === 'Error' || operator === null || previousValue === null) return;
    
  const current = unformatNumberString(displayValue);
  const result = calculatorLogic.calculate(previousValue, operator, current);
  const formatted = calculatorLogic.formatNumber(result);
    
    if (result === 'Error') {
      setDisplayValue('Error');
      setExpression('');
      setPreviousValue(null);
      setOperator(null);
      return;
    }
    
    const fullExpression = `${calculatorLogic.formatNumber(previousValue)} ${operator} ${calculatorLogic.formatNumber(current)} =`;
    
    setHistory(prev => [{
      expression: fullExpression,
      result: formatted
    }, ...prev].slice(0, 50));
    
    setDisplayValue(result.toString());
    setExpression(fullExpression);
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperator(null);
    setExpression('');
    setOverwrite(false);
  };

  const handleClearEntry = () => {
    setDisplayValue('0');
    setOverwrite(false);
  };

  const handleBackspace = () => {
    if (displayValue === 'Error' || overwrite) {
      setDisplayValue('0');
      setOverwrite(false);
      return;
    }
    
    const raw = unformatNumberString(displayValue);
    if (raw.length > 1) {
      const next = raw.slice(0, -1);
      setDisplayValue(next);
    } else {
      setDisplayValue('0');
    }
  };

  const handlePercent = () => {
    if (displayValue === 'Error') return;
    const value = calculatorLogic.calculatePercent(unformatNumberString(displayValue));
    setDisplayValue(value.toString());
    setOverwrite(true);
  };

  const handleSquareRoot = () => {
    if (displayValue === 'Error') return;
    const result = calculatorLogic.calculateSquareRoot(unformatNumberString(displayValue));
    setDisplayValue(result.toString());
    setOverwrite(true);
  };

  const handleSquare = () => {
    if (displayValue === 'Error') return;
    const result = calculatorLogic.calculateSquare(unformatNumberString(displayValue));
    setDisplayValue(result.toString());
    setOverwrite(true);
  };

  const handleReciprocal = () => {
    if (displayValue === 'Error') return;
    const result = calculatorLogic.calculateReciprocal(unformatNumberString(displayValue));
    setDisplayValue(result.toString());
    setOverwrite(true);
  };

  const handleNegate = () => {
    if (displayValue === 'Error' || displayValue === '0') return;
    const value = calculatorLogic.negate(unformatNumberString(displayValue));
    if (value === 'Error') return;
    const plain = value.toString();
    setDisplayValue(plain === '-0' ? '0' : plain);
  };

  const handleHistorySelect = (item) => {
    // Convert formatted history result (may contain commas or exponential) to raw canonical string
    let raw = '0';
    try {
      raw = new Decimal((item.result || '').toString().replace(/,/g, '')).toString();
    } catch {
      raw = unformatNumberString(item.result);
    }
    setDisplayValue(raw);
    setExpression(item.expression);
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        handleNumber(value);
        break;
      case '.':
        handleDecimal();
        break;
      case '+':
      case '−':
      case '×':
      case '÷':
        handleOperator(value);
        break;
      case '=':
        handleEquals();
        break;
      case 'C':
        handleClear();
        break;
      case 'CE':
        handleClearEntry();
        break;
      case '⌫':
        handleBackspace();
        break;
      case '%':
        handlePercent();
        break;
      case '²√x':
        handleSquareRoot();
        break;
      case 'x²':
        handleSquare();
        break;
      case '¹⁄ₓ':
        handleReciprocal();
        break;
      case '+/−':
        handleNegate();
        break;
      default:
        // Memory buttons - not implemented yet
        break;
    }
  };

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key;
      // Map keys to actions
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        handleNumber(key);
        return;
      }
      if (key === '.' || key === ',') { // treat comma as decimal on some keyboards
        e.preventDefault();
        handleDecimal();
        return;
      }
      if (key === '+' ) {
        e.preventDefault();
        handleOperator('+');
        return;
      }
      if (key === '-') {
        e.preventDefault();
        handleOperator('−');
        return;
      }
      if (key === '*' || key.toLowerCase() === 'x') {
        e.preventDefault();
        handleOperator('×');
        return;
      }
      if (key === '/') {
        e.preventDefault();
        handleOperator('÷');
        return;
      }
      if (key === '%' ) {
        e.preventDefault();
        handlePercent();
        return;
      }
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleEquals();
        return;
      }
      if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
        return;
      }
      if (key === 'Delete') {
        e.preventDefault();
        handleClearEntry();
        return;
      }
      if (key === 'Escape') {
        e.preventDefault();
        handleClear();
        return;
      }
      // Optional shortcuts
      if (key.toLowerCase() === 's') {
        e.preventDefault();
        handleSquareRoot();
        return;
      }
      if (key.toLowerCase() === 'q') {
        e.preventDefault();
        handleSquare();
        return;
      }
      if (key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReciprocal();
        return;
      }
      if (key.toLowerCase() === 'n') { // negate
        e.preventDefault();
        handleNegate();
        return;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [displayValue, overwrite, previousValue, operator]);

  return (
    <div className={`calculator-app ${isDarkMode ? 'dark' : 'light'}`}>
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        mode={mode}
        onModeChange={setMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
      />
      
      <div className="calculator-container">
        <div className="calculator-header">
          <button className="menu-button" onClick={() => setIsMenuOpen((v) => !v)}>
            ☰
          </button>
          <h1 className="calculator-title">{mode}</h1>
          <div className="header-buttons">
            <button className="icon-button" onClick={() => setIsHistoryOpen(!isHistoryOpen)}>
              🕐
            </button>
          </div>
        </div>

        <div className="calculator-main">
          {isHistoryOpen && (
            <div
              className="history-overlay"
              onClick={() => setIsHistoryOpen(false)}
            />
          )}
          <HistoryPanel
            history={history}
            onSelect={handleHistorySelect}
            onClear={handleClearHistory}
            isOpen={isHistoryOpen}
          />
          
          <div className="calculator-body">
            <Display expression={expression} value={formatDisplayValue(displayValue)} />
            
            <div className="memory-buttons">
              <Button value="MC" onClick={handleButtonClick} className="memory-btn disabled" />
              <Button value="MR" onClick={handleButtonClick} className="memory-btn disabled" />
              <Button value="M+" onClick={handleButtonClick} className="memory-btn disabled" />
              <Button value="M−" onClick={handleButtonClick} className="memory-btn disabled" />
              <Button value="MS" onClick={handleButtonClick} className="memory-btn disabled" />
              <Button value="M∨" onClick={handleButtonClick} className="memory-btn disabled" />
            </div>

            <div className="keypad">
              <Button value="%" onClick={handleButtonClick} className="function-btn" />
              <Button value="CE" onClick={handleButtonClick} className="function-btn" />
              <Button value="C" onClick={handleButtonClick} className="function-btn" />
              <Button value="⌫" onClick={handleButtonClick} className="function-btn" />

              <Button value="¹⁄ₓ" onClick={handleButtonClick} className="function-btn" />
              <Button value="x²" onClick={handleButtonClick} className="function-btn" />
              <Button value="²√x" onClick={handleButtonClick} className="function-btn" />
              <Button value="÷" onClick={handleButtonClick} className="operator-btn" />

              <Button value="7" onClick={handleButtonClick} className="number-btn" />
              <Button value="8" onClick={handleButtonClick} className="number-btn" />
              <Button value="9" onClick={handleButtonClick} className="number-btn" />
              <Button value="×" onClick={handleButtonClick} className="operator-btn" />

              <Button value="4" onClick={handleButtonClick} className="number-btn" />
              <Button value="5" onClick={handleButtonClick} className="number-btn" />
              <Button value="6" onClick={handleButtonClick} className="number-btn" />
              <Button value="−" onClick={handleButtonClick} className="operator-btn" />

              <Button value="1" onClick={handleButtonClick} className="number-btn" />
              <Button value="2" onClick={handleButtonClick} className="number-btn" />
              <Button value="3" onClick={handleButtonClick} className="number-btn" />
              <Button value="+" onClick={handleButtonClick} className="operator-btn" />

              <Button value="+/−" onClick={handleButtonClick} className="function-btn" />
              <Button value="0" onClick={handleButtonClick} className="number-btn" />
              <Button value="." onClick={handleButtonClick} className="number-btn" />
              <Button value="=" onClick={handleButtonClick} className="equals-btn" />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .calculator-app {
          width: 100vw;
          height: 100vh;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          overflow: hidden;
        }

        .calculator-app.dark {
          background: #202020;
          color: #fff;
        }

        .calculator-app.light {
          background: #f3f3f3;
          color: #000;
        }

        .calculator-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .calculator-header {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          gap: 12px;
        }

        .menu-button, .icon-button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .dark .menu-button, .dark .icon-button {
          color: #fff;
        }

        .light .menu-button, .light .icon-button {
          color: #000;
        }

        .menu-button:hover, .icon-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .light .menu-button:hover, .light .icon-button:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .calculator-title {
          font-size: 18px;
          font-weight: 600;
          flex: 1;
        }

        .header-buttons {
          display: flex;
          gap: 8px;
        }

        .calculator-main {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        .calculator-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 16px 16px;
        }

        .display {
          padding: 20px 16px;
          text-align: right;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .expression {
          font-size: 14px;
          opacity: 0.6;
          margin-bottom: 8px;
          min-height: 20px;
        }

        .value {
          font-size: 48px;
          font-weight: 600;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .memory-buttons {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 4px;
          margin-bottom: 8px;
        }

        .memory-btn {
          padding: 8px;
          font-size: 13px;
          opacity: 0.5;
        }

        .keypad {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          flex: 1;
        }

        .calc-button {
          border: none;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.1s;
          font-family: inherit;
          font-weight: 500;
        }

        .dark .calc-button {
          background: #3b3b3b;
          color: #fff;
        }

        .light .calc-button {
          background: #f9f9f9;
          color: #000;
          border: 1px solid #e0e0e0;
        }

        .calc-button:hover:not(.disabled) {
          filter: brightness(1.1);
        }

        .calc-button:active:not(.disabled) {
          transform: scale(0.95);
        }

        .calc-button.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .operator-btn {
          font-size: 20px;
        }

        .equals-btn {
          background: #60cdff !important;
          color: #000 !important;
          font-size: 24px;
          border: none !important;
        }

        .history-panel {
          width: 320px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
        }

        .light .history-panel {
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        }

        .history-header {
          padding: 16px;
        }

        .history-tabs {
          display: flex;
          gap: 16px;
        }

        .tab {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 14px;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .dark .tab {
          color: #fff;
        }

        .light .tab {
          color: #000;
        }

        .tab.active {
          border-bottom-color: #60cdff;
        }

        .history-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .no-history {
          text-align: center;
          opacity: 0.6;
          margin-top: 40px;
        }

        .clear-history {
          width: 100%;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          border-radius: 4px;
          margin-bottom: 16px;
        }

        .dark .clear-history {
          color: #fff;
        }

        .light .clear-history {
          color: #000;
        }

        .clear-history:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .light .clear-history:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .history-item {
          padding: 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .dark .history-item {
          background: #2d2d2d;
        }

        .light .history-item {
          background: #fff;
          border: 1px solid #e0e0e0;
        }

        .history-item:hover {
          background: #3b3b3b;
        }

        .light .history-item:hover {
          background: #f0f0f0;
        }

        .history-expression {
          font-size: 12px;
          opacity: 0.6;
          margin-bottom: 4px;
        }

        .history-result {
          font-size: 18px;
          font-weight: 600;
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        /* Hidden by default; only shown on mobile when history is open */
        .history-overlay {
          display: none;
        }

        .hamburger-menu {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 320px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .dark .hamburger-menu {
          background: #2d2d2d;
          color: #fff;
        }

        .light .hamburger-menu {
          background: #fff;
          color: #000;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
        }

        .menu-section {
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .light .menu-section {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .menu-title {
          padding: 8px 16px;
          font-size: 12px;
          opacity: 0.6;
          text-transform: uppercase;
          font-weight: 600;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          gap: 12px;
          transition: background 0.2s;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .light .menu-item:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .menu-item.active {
          background: rgba(96, 205, 255, 0.2);
        }

        .menu-icon {
          font-size: 18px;
          width: 24px;
          text-align: center;
        }

        .menu-label {
          font-size: 14px;
        }

        .menu-footer {
          padding: 16px;
          margin-top: auto;
        }

        .theme-toggle {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .dark .theme-toggle {
          background: #3b3b3b;
          color: #fff;
        }

        .light .theme-toggle {
          background: #f3f3f3;
          color: #000;
        }

        .theme-toggle:hover {
          filter: brightness(1.1);
        }

        @media (max-width: 768px) {
          .history-panel {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: auto;
            z-index: 1000;
          }
          
          .hamburger-menu {
            width: 280px;
          }

          /* Keep header clickable above history panel */
          .calculator-header {
            position: relative;
            z-index: 1101;
          }

          /* Dim background and allow tap to close history */
          .history-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 900;
          }
        }

        /* On wide screens, dock history to the RIGHT side */
        @media (min-width: 1024px) {
          /* Ensure layout is side-by-side with body first, history second */
          .calculator-main {
            display: flex;
          }
          .calculator-body {
            order: 1;
          }
          .history-panel {
            order: 2;
            border-right: none;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
          }
          .light .history-panel {
            border-left: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Calculator;
