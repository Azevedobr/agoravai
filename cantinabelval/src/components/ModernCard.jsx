import React from 'react';
import './ModernCard.css';

const ModernCard = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  ...props 
}) => {
  const cardClass = `modern-card modern-card--${variant} ${hover ? 'modern-card--hover' : ''} ${className}`;

  return (
    <div className={cardClass} {...props}>
      <div className="modern-card__gradient"></div>
      <div className="modern-card__content">
        {children}
      </div>
    </div>
  );
};

export default ModernCard;