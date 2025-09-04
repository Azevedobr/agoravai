import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faUser, faCalendarAlt, faCreditCard, faMoneyBillWave,
  faShoppingBag, faCheck, faTimes, faCheckCircle, faTimesCircle,
  faClock, faMapMarkerAlt, faPhone, faEnvelope, faPrint, faDownload,
  faEdit, faTrash, faExclamationTriangle, faInfoCircle, faReceipt
} from '@fortawesome/free-solid-svg-icons';
import './HistoricoDetalhado.css';

const HistoricoDetalhado = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarPedido();
  }, [id]);

  const carregarPedido = async () => {
    setLoading(true);
    try {
      // Tentar carregar do backend primeiro
      const response = await fetch(`http://localhost:8080/pedido/${id}`);
      if (response.ok) {
        const pedidoData = await response.json();
        setPedido(pedidoData);
      } else {
        throw new Error('Pedido não encontrado no servidor');
      }
    } catch (error) {
      console.error('Erro ao carregar do backend:', error);
      // Fallback para localStorage
      try {
        const dados = localStorage.getItem('pedidos');
        const pedidos = dados ? JSON.parse(dados) : [];
        const pedidoEncontrado = pedidos.find(p => p.id?.toString() === id?.toString());
        
        if (pedidoEncontrado) {
          setPedido(pedidoEncontrado);
        } else {
          setError('Pedido não encontrado');
        }
      } catch {
        setError('Erro ao carregar dados do pedido');
      }
    } finally {
      setLoading(false);
    }
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

  const getStatusInfo = (status) => {
    switch(status?.toLowerCase()) {
      case 'ativo':
      case 'pendente':
        return { icon: faClock, color: '#FF9500', text: 'Aguardando Confirmação' };
      case 'aceito':
        return { icon: faCheckCircle, color: '#6C63FF', text: 'Aceito - Preparando' };
      case 'finalizado':
      case 'pago':
        return { icon: faCheck, color: '#00C851', text: 'Finalizado' };
      case 'cancelado':
        return { icon: faTimesCircle, color: '#FF3547', text: 'Cancelado' };
      default:
        return { icon: faInfoCircle, color: '#6C63FF', text: status || 'Desconhecido' };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="detalhado-container">
        <div className="loading-state">
          <FontAwesomeIcon icon={faClock} className="spinning" />
          <p>Carregando detalhes do pedido...</p>
        </div>
      </div>
    );
  }

  if (error || !pedido) {
    return (
      <div className="detalhado-container">
        <div className="error-state">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <h3>Pedido não encontrado</h3>
          <p>{error || 'O pedido solicitado não existe ou foi removido.'}</p>
          <button className="btn-voltar-error" onClick={() => navigate('/historico')}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar ao Histórico
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(pedido.statusPedido || pedido.status);

  return (
    <div className="detalhado-container">
      {/* Header */}
      <div className="detalhado-header">
        <button className="btn-voltar-detalhado" onClick={() => navigate('/historico')}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Voltar
        </button>
        
        <div className="header-info">
          <h1>
            <FontAwesomeIcon icon={faReceipt} />
            Pedido #{pedido.id}
          </h1>
          <p>Detalhes completos do pedido</p>
        </div>

        <div className="header-actions">
          <button className="btn-print" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} />
            Imprimir
          </button>
        </div>
      </div>

      {/* Status Card */}
      <div className="status-card">
        <div className="status-icon" style={{ color: statusInfo.color }}>
          <FontAwesomeIcon icon={statusInfo.icon} />
        </div>
        <div className="status-info">
          <h3>{statusInfo.text}</h3>
          <p>Atualizado em {formatarData(pedido.dataPedido)}</p>
        </div>
        <div className="status-badge" style={{ backgroundColor: statusInfo.color }}>
          {pedido.statusPedido || pedido.status}
        </div>
      </div>

      {/* Main Content */}
      <div className="detalhado-content">
        {/* Cliente Info */}
        <div className="info-section">
          <h3>
            <FontAwesomeIcon icon={faUser} />
            Informações do Cliente
          </h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Nome:</span>
              <span className="info-value">{pedido.usuario?.nome || pedido.nomeCliente || 'Não informado'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Data do Pedido:</span>
              <span className="info-value">{formatarData(pedido.dataPedido)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Forma de Pagamento:</span>
              <span className="info-value">{pedido.formaPagto || pedido.formaPagamento || 'Não informado'}</span>
            </div>
          </div>
        </div>

        {/* Produtos */}
        <div className="info-section">
          <h3>
            <FontAwesomeIcon icon={faShoppingBag} />
            Itens do Pedido
          </h3>
          <div className="produtos-detalhado">
            {pedido.infoPedido && pedido.infoPedido.includes('Itens:') ? (
              <div className="produtos-texto">
                <p>{pedido.infoPedido.split('Itens: ')[1]}</p>
              </div>
            ) : pedido.produtos && pedido.produtos.length > 0 ? (
              <div className="produtos-lista">
                {pedido.produtos.map((produto, index) => (
                  <div key={index} className="produto-item">
                    <div className="produto-info">
                      <span className="produto-nome">{produto.nome}</span>
                      <span className="produto-quantidade">Quantidade: {produto.quantidade}</span>
                    </div>
                    <div className="produto-preco">
                      <span className="preco-unitario">R$ {produto.preco?.toFixed(2)}</span>
                      <span className="preco-total">R$ {(produto.preco * produto.quantidade)?.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">Informações dos produtos não disponíveis</p>
            )}
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="info-section resumo-financeiro">
          <h3>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            Resumo Financeiro
          </h3>
          <div className="resumo-grid">
            <div className="resumo-item">
              <span className="resumo-label">Subtotal:</span>
              <span className="resumo-value">R$ {pedido.valor?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="resumo-item">
              <span className="resumo-label">Taxa de Serviço:</span>
              <span className="resumo-value">R$ 0.00</span>
            </div>
            <div className="resumo-item total">
              <span className="resumo-label">Total:</span>
              <span className="resumo-value">R$ {pedido.valor?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </div>

        {/* Informações Especiais */}
        {(pedido.statusPedido === 'ACEITO' || pedido.status === 'aceito') && pedido.senhaPedido && (
          <div className="info-section senha-section">
            <h3>
              <FontAwesomeIcon icon={faCheckCircle} />
              Informações para Retirada
            </h3>
            <div className="senha-info">
              <div className="senha-item">
                <span className="senha-label">Senha para Retirada:</span>
                <span className="senha-value">{pedido.senhaPedido}</span>
              </div>
              <p className="senha-instrucao">
                Apresente esta senha no balcão da cantina para retirar seu pedido.
              </p>
            </div>
          </div>
        )}

        {(pedido.statusPedido === 'CANCELADO' || pedido.status === 'cancelado') && (
          <div className="info-section cancelamento-section">
            <h3>
              <FontAwesomeIcon icon={faTimesCircle} />
              Informações do Cancelamento
            </h3>
            <div className="cancelamento-info">
              <p><strong>Motivo:</strong> {pedido.motivoCancelamento || 'Não informado'}</p>
              <p><strong>Data:</strong> {formatarData(pedido.dataPedido)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricoDetalhado;