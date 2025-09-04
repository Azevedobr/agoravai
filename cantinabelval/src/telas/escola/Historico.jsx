import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faPlus, faSearch, faFilter, faCheck, faTimes, 
  faEye, faClock, faUser, faCreditCard, faShoppingBag,
  faCalendarAlt, faMoneyBillWave, faCheckCircle, faTimesCircle,
  faSpinner, faExclamationTriangle, faDownload, faRefresh
} from '@fortawesome/free-solid-svg-icons';
import './Historico.css';

const Historico = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [dateFilter, setDateFilter] = useState('TODOS');
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({ total: 0, ativo: 0, aceito: 0, finalizado: 0, cancelado: 0 });

  const carregarPedidos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/pedido/findAll');
      const pedidosData = await response.json();
      const pedidosOrdenados = pedidosData.reverse();
      setPedidos(pedidosOrdenados);
      calcularEstatisticas(pedidosOrdenados);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      // Fallback para localStorage
      let pedidosSalvos = [];
      try {
        const dados = localStorage.getItem('pedidos');
        pedidosSalvos = dados ? JSON.parse(dados) : [];
        if (!Array.isArray(pedidosSalvos)) {
          pedidosSalvos = [];
        }
      } catch {
        pedidosSalvos = [];
      }
      const pedidosValidos = pedidosSalvos.filter(pedido => 
        pedido && typeof pedido === 'object'
      );
      setPedidos(pedidosValidos);
      calcularEstatisticas(pedidosValidos);
    } finally {
      setLoading(false);
    }
  };

  const calcularEstatisticas = (pedidosData) => {
    const stats = {
      total: pedidosData.length,
      ativo: pedidosData.filter(p => p.statusPedido === 'ATIVO').length,
      aceito: pedidosData.filter(p => p.statusPedido === 'ACEITO').length,
      finalizado: pedidosData.filter(p => p.statusPedido === 'FINALIZADO').length,
      cancelado: pedidosData.filter(p => p.statusPedido === 'CANCELADO').length
    };
    setStats(stats);
  };

  const filtrarPedidos = () => {
    let pedidosFiltrados = [...pedidos];

    // Filtro por termo de busca
    if (searchTerm) {
      pedidosFiltrados = pedidosFiltrados.filter(pedido =>
        pedido.usuario?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.id?.toString().includes(searchTerm) ||
        pedido.infoPedido?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por status
    if (statusFilter !== 'TODOS') {
      pedidosFiltrados = pedidosFiltrados.filter(pedido => 
        pedido.statusPedido === statusFilter
      );
    }

    // Filtro por data
    if (dateFilter !== 'TODOS') {
      const hoje = new Date();
      pedidosFiltrados = pedidosFiltrados.filter(pedido => {
        const dataPedido = new Date(pedido.dataPedido);
        switch (dateFilter) {
          case 'HOJE':
            return dataPedido.toDateString() === hoje.toDateString();
          case 'SEMANA':
            const semanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
            return dataPedido >= semanaAtras;
          case 'MES':
            return dataPedido.getMonth() === hoje.getMonth() && 
                   dataPedido.getFullYear() === hoje.getFullYear();
          default:
            return true;
        }
      });
    }

    setPedidosFiltrados(pedidosFiltrados);
  };

  useEffect(() => {
    filtrarPedidos();
  }, [pedidos, searchTerm, statusFilter, dateFilter]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const atualizarPedidos = (pedidosAtualizados) => {
    localStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
    setPedidos(pedidosAtualizados);
  };

  const atualizarStatusPedido = async (pedidoId, novoStatus, dadosExtras = {}) => {
    try {
      const formData = new FormData();
      formData.append('status', novoStatus);
      
      if (dadosExtras.senhaPedido) {
        formData.append('senhaPedido', dadosExtras.senhaPedido);
      }
      
      const response = await fetch(`http://localhost:8080/pedido/updateStatus/${pedidoId}`, {
        method: 'PUT',
        body: formData
      });
      
      if (response.ok) {
        carregarPedidos();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleCancelar = async (index) => {
    const motivo = prompt('Por favor, informe o motivo do cancelamento do pedido:');
    if (motivo) {
      const pedido = pedidos[index];
      
      try {
        const response = await fetch(`http://localhost:8080/pedido/cancelar/${pedido.id}`, {
          method: 'PUT'
        });
        
        if (response.ok) {
          alert('Pedido cancelado com sucesso!');
          carregarPedidos();
        } else {
          alert('Erro ao cancelar pedido!');
        }
      } catch (error) {
        console.error('Erro ao cancelar pedido:', error);
        alert('Erro ao conectar com o servidor!');
      }
    }
  };

  const handleAceitar = async (index) => {
    const pedido = pedidos[index];
    const senha = Math.floor(1000 + Math.random() * 9000);
    
    try {
      // Tentar usar endpoint específico primeiro
      let response = await fetch(`http://localhost:8080/pedido/aceitar/${pedido.id}`, {
        method: 'PUT'
      });
      
      let responseData = await response.json();
      
      // Se o endpoint não existe, usar criação de novo pedido
      if (responseData.error) {
        const pedidoAtualizado = {
          ...pedido,
          statusPedido: 'ACEITO',
          senhaPedido: senha.toString(),
          dataPedido: new Date().toISOString()
        };
        
        response = await fetch('http://localhost:8080/pedido/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pedidoAtualizado)
        });
        
        if (response.ok) {
          // Atualizar localmente
          const pedidosAtualizados = [...pedidos];
          pedidosAtualizados[index] = {
            ...pedidosAtualizados[index],
            statusPedido: 'ACEITO',
            senhaPedido: senha.toString()
          };
          setPedidos(pedidosAtualizados);
          alert(`Pedido aceito! Senha gerada: ${senha}`);
        }
      } else {
        alert(`Pedido aceito! Senha gerada: ${responseData.senhaPedido}`);
        carregarPedidos();
      }
    } catch (error) {
      console.error('Erro ao aceitar pedido:', error);
      // Fallback total - apenas local
      const pedidosAtualizados = [...pedidos];
      pedidosAtualizados[index] = {
        ...pedidosAtualizados[index],
        statusPedido: 'ACEITO',
        senhaPedido: senha.toString()
      };
      setPedidos(pedidosAtualizados);
      alert(`Pedido aceito! Senha gerada: ${senha}`);
    }
  };

  const handleFinalizar = async (index) => {
    const pedido = pedidos[index];
    
    try {
      const response = await fetch(`http://localhost:8080/pedido/finalizar/${pedido.id}`, {
        method: 'PUT'
      });
      
      if (response.ok) {
        alert('Pedido finalizado com sucesso!');
        carregarPedidos();
      } else {
        alert('Erro ao finalizar pedido!');
      }
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao conectar com o servidor!');
    }
  };

  const handleVoltar = () => navigate(-1);

  const inserirPedidoTeste = () => {
    const novoNumero = (pedidos.length + 1).toString().padStart(3, '0');
    const pedidoExemplo = {
      numero: novoNumero,
      nomeCliente: 'João da Silva',
      dataPedido: new Date().toISOString(),
      produtos: [
        { nome: 'Coxinha', quantidade: 2, preco: 5.0 },
        { nome: 'Refrigerante', quantidade: 1, preco: 4.5 }
      ],
      formaPagamento: 'Pix',
      status: 'pendente',
      total: 14.5
    };

    const pedidosAtualizados = [...pedidos, pedidoExemplo];
    atualizarPedidos(pedidosAtualizados);
    alert('Pedido de teste adicionado!');
  };

  const formatarData = (dataISO) => {
    try {
      const data = new Date(dataISO);
      if (isNaN(data.getTime())) return 'Data inválida';
      return data.toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return 'Data inválida';
    }
  };

  return (
    <div className="historico-container">
      {/* Header Moderno */}
      <div className="historico-header">
        <div className="header-top">
          <button className="btn-voltar" onClick={handleVoltar}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar
          </button>
          <div className="header-actions">
            <button className="btn-refresh" onClick={carregarPedidos} disabled={loading}>
              <FontAwesomeIcon icon={loading ? faSpinner : faRefresh} className={loading ? 'spinning' : ''} />
            </button>
          </div>
        </div>
        
        <div className="header-title">
          <h1>
            <FontAwesomeIcon icon={faShoppingBag} />
            Gerenciar Pedidos
          </h1>
          <p>Acompanhe e gerencie todos os pedidos da cantina</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total de Pedidos</span>
          </div>
        </div>
        
        <div className="stat-card ativo">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.ativo}</span>
            <span className="stat-label">Aguardando</span>
          </div>
        </div>
        
        <div className="stat-card aceito">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.aceito}</span>
            <span className="stat-label">Aceitos</span>
          </div>
        </div>
        
        <div className="stat-card finalizado">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="stat-info">
            <span className="stat-number">{stats.finalizado}</span>
            <span className="stat-label">Finalizados</span>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="filters-section">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por cliente, ID ou produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          className={`btn-filter ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FontAwesomeIcon icon={faFilter} />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Status:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="TODOS">Todos os Status</option>
              <option value="ATIVO">Aguardando</option>
              <option value="ACEITO">Aceitos</option>
              <option value="FINALIZADO">Finalizados</option>
              <option value="CANCELADO">Cancelados</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Período:</label>
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="TODOS">Todos os Períodos</option>
              <option value="HOJE">Hoje</option>
              <option value="SEMANA">Última Semana</option>
              <option value="MES">Este Mês</option>
            </select>
          </div>
        </div>
      )}

      {/* Lista de Pedidos */}
      <div className="pedidos-content">
        {loading ? (
          <div className="loading-state">
            <FontAwesomeIcon icon={faSpinner} className="spinning" />
            <p>Carregando pedidos...</p>
          </div>
        ) : pedidosFiltrados.length === 0 ? (
          <div className="empty-state">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <h3>Nenhum pedido encontrado</h3>
            <p>Não há pedidos que correspondam aos filtros selecionados.</p>
          </div>
        ) : (
          <div className="pedidos-grid">
            {pedidosFiltrados.map((pedido, i) => (
              <div className="pedido-card" key={pedido.id || i}>
                <div className="card-header">
                  <div className="pedido-id">
                    <FontAwesomeIcon icon={faShoppingBag} />
                    <span>#{pedido.id}</span>
                  </div>
                  <span className={`status-badge status-${pedido.statusPedido?.toLowerCase()}`}>
                    {getStatusIcon(pedido.statusPedido)}
                    {getStatusText(pedido.statusPedido)}
                  </span>
                </div>

                <div className="card-body">
                  <div className="cliente-info">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{pedido.usuario?.nome || 'Cliente não identificado'}</span>
                  </div>
                  
                  <div className="pedido-details">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>{formatarData(pedido.dataPedido)}</span>
                    </div>
                    
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCreditCard} />
                      <span>{pedido.formaPagto}</span>
                    </div>
                    
                    <div className="detail-item valor">
                      <FontAwesomeIcon icon={faMoneyBillWave} />
                      <span>R$ {pedido.valor ? pedido.valor.toFixed(2) : '0.00'}</span>
                    </div>
                  </div>

                  {pedido.infoPedido && (
                    <div className="pedido-items">
                      <h4>Itens do pedido:</h4>
                      <p>{pedido.infoPedido.includes('Itens:') ? 
                          pedido.infoPedido.split('Itens: ')[1] : 
                          pedido.infoPedido}
                      </p>
                    </div>
                  )}

                  {pedido.statusPedido === 'ACEITO' && pedido.senhaPedido && (
                    <div className="senha-retirada">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>Senha: <strong>{pedido.senhaPedido}</strong></span>
                    </div>
                  )}

                  {pedido.statusPedido === 'CANCELADO' && (
                    <div className="cancelamento-info">
                      <FontAwesomeIcon icon={faTimesCircle} />
                      <span>Motivo: {pedido.motivoCancelamento || 'Não informado'}</span>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  {pedido.statusPedido === 'ATIVO' && (
                    <>
                      <button className="btn-aceitar" onClick={() => handleAceitar(i)}>
                        <FontAwesomeIcon icon={faCheck} />
                        Aceitar
                      </button>
                      <button className="btn-cancelar" onClick={() => handleCancelar(i)}>
                        <FontAwesomeIcon icon={faTimes} />
                        Cancelar
                      </button>
                    </>
                  )}
                  {pedido.statusPedido === 'ACEITO' && (
                    <button className="btn-finalizar" onClick={() => handleFinalizar(i)}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      Finalizar
                    </button>
                  )}
                  <button className="btn-detalhes" onClick={() => navigate(`/historico-detalhado/${pedido.id}`)}>
                    <FontAwesomeIcon icon={faEye} />
                    Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  function getStatusIcon(status) {
    switch (status) {
      case 'ATIVO': return <FontAwesomeIcon icon={faClock} />;
      case 'ACEITO': return <FontAwesomeIcon icon={faCheckCircle} />;
      case 'FINALIZADO': return <FontAwesomeIcon icon={faCheck} />;
      case 'CANCELADO': return <FontAwesomeIcon icon={faTimesCircle} />;
      default: return <FontAwesomeIcon icon={faClock} />;
    }
  }

  function getStatusText(status) {
    switch (status) {
      case 'ATIVO': return 'Aguardando';
      case 'ACEITO': return 'Aceito';
      case 'FINALIZADO': return 'Finalizado';
      case 'CANCELADO': return 'Cancelado';
      default: return status;
    }
  }
};

export default Historico;
