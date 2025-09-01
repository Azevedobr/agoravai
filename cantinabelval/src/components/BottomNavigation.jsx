import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    // Verifica se está na URL de escola ou tem dados de escola
    const isEscola = window.location.pathname.includes('telainicio') || 
                     window.location.pathname.includes('funcionarios') || 
                     window.location.pathname.includes('historico') || 
                     window.location.pathname.includes('cadastrar-produto') ||
                     localStorage.getItem('escola');
    
    if (isEscola && !localStorage.getItem('user')) {
      navigate('/telainicio');
    } else {
      navigate('/telainicial');
    }
  };

  const navItems = [
    {
      icon: '🏠',
      label: 'Início',
      onClick: handleHomeClick,
      isActive: location.pathname === '/telainicial' || location.pathname === '/telainicio'
    },
    {
      icon: '🍽️',
      label: 'Menu',
      path: '/menu',
      isActive: location.pathname === '/menu'
    },
    {
      icon: '🛒',
      label: 'Carrinho',
      path: '/carrinho',
      isActive: location.pathname === '/carrinho'
    },
    {
      icon: '📋',
      label: 'Pedidos',
      path: '/pedidos',
      isActive: location.pathname === '/pedidos'
    },
    {
      icon: '👤',
      label: 'Perfil',
      path: '/editarperfil',
      isActive: location.pathname === '/editarperfil'
    }
  ];

  const handleNavigation = (item) => {
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="bottom-navigation">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`nav-item ${item.isActive ? 'active' : ''}`}
            onClick={() => handleNavigation(item)}
          >
            <div className="nav-icon-container">
              <span className="nav-icon">{item.icon}</span>
            </div>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;