import React from 'react';

const HamburgerMenu = ({ isOpen, onClose, mode, onModeChange, onToggleTheme, isDarkMode }) => {
  if (!isOpen) return null;
  
  const modes = [
    { id: 'Standard', icon: '🔢', label: 'Standard' },
    { id: 'Scientific', icon: '🔬', label: 'Scientific' },
    { id: 'Graphing', icon: '📈', label: 'Graphing' },
    { id: 'Programmer', icon: '</>', label: 'Programmer' },
    { id: 'Date', icon: '📅', label: 'Date calculation' },
  ];
  
  const converters = [
    { id: 'Currency', icon: '💱', label: 'Currency' },
    { id: 'Volume', icon: '📦', label: 'Volume' },
    { id: 'Length', icon: '📏', label: 'Length' },
  ];
  
  const handleModeClick = (modeId) => {
    if (modeId === 'Standard') {
      onModeChange(modeId);
      onClose();
    } else {
      alert('Coming soon!');
    }
  };
  
  return (
    <>
      <div className="menu-overlay" onClick={onClose}></div>
      <div className="hamburger-menu">
        <div className="menu-section">
          <div className="menu-title">Calculator</div>
          {modes.map(m => (
            <div
              key={m.id}
              className={`menu-item ${mode === m.id ? 'active' : ''}`}
              onClick={() => handleModeClick(m.id)}
            >
              <span className="menu-icon">{m.icon}</span>
              <span className="menu-label">{m.label}</span>
            </div>
          ))}
        </div>
        
        <div className="menu-section">
          <div className="menu-title">Converter</div>
          {converters.map(c => (
            <div
              key={c.id}
              className="menu-item"
              onClick={() => alert('Coming soon!')}
            >
              <span className="menu-icon">{c.icon}</span>
              <span className="menu-label">{c.label}</span>
            </div>
          ))}
        </div>
        
        <div className="menu-section">
          <div
            className="menu-item"
            onClick={() => alert('Settings - Coming soon!')}
          >
            <span className="menu-icon">⚙️</span>
            <span className="menu-label">Settings</span>
          </div>
        </div>
        
        <div className="menu-footer">
          <button className="theme-toggle" onClick={onToggleTheme}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
