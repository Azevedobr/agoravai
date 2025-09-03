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
  FiShield
} from 'react-icons/fi';
import './TelaInicial.css';

const TelaInicial = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('Usuário');
  
  useEffect(() => {
    const usuario = UsuarioService.getCurrentUser();
    if (usuario && usuario.nome) {
      const primeiroNome = usuario.nome.split(' ')[0];
      setUserName(primeiroNome);
    }
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
    <div className="telainicio-container">
      {/* Header Melhorado */}
      <header className="telainicio-header">
        <div className="telainicio-logo-container">
          <div className="logo-wrapper">
            <span className="logo-icon">🍔</span>
            <div>
              <h1 className="telainicio-logo">FinnFood</h1>
              <span className="telainicio-logo-subtitle">Sua Cantina Digital</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <div className="time-display">
            {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <nav className="telainicio-nav">
          <Link to="/inicio" className="telainicio-nav-link active">
            <FiStar /> Início
          </Link>
          <Link to="/menu" className="telainicio-nav-link">
            <FiShoppingCart /> Menu
          </Link>
          <Link to="/carrinho" className="telainicio-nav-link">
            <FiShoppingCart /> Carrinho
          </Link>
          <Link to="/paginaeditarperfil" className="telainicio-nav-link">
            <FiUser /> Perfil
          </Link>
          <Link to="/pedidos" className="telainicio-nav-link">
            <FiTrendingUp /> Pedidos
          </Link>
        </nav>
      </header>

      {/* Conteúdo principal */}
      <main className="telainicio-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <h2 className="welcome-greeting">{getGreeting()}, {userName}! 👋</h2>
            <p className="welcome-subtitle">Que tal um lanche delicioso hoje?</p>
          </div>
          <div className="quick-stats">
            <div className="stat-card">
              <FiTrendingUp className="stat-icon" />
              <div>
                <span className="stat-number">47</span>
                <span className="stat-label">Pedidos</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section Melhorada */}
        <section className="telainicio-hero-section">
          <div className="telainicio-hero-content">
            <div className="telainicio-hero-badge">
              <FiZap className="telainicio-badge-icon" />
              <span>Entrega em 5 minutos</span>
            </div>
            <h1 className="telainicio-hero-title">
              <span className="telainicio-title-highlight">Sabor</span> e
              <span className="telainicio-title-gradient"> praticidade</span>
              <br />em suas mãos
            </h1>
            <p className="telainicio-hero-description">
              🚀 Peça em segundos, pague com segurança e retire sem esperar!
              <br />Sua cantina favorita agora é 100% digital.
            </p>
            <div className="telainicio-hero-buttons">
              <Link to="/menu" className="telainicio-cta-primary">
                <FiShoppingCart className="telainicio-btn-icon" />
                Explorar Menu
                <span className="telainicio-btn-shine"></span>
              </Link>
              <Link to="/pedidos" className="telainicio-cta-secondary">
                <FiTrendingUp className="telainicio-btn-icon" />
                Ver Pedidos
              </Link>
            </div>
          </div>
          <div className="telainicio-hero-visual">
            <div className="telainicio-floating-card telainicio-card-1">
              <FiZap className="telainicio-card-icon" />
              <span>Entrega Rápida</span>
            </div>
            <div className="telainicio-floating-card telainicio-card-2">
              <FiShield className="telainicio-card-icon" />
              <span>100% Seguro</span>
            </div>
            <div className="telainicio-floating-card telainicio-card-3">
              <FiHeart className="telainicio-card-icon" />
              <span>Seus Favoritos</span>
            </div>
          </div>
        </section>

        {/* Seção de recursos */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-decoration">✨</span>
              Por que escolher FinnFood?
              <span className="title-decoration">✨</span>
            </h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="features-grid">
            <FeatureCard
              icon={<FiClock className="feature-icon" />}
              title="⚡ Pedidos Ultra-Rápidos"
              description="Faça seu pedido em menos de 30 segundos! Escolha horário de retirada e evite qualquer fila na cantina"
              color="#ff6b6b"
            />
            <FeatureCard
              icon={<FiShoppingCart className="feature-icon" />}
              title="🛡️ Pagamento 100% Seguro"
              description="PIX instantâneo, cartão ou dinheiro. Criptografia bancária e proteção total dos seus dados pessoais"
              color="#4ecdc4"
            />
            <FeatureCard
              icon={<FiUser className="feature-icon" />}
              title="🎯 Experiência Personalizada"
              description="IA que aprende suas preferências, histórico completo de pedidos e recomendações personalizadas"
              color="#45b7d1"
            />
            <FeatureCard
              icon={<FiSmartphone className="feature-icon" />}
              title="📱 Acesso Total Mobile"
              description="App otimizado para celular, notificações em tempo real e funciona offline para emergências"
              color="#f9ca24"
            />
          </div>
        </section>

        {/* Seção de Ações Rápidas */}
        <section className="quick-actions-section">
          <h3 className="section-subtitle">Ações Rápidas</h3>
          <div className="quick-actions-grid">
            <Link to="/menu" className="action-card">
              <FiShoppingCart className="action-icon" />
              <span>Fazer Pedido</span>
            </Link>
            <Link to="/pedidos" className="action-card">
              <FiTrendingUp className="action-icon" />
              <span>Meus Pedidos</span>
            </Link>
            <Link to="/paginaeditarperfil" className="action-card">
              <FiUser className="action-icon" />
              <span>Meu Perfil</span>
            </Link>
            <Link to="/carrinho" className="action-card">
              <FiShoppingCart className="action-icon" />
              <span>Carrinho</span>
            </Link>
          </div>
        </section>

        {/* Seção de estatísticas melhorada */}
        <section className="telainicio-stats-section">
          <h3 className="section-subtitle">Nossa Comunidade</h3>
          <div className="telainicio-stats-grid">
            <div className="telainicio-stat-item">
              <div className="stat-icon-wrapper">
                <FiTrendingUp className="stat-icon-large" />
              </div>
              <div className="telainicio-stat-number">2.5K+</div>
              <div className="telainicio-stat-label">Pedidos Este Mês</div>
            </div>
            <div className="telainicio-stat-item">
              <div className="stat-icon-wrapper">
                <FiStar className="stat-icon-large" />
              </div>
              <div className="telainicio-stat-number">4.9★</div>
              <div className="telainicio-stat-label">Avaliação Média</div>
            </div>
            <div className="telainicio-stat-item">
              <div className="stat-icon-wrapper">
                <FiClock className="stat-icon-large" />
              </div>
              <div className="telainicio-stat-number">3min</div>
              <div className="telainicio-stat-label">Tempo Médio</div>
            </div>
            <div className="telainicio-stat-item">
              <div className="stat-icon-wrapper">
                <FiUser className="stat-icon-large" />
              </div>
              <div className="telainicio-stat-number">850+</div>
              <div className="telainicio-stat-label">Estudantes Ativos</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Componente reutilizável para os cards melhorado
const FeatureCard = ({ icon, title, description, color }) => (
  <div className="feature-card" style={{ '--card-color': color }}>
    <div className="card-header">
      <div className="icon-container">
        {icon}
        <div className="icon-glow"></div>
      </div>
    </div>
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
    <div className="card-footer">
      <div className="card-stats">
        <span className="card-metric">98% satisfação</span>
      </div>
      <span className="learn-more">Experimentar →</span>
    </div>
  </div>
);

export default TelaInicial;