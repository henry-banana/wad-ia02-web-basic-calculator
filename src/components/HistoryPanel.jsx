import React from 'react';

const HistoryPanel = ({ history, onSelect, onClear, isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="history-panel">
      <div className="history-header">
        <div className="history-tabs">
          <button className="tab active">History</button>
          <button className="tab">Memory</button>
        </div>
      </div>
      <div className="history-content">
        {history.length === 0 ? (
          <p className="no-history">There's no history yet.</p>
        ) : (
          <>
            <button className="clear-history" onClick={onClear}>
              🗑️ Clear history
            </button>
            <div className="history-list">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => onSelect(item)}
                >
                  <div className="history-expression">{item.expression}</div>
                  <div className="history-result">{item.result}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
