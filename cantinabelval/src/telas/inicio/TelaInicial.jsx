import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UsuarioService } from '../../services';
import {
  FiClock,
  FiShoppingCart,
  FiUser,
  FiSmartphone,
  FiTrendingUp,
  FiStar,
  FiBell,
  FiHeart,
  FiZap,
  FiShield,
  FiArrowRight,
  FiPlay,
  FiCheck,
  FiGift,
  FiCreditCard,
  FiMapPin
} from 'react-icons/fi';
import './TelaInicial.css';

const TelaInicial = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('Usuário');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const usuario = UsuarioService.getCurrentUser();
    if (usuario && usuario.nome) {
      const primeiroNome = usuario.nome.split(' ')[0];
      setUserName(primeiroNome);
    }
    setIsVisible(true);
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className={`telainicio-container ${isVisible ? 'fade-in' : ''}`}>
      {/* Header Moderno */}
      <header className="telainicio-header">
        <div className="telainicio-logo-container">
          <div className="logo-wrapper">
            <div className="logo-icon-modern">
              <span className="logo-gradient">🍽️</span>
            </div>
            <div className="logo-text">
              <h1 className="telainicio-logo">FinnFood</h1>
              <span className="telainicio-logo-subtitle">Cantina Digital</span>
            </div>
          </div>
        </div>
        
        <nav className="telainicio-nav">
          <Link to="/inicio" className="telainicio-nav-link active">
            <FiStar className="nav-icon" />
            <span>Início</span>
          </Link>
          <Link to="/menu" className="telainicio-nav-link">
            <FiShoppingCart className="nav-icon" />
            <span>Menu</span>
          </Link>
          <Link to="/carrinho" className="telainicio-nav-link">
            <FiShoppingCart className="nav-icon" />
            <span>Carrinho</span>
          </Link>
          <Link to="/paginaeditarperfil" className="telainicio-nav-link">
            <FiUser className="nav-icon" />
            <span>Perfil</span>
          </Link>
          <Link to="/pedidos" className="telainicio-nav-link">
            <FiTrendingUp className="nav-icon" />
            <span>Pedidos</span>
          </Link>
        </nav>
        
        <div className="header-actions">
          <div className="time-display">
            <FiClock className="time-icon" />
            {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="telainicio-main">
        {/* Hero Section Moderna */}
        <section className="hero-modern">
          <div className="hero-content">
            <div className="hero-badge">
              <FiZap className="badge-icon" />
              <span>Novo: Entrega em 3 minutos</span>
            </div>
            
            <h1 className="hero-title">
              <span className="title-line">Sua cantina</span>
              <span className="title-line gradient-text">reimaginada</span>
            </h1>
            
            <p className="hero-description">
              Peça, pague e retire sem filas. A experiência mais rápida e segura 
              para sua alimentação escolar.
            </p>
            
            <div className="hero-actions">
              <Link to="/menu" className="btn-primary">
                <span>Fazer Pedido</span>
                <FiArrowRight className="btn-arrow" />
              </Link>
              <Link to="/tutorial" className="btn-secondary">
                <FiPlay className="play-icon" />
                <span>Ver Como Funciona</span>
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">2.5k+</span>
                <span className="stat-label">Pedidos hoje</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Avaliação</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3min</span>
                <span className="stat-label">Tempo médio</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-preview">
                  <div className="app-header">
                    <div className="app-title">Menu do Dia</div>
                    <div className="app-time">12:30</div>
                  </div>
                  <div className="food-grid">
                    <div className="food-item">🍕</div>
                    <div className="food-item">🍔</div>
                    <div className="food-item">🥤</div>
                    <div className="food-item">🍰</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="floating-elements">
              <div className="floating-card card-1">
                <FiCheck className="card-icon success" />
                <span>Pedido confirmado!</span>
              </div>
              <div className="floating-card card-2">
                <FiCreditCard className="card-icon" />
                <span>Pagamento seguro</span>
              </div>
              <div className="floating-card card-3">
                <FiMapPin className="card-icon" />
                <span>Pronto para retirar</span>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Personal */}
        <section className="welcome-personal">
          <div className="welcome-card">
            <div className="welcome-text">
              <h2 className="welcome-greeting">{getGreeting()}, {userName}! 👋</h2>
              <p className="welcome-subtitle">Pronto para um lanche delicioso?</p>
            </div>
            <div className="welcome-actions">
              <Link to="/menu" className="quick-order-btn">
                <FiShoppingCart className="quick-icon" />
                <span>Pedido Rápido</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Modernas */}
        <section className="features-modern">
          <div className="features-header">
            <h2 className="features-title">Tudo que você precisa</h2>
            <p className="features-subtitle">Uma experiência completa e sem complicações</p>
          </div>
          
          <div className="features-grid-modern">
            <FeatureCardModern
              icon={<FiZap />}
              title="Pedidos Instantâneos"
              description="Faça seu pedido em segundos com nossa interface otimizada"
              gradient="from-orange-400 to-pink-400"
            />
            <FeatureCardModern
              icon={<FiShield />}
              title="Pagamento Seguro"
              description="PIX, cartão ou dinheiro com criptografia de nível bancário"
              gradient="from-green-400 to-blue-400"
            />
            <FeatureCardModern
              icon={<FiStar />}
              title="Experiência Premium"
              description="Interface intuitiva e recomendações personalizadas"
              gradient="from-purple-400 to-pink-400"
            />
            <FeatureCardModern
              icon={<FiSmartphone />}
              title="Mobile First"
              description="Otimizado para celular com notificações em tempo real"
              gradient="from-blue-400 to-cyan-400"
            />
          </div>
        </section>

        {/* Promoção Especial */}
        <section className="promo-section">
          <div className="promo-card">
            <div className="promo-icon">
              <FiGift className="gift-icon" />
            </div>
            <div className="promo-content">
              <h3 className="promo-title">Oferta Especial de Lançamento!</h3>
              <p className="promo-description">
                Todos os planos GRATUITOS por 1 ano completo. 
                Aproveite e modernize sua experiência na cantina.
              </p>
              <Link to="/menu" className="promo-btn">
                <span>Aproveitar Oferta</span>
                <FiArrowRight className="promo-arrow" />
              </Link>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
};

// Componente moderno para features
const FeatureCardModern = ({ icon, title, description, gradient }) => (
  <div className="feature-card-modern">
    <div className={`feature-icon-modern bg-gradient-to-r ${gradient}`}>
      {icon}
    </div>
    <h3 className="feature-title-modern">{title}</h3>
    <p className="feature-description-modern">{description}</p>
    <div className="feature-arrow">
      <FiArrowRight />
    </div>
  </div>
);

export default TelaInicial;