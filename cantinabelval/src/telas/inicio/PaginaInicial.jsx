import React from 'react';
import { Link } from 'react-router-dom';
import './PaginaInicial.css';

const PaginaInicial = () => {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🍽️</span>
            <span className="logo-text">FinnTech Cantina</span>
          </div>
          <nav className="nav-menu">
            <a href="#features" className="nav-link">Recursos</a>
            <a href="#benefits" className="nav-link">Benefícios</a>
            <a href="#testimonials" className="nav-link">Depoimentos</a>
            <a href="#pricing" className="nav-link">Preços</a>
          </nav>
          <div className="header-actions">
            <Link to="/entraraluno" className="btn-login">Entrar</Link>
            <Link to="/cadastroaluno" className="btn-signup">Cadastrar</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              ⭐ #1 Sistema Premiado 
            </div>
            <h1 className="hero-title">
              Transformando a <span className="highlight">Cantina Escolar </span> 
              em um <span className="gradient-text">Negócio Digital</span>
            </h1>
            <p className="hero-description">
              Revolucionamos a gestão da cantina com nossa plataforma completa. 
              Pedidos online e 
              muito mais. Aumente suas vendas em até 300%.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">1</span>
                <span className="stat-label">Cantina Ativa</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Pedidos/Mês</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfação</span>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/cadastroaluno" className="btn-primary">
                🚀 Começar Grátis
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-preview">
                  <div className="app-header">
                    <span>FinnTech Cantina</span>
                  </div>
                  <div className="app-content">
                    <div className="menu-item">🍔 Salgado - R$ 15,90</div>
                    <div className="menu-item">🥤 Refrigerante - R$ 4,00</div>
                    <div className="menu-item">🍟 Batata Frita - R$ 8,50</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-elements">
              <div className="floating-card card-1">💳 Pagamento Fácil</div>
              <div className="floating-card card-2">📊 Relatórios</div>
              <div className="floating-card card-3">🛒 Pedidos Online</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Recursos Poderosos</h2>
          <p className="section-subtitle">
            Tudo que você precisa para modernizar sua cantina
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛒</div>
            <h3 className="feature-title">Pedidos Online</h3>
            <p className="feature-description">
              Estudantes fazem pedidos pelo celular, evitam filas e retiram na hora certa
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3 className="feature-title">Pagamentos</h3>
            <p className="feature-description">
              PIX, cartão e dinheiro. Controle total das transações em tempo real
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Controle de Vendas</h3>
            <p className="feature-description">
              Dashboards completos com vendas, produtos mais vendidos e análises
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3 className="feature-title">Gestão de Produtos</h3>
            <p className="feature-description">
              Controle automático de produtos, alertas de estoque baixo
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Sistema Rápido</h3>
            <p className="feature-description">
              Interface otimizada para agilizar o atendimento e reduzir filas
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">App Mobile</h3>
            <p className="feature-description">
              Acesso completo pelo celular para gestores e estudantes
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2 className="benefits-title">
              Por que escolher o <span className="gradient-text">FinnTech Cantina?</span>
            </h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">🚀</div>
                <div className="benefit-content">
                  <h4>Aumento de 300% nas Vendas</h4>
                  <p>A cantina do ITB Belval aumentou o faturamento em média 300% no primeiro ano com pedidos online e sistema de fidelidade integrado</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <div className="benefit-content">
                  <h4>Zero Filas, Máxima Eficiência</h4>
                  <p>Pedidos antecipados com horário marcado eliminam 100% das filas. Estudantes retiram em segundos com código QR</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💎</div>
                <div className="benefit-content">
                  <h4>Tecnologia Premium Gratuita</h4>
                  <p>Sistema completo - tudo gratuito</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🎯</div>
                <div className="benefit-content">
                  <h4>Gestão Inteligente 24/7</h4>
                  <p>Cotrole em tempo real, alertas automáticos de estoque, relatórios de vendas e insights de comportamento dos clientes</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🛡️</div>
                <div className="benefit-content">
                  <h4>Segurança Total</h4>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🌟</div>
                <div className="benefit-content">
                  <h4>Suporte Especializado</h4>
                  <p>Equipe dedicada para cantinas escolares, treinamento gratuito, implementação em 24h e suporte técnico prioritário</p>
                </div>
              </div>
            </div>
          </div>
          <div className="benefits-visual">
            <div className="dashboard-preview">
              <div className="dashboard-header">📊 Dashboard</div>
              <div className="dashboard-stats">
                <div className="dash-stat">
                  <span className="dash-number">R$ 12.450</span>
                  <span className="dash-label">Vendas Hoje</span>
                </div>
                <div className="dash-stat">
                  <span className="dash-number">156</span>
                  <span className="dash-label">Pedidos</span>
                </div>
              </div>
              <div className="dashboard-chart">📈</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">O que nossos clientes dizem</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              "Revolucionou nossa cantina! As vendas triplicaram e os alunos adoram a praticidade."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍🏫</div>
              <div className="author-info">
                <span className="author-name">Maria Silva</span>
                <span className="author-role">Diretora - ITB Belval</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              "Sistema intuitivo e suporte excepcional. Recomendo para todas as escolas!"
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👨‍💼</div>
              <div className="author-info">
                <span className="author-name">João Santos</span>
                <span className="author-role">Gestor - ITB Belval</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              "Acabaram as filas! Agora posso focar no que realmente importa: qualidade dos produtos."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍🍳</div>
              <div className="author-info">
                <span className="author-name">Ana Costa</span>
                <span className="author-role">Coordenadora - ITB Belval</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2 className="section-title">🎉 Oferta Especial de Lançamento</h2>
          <p className="section-subtitle">Todos os planos GRATUITOS por 1 ano completo!</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="plan-header">
              <h3 className="plan-name">Básico</h3>
              <div className="plan-price">
                <span className="price">Grátis</span>
                <span className="period">por 1 ano</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>✅ Até 50 pedidos/mês</li>
              <li>✅ Menu digital</li>
              <li>✅ Pagamentos básicos</li>
              <li>✅ Suporte por email</li>
            </ul>
            <Link to="/cadastroaluno" className="plan-button basic">
              Começar Grátis
            </Link>
          </div>
          <div className="pricing-card featured">
            <div className="plan-badge">Mais Popular</div>
            <div className="plan-header">
              <h3 className="plan-name">Profissional</h3>
              <div className="plan-price">
                <span className="price">Grátis</span>
                <span className="period">por 1 ano</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>✅ Pedidos ilimitados</li>
              <li>✅ Relatórios avançados</li>
              <li>✅ Gestão de estoque</li>
              <li>✅ Suporte prioritário</li>
              <li>✅ App personalizado</li>
            </ul>
            <Link to="/cadastroaluno" className="plan-button professional">
              Escolher Plano
            </Link>
          </div>
          <div className="pricing-card">
            <div className="plan-header">
              <h3 className="plan-name">Enterprise</h3>
              <div className="plan-price">
                <span className="price">Grátis</span>
                <span className="period">por 1 ano</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>✅ Múltiplas cantinas</li>
              <li>✅ API personalizada</li>
              <li>✅ Integração ERP</li>
              <li>✅ Suporte 24/7</li>
              <li>✅ Consultoria dedicada</li>
            </ul>
            <Link to="/cadastroaluno" className="plan-button enterprise">
              Começar Grátis
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Pronto para agilizar a sua vida?
          </h2>
          <p className="cta-description">
            Junte-se a cantina do Belval 
          </p>
          <div className="cta-actions">
            <Link to="/cadastroaluno" className="btn-cta-primary">
              🎉 Aproveitar Oferta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🍽️</span>
              <span className="logo-text">FinnTech Cantina</span>
            </div>
            <p className="footer-description">
              A plataforma completa para modernizar cantinas escolares
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Produto</h4>
            <ul className="footer-links">
              <li><a href="#features">Recursos</a></li>
              <li><a href="#pricing">Preços</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Empresa</h4>
            <ul className="footer-links">
              <li><a href="#">Sobre</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Suporte</h4>
            <ul className="footer-links">
              <li><Link to="/central-ajuda">Central de Ajuda</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FinnTech Cantina. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PaginaInicial;