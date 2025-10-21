import React from 'react';

const Button = ({ value, onClick, className = '', style = {} }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`calc-button ${className}`}
      style={style}
    >
      {value}
    </button>
  );
};

export default Button;
