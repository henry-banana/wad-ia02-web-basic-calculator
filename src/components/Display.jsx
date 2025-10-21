import React from 'react';

const Display = ({ expression, value }) => {
  return (
    <div className="display">
      <div className="expression" data-testid="display-expression">{expression}</div>
      <div className="value" data-testid="display-value">{value}</div>
    </div>
  );
};

export default Display;
