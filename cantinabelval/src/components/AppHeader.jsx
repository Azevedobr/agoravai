import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = ({ title = "FinnTech Cantina", subtitle = "Alimentação Saudável", showBack = false, showCart = true }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCart = () => {
    navigate('/carrinho');
  };

  return (
    <div className="app-header-container">
      <div className="header-content">
        {showBack && (
          <button className="header-btn" onClick={handleBack}>
            <span className="header-icon">←</span>
          </button>
        )}
        
        <div className="header-center">
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>

        {showCart && (
          <button className="header-btn cart-btn" onClick={handleCart}>
            <span className="header-icon">🛒</span>
            <div className="cart-badge">3</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default AppHeader;