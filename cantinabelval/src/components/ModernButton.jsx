import React from 'react';
import './ModernButton.css';

const ModernButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  icon,
  className = '',
  ...props 
}) => {
  const buttonClass = `modern-btn modern-btn--${variant} modern-btn--${size} ${className}`;

  return (
    <button 
      className={buttonClass} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {icon && <span className="modern-btn__icon">{icon}</span>}
      <span className="modern-btn__text">{children}</span>
      <span className="modern-btn__shimmer"></span>
    </button>
  );
};

export default ModernButton;