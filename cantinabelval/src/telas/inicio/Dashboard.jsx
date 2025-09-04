import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faPlus, faPizzaSlice, faHistory, faUser, faClock,
  faShoppingCart, faUsers, faStar, faChartLine, faBell,
  faEye, faArrowUp, faArrowDown, faCalendarAlt, faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    pedidosHoje: 0,
    vendas: 0,
    alunosAtivos: 0,
    avaliacaoMedia: 4.8
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const carregarEstatisticas = async () => {
    setLoading(true);
    try {
      // Buscar pedidos de hoje
      const pedidosResponse = await fetch('http://localhost:8080/pedido/findAll');
      const pedidos = await pedidosResponse.json();
      
      // Ordenar pedidos por data (mais recentes primeiro) e pegar os 5 últimos
      const pedidosOrdenados = pedidos.sort((a, b) => new Date(b.dataPedido) - new Date(a.dataPedido));
      const pedidosRecentes = pedidosOrdenados.slice(0, 5).map(pedido => ({
        id: `#${pedido.id.toString().padStart(3, '0')}`,
        cliente: pedido.usuario?.nome || 'Cliente não identificado',
        valor: pedido.valor || 0,
        status: getStatusPortugues(pedido.statusPedido),
        tempo: calcularTempoDecorrido(pedido.dataPedido)
      }));
      
      setRecentOrders(pedidosRecentes);
      
      const hoje = new Date();
      const pedidosHoje = pedidos.filter(pedido => {
        const dataPedido = new Date(pedido.dataPedido);
        return dataPedido.toDateString() === hoje.toDateString();
      });
      
      // Calcular vendas de hoje
      const vendasHoje = pedidosHoje.reduce((total, pedido) => {
        return total + (pedido.valor || 0);
      }, 0);
      
      // Buscar alunos ativos do banco
      let alunosAtivos = 0;
      try {
        const usuariosResponse = await fetch('http://localhost:8080/usuario/findAll');
        const usuarios = await usuariosResponse.json();
        // Contar apenas usuários que não são admin (alunos)
        alunosAtivos = usuarios.filter(usuario => 
          usuario.tipoUsuario !== 'ADMIN' && usuario.tipoUsuario !== 'admin'
        ).length;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        // Fallback para localStorage
        const alunosData = JSON.parse(localStorage.getItem('alunos')) || [];
        alunosAtivos = alunosData.length;
      }
      
      setStats({
        pedidosHoje: pedidosHoje.length,
        vendas: vendasHoje,
        alunosAtivos: alunosAtivos,
        avaliacaoMedia: 4.8
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      // Fallback para dados locais
      const pedidosLocais = JSON.parse(localStorage.getItem('pedidos')) || [];
      const alunosLocaisFallback = JSON.parse(localStorage.getItem('alunos')) || [];
      
      // Pedidos recentes do localStorage
      const pedidosRecentesLocal = pedidosLocais.slice(-5).reverse().map((pedido, index) => ({
        id: `#${(index + 1).toString().padStart(3, '0')}`,
        cliente: pedido.nomeCliente || 'Cliente não identificado',
        valor: pedido.valor || pedido.total || 0,
        status: pedido.status || 'Novo',
        tempo: calcularTempoDecorrido(pedido.dataPedido)
      }));
      
      setRecentOrders(pedidosRecentesLocal);
      
      const hoje = new Date();
      const pedidosHoje = pedidosLocais.filter(pedido => {
        if (!pedido.dataPedido) return false;
        const dataPedido = new Date(pedido.dataPedido);
        return dataPedido.toDateString() === hoje.toDateString();
      });
      
      const vendasHoje = pedidosHoje.reduce((total, pedido) => {
        return total + (pedido.valor || 0);
      }, 0);
      
      setStats({
        pedidosHoje: pedidosHoje.length,
        vendas: vendasHoje,
        alunosAtivos: alunosLocaisFallback.length,
        avaliacaoMedia: 4.8
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const getStatusPortugues = (status) => {
    switch (status) {
      case 'ATIVO': return 'Novo';
      case 'ACEITO': return 'Preparando';
      case 'FINALIZADO': return 'Pronto';
      case 'CANCELADO': return 'Cancelado';
      default: return status || 'Novo';
    }
  };

  const calcularTempoDecorrido = (dataPedido) => {
    if (!dataPedido) return 'Agora';
    
    const agora = new Date();
    const dataP = new Date(dataPedido);
    const diffMs = agora - dataP;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    
    if (diffMin < 1) return 'Agora';
    if (diffMin < 60) return `${diffMin} min`;
    
    const diffHoras = Math.floor(diffMin / 60);
    if (diffHoras < 24) return `${diffHoras}h`;
    
    const diffDias = Math.floor(diffHoras / 24);
    return `${diffDias}d`;
  };

  return (
    <div className="telainicio-container">
      {/* Header Moderno */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-icon">🍽️</div>
            <div className="logo-text">
              <h1 className="logo-title">FinnFood</h1>
              <span className="logo-subtitle">Painel Escola</span>
            </div>
          </div>
        </div>
        
        <nav className="header-nav">
          <Link to="/telainicio" className="nav-item active">
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </Link>
          <Link to="/menu" className="nav-item">
            <FontAwesomeIcon icon={faPizzaSlice} />
            <span>Menu</span>
          </Link>
          <Link to="/cadastrar-produto" className="nav-item">
            <FontAwesomeIcon icon={faPlus} />
            <span>Produtos</span>
          </Link>
          <Link to="/historico" className="nav-item">
            <FontAwesomeIcon icon={faHistory} />
            <span>Pedidos</span>
          </Link>
          <Link to="/editarperfil" className="nav-item">
            <FontAwesomeIcon icon={faUser} />
            <span>Perfil</span>
          </Link>
        </nav>
        
        <div className="header-right">
          <div className="time-display">
            <FontAwesomeIcon icon={faClock} />
            <span>{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="notification-bell">
            <FontAwesomeIcon icon={faBell} />
            <span className="notification-badge">3</span>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="telainicio-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">Bem-vindo ao Painel da Cantina! 🎉</h1>
            <p className="welcome-subtitle">Gerencie pedidos, produtos e acompanhe o desempenho em tempo real</p>
          </div>
          <div className="quick-actions">
            <Link to="/cadastrar-produto" className="quick-action-btn primary">
              <FontAwesomeIcon icon={faPlus} />
              <span>Novo Produto</span>
            </Link>
            <Link to="/historico" className="quick-action-btn secondary">
              <FontAwesomeIcon icon={faEye} />
              <span>Ver Pedidos</span>
            </Link>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card pedidos">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{loading ? '...' : stats.pedidosHoje}</div>
                <div className="stat-label">Pedidos Hoje</div>
                <div className="stat-trend positive">
                  <FontAwesomeIcon icon={faArrowUp} />
                  +12%
                </div>
              </div>
            </div>
            
            <div className="stat-card vendas">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faMoneyBillWave} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{loading ? '...' : `R$ ${stats.vendas.toFixed(2)}`}</div>
                <div className="stat-label">Vendas Hoje</div>
                <div className="stat-trend positive">
                  <FontAwesomeIcon icon={faArrowUp} />
                  +8%
                </div>
              </div>
            </div>
            
            <div className="stat-card alunos">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{loading ? '...' : stats.alunosAtivos}</div>
                <div className="stat-label">Alunos Ativos</div>
                <div className="stat-trend positive">
                  <FontAwesomeIcon icon={faArrowUp} />
                  +5%
                </div>
              </div>
            </div>
            
            <div className="stat-card avaliacao">
              <div className="stat-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.avaliacaoMedia}</div>
                <div className="stat-label">Avaliação Média</div>
                <div className="stat-trend positive">
                  <FontAwesomeIcon icon={faArrowUp} />
                  +0.2
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="recent-orders-section">
          <div className="section-header">
            <h2 className="section-title">
              <FontAwesomeIcon icon={faHistory} />
              Pedidos Recentes
            </h2>
            <Link to="/historico" className="view-all-btn">
              Ver Todos
              <FontAwesomeIcon icon={faArrowUp} style={{transform: 'rotate(45deg)'}} />
            </Link>
          </div>
          
          <div className="orders-list">
            {recentOrders.map((order, index) => (
              <div key={index} className="order-item">
                <div className="order-info">
                  <div className="order-id">{order.id}</div>
                  <div className="order-customer">{order.cliente}</div>
                </div>
                <div className="order-value">R$ {order.valor.toFixed(2)}</div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
                <div className="order-time">{order.tempo}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="actions-section">
          <div className="section-header">
            <h2 className="section-title">
              <FontAwesomeIcon icon={faChartLine} />
              Ações Rápidas
            </h2>
          </div>
          
          <div className="actions-grid">
            <Link to="/cadastrar-produto" className="action-card">
              <div className="action-icon">
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div className="action-content">
                <h3 className="action-title">Cadastrar Produto</h3>
                <p className="action-description">Adicione novos produtos ao cardápio</p>
              </div>
            </Link>

            <Link to="/menu" className="action-card">
              <div className="action-icon">
                <FontAwesomeIcon icon={faPizzaSlice} />
              </div>
              <div className="action-content">
                <h3 className="action-title">Ver Menu</h3>
                <p className="action-description">Visualize o cardápio da cantina</p>
              </div>
            </Link>

            <Link to="/historico" className="action-card">
              <div className="action-icon">
                <FontAwesomeIcon icon={faHistory} />
              </div>
              <div className="action-content">
                <h3 className="action-title">Histórico Completo</h3>
                <p className="action-description">Visualize todos os pedidos</p>
              </div>
            </Link>

            <Link to="/editarperfil" className="action-card">
              <div className="action-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="action-content">
                <h3 className="action-title">Configurações</h3>
                <p className="action-description">Gerencie perfil da escola</p>
              </div>
            </Link>
          </div>
        </section>


      </main>
    </div>
  );
};

export default Dashboard;