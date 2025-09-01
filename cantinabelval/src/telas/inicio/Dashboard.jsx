import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard-specific.css';

const Dashboard = () => {
  return (
    <div className="telainicio-container">
      {/* Header */}
      <header className="telainicio-header">
        <div className="telainicio-logo-container">
          <h1 className="telainicio-logo">🍽️ FinnTech Cantina</h1>
          <span className="telainicio-logo-subtitle">Alimentação Saudável</span>
        </div>
        <nav className="telainicio-nav">
          <Link to="/inicio" className="telainicio-nav-link active">🏠 Início</Link>
          <Link to="/cadastrar-produto" className="telainicio-nav-link">➕ Cadastrar Produto</Link>
          <Link to="/menu" className="telainicio-nav-link">🍕 Menu</Link>
          <Link to="/historico" className="telainicio-nav-link">📋 Histórico</Link>
          <Link to="/editarperfil" className="telainicio-nav-link">👤 Perfil</Link>
        </nav>
      </header>

      {/* Conteúdo principal */}
      <main className="telainicio-main">
        <section className="telainicio-hero-section">
          <div className="telainicio-hero-content">
            <div className="telainicio-hero-badge">
              ⭐ Sistema Premiado
            </div>
            <h1 className="telainicio-hero-title">
              <span className="telainicio-title-highlight">FinnTech</span> Cantina
              <span className="telainicio-title-gradient"> Digital</span>
            </h1>
            <p className="telainicio-hero-description">
              Sua cantina escolar moderna com pedidos online, 
              gestão inteligente e experiência única para estudantes.
            </p>
            <div className="telainicio-hero-buttons">
              <Link to="/menu" className="telainicio-cta-primary">
                🛒 Explorar Menu
                <span className="telainicio-btn-shine"></span>
              </Link>
            </div>
          </div>
          <div className="telainicio-hero-visual">
            <div className="telainicio-floating-card telainicio-card-1">
              🛒 <span>Pedidos Online</span>
            </div>
            <div className="telainicio-floating-card telainicio-card-2">
              ⚡ <span>Entrega Rápida</span>
            </div>
            <div className="telainicio-floating-card telainicio-card-3">
              😊 <span>Clientes Felizes</span>
            </div>
          </div>
        </section>

        {/* Seção de recursos */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">
              ✨ Recursos Incríveis ✨
            </h2>
            <div className="title-underline"></div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="card-header">
                <div className="icon-container">
                  ⚡
                  <div className="icon-glow"></div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Pedidos Rápidos</h3>
                <p className="card-description">Faça seus pedidos em segundos e retire na cantina sem filas</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-header">
                <div className="icon-container">
                  🍕
                  <div className="icon-glow"></div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Menu Digital</h3>
                <p className="card-description">Cardápio completo com fotos, preços e descrições detalhadas</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-header">
                <div className="icon-container">
                  💳
                  <div className="icon-glow"></div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Pagamento Fácil</h3>
                <p className="card-description">Pague com PIX, cartão ou dinheiro de forma segura</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-header">
                <div className="icon-container">
                  📱
                  <div className="icon-glow"></div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Acesso Mobile</h3>
                <p className="card-description">Use em qualquer dispositivo, a qualquer hora e lugar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de estatísticas */}
        <section className="telainicio-stats-section">
          <div className="telainicio-stats-grid">
            <div className="telainicio-stat-item">
              <div className="telainicio-stat-number">500+</div>
              <div className="telainicio-stat-label">Produtos Vendidos</div>
            </div>
            <div className="telainicio-stat-item">
              <div className="telainicio-stat-number">98%</div>
              <div className="telainicio-stat-label">Satisfação dos Clientes</div>
            </div>
            <div className="telainicio-stat-item">
              <div className="telainicio-stat-number">24/7</div>
              <div className="telainicio-stat-label">Sistema Disponível</div>
            </div>
            <div className="telainicio-stat-item">
              <div className="telainicio-stat-number">100+</div>
              <div className="telainicio-stat-label">Estudantes Ativos</div>
            </div>
          </div>
        </section>


      </main>
    </div>
  );
};

export default Dashboard;