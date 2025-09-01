import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoricoDetalhado.css';

const HistoricoDetalhado = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = () => {
    let pedidosSalvos = [];
    try {
      const dados = localStorage.getItem('pedidos');
      pedidosSalvos = dados ? JSON.parse(dados) : [];
    } catch {
      pedidosSalvos = [];
    }

    const agora = new Date();
    const pedidosFiltrados = pedidosSalvos.filter(pedido => {
      if (!pedido.dataPedido) return true;
      try {
        const dataPedido = new Date(pedido.dataPedido);
        const diffHoras = (agora - dataPedido) / (1000 * 60 * 60);
        return diffHoras <= 24 || pedido.status === 'aceito' || pedido.status === 'pago';
      } catch {
        return true;
      }
    });

    localStorage.setItem('pedidos', JSON.stringify(pedidosFiltrados));
    setPedidos(pedidosFiltrados);
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const atualizarPedidos = (pedidosAtualizados) => {
    localStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
    setPedidos(pedidosAtualizados);
  };

  const handleCancelar = (index) => {
    const motivo = prompt('Por favor, informe o motivo do cancelamento do pedido:');
    if (motivo) {
      const pedidosAtualizados = [...pedidos];
      pedidosAtualizados[index] = {
        ...pedidosAtualizados[index],
        status: 'cancelado',
        motivoCancelamento: motivo,
      };
      atualizarPedidos(pedidosAtualizados);
    }
  };

  const handleAceitar = (index) => {
    const senha = Math.floor(1000 + Math.random() * 9000);
    const numeroPedido = Math.floor(100000 + Math.random() * 900000);

    const pedidosAtualizados = [...pedidos];
    pedidosAtualizados[index] = {
      ...pedidosAtualizados[index],
      status: 'aceito',
      senhaPedido: senha,
      numeroPedido: numeroPedido,
    };
    atualizarPedidos(pedidosAtualizados);
  };

  const handleFinalizar = (index) => {
    const pedidosAtualizados = [...pedidos];
    pedidosAtualizados[index] = {
      ...pedidosAtualizados[index],
      status: 'pago'
    };
    atualizarPedidos(pedidosAtualizados);
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

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pendente': return '⏳';
      case 'aceito': return '✅';
      case 'cancelado': return '❌';
      case 'pago': return '💰';
      default: return '📋';
    }
  };

  const calcularTotal = (produtos) => {
    if (!produtos) return 0;
    return produtos.reduce((acc, p) => acc + ((p.preco || 0) * (p.quantidade || 0)), 0);
  };

  return (
    <div className="historico-novo-container">
      <div className="historico-content">
        <div className="historico-header">
          <button className="btn-voltar-novo" onClick={() => navigate(-1)}>
            ← Voltar
          </button>
          <h1>Gestão de Pedidos</h1>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{pedidos.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{pedidos.filter(p => p.status === 'pendente').length}</span>
              <span className="stat-label">Pendentes</span>
            </div>
          </div>
        </div>

        {pedidos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>Nenhum pedido encontrado</h3>
            <p>Os pedidos aparecerão aqui quando forem realizados</p>
          </div>
        ) : (
          <div className="pedidos-grid">
            {pedidos.map((pedido, i) => (
              <div className="pedido-card-novo" key={i}>
                <div className="card-header-novo">
                  <div className="pedido-info-header">
                    <h3>Pedido #{String(pedido.numero).slice(-6)}</h3>
                    <span className="pedido-data">{formatarData(pedido.dataPedido)}</span>
                  </div>
                  <div className={`status-badge-novo status-${pedido.status}`}>
                    <span className="status-icon">{getStatusIcon(pedido.status)}</span>
                    {pedido.status.toUpperCase()}
                  </div>
                </div>

                <div className="card-body-novo">
                  <div className="cliente-info">
                    <div className="info-row">
                      <span className="info-label">👤 Cliente:</span>
                      <span className="info-value">{pedido.nomeCliente}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">💳 Pagamento:</span>
                      <span className="info-value">{pedido.formaPagamento}</span>
                    </div>
                  </div>

                  <div className="produtos-section">
                    <h4>Produtos:</h4>
                    <div className="produtos-lista-novo">
                      {pedido.produtos && pedido.produtos.map((p, idx) => (
                        <div key={idx} className="produto-row">
                          <span className="produto-nome">{p.nome || 'Produto'}</span>
                          <span className="produto-qtd">x{p.quantidade || 0}</span>
                          <span className="produto-preco">R$ {((p.preco || 0) * (p.quantidade || 0)).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="total-pedido">
                      <strong>Total: R$ {calcularTotal(pedido.produtos).toFixed(2)}</strong>
                    </div>
                  </div>

                  {pedido.status === 'cancelado' && (
                    <div className="cancelamento-info">
                      <strong>Motivo:</strong> {pedido.motivoCancelamento}
                    </div>
                  )}

                  {pedido.status === 'aceito' && (
                    <div className="aceito-info">
                      <div className="info-row">
                        <span className="info-label">🔢 Nº Pedido:</span>
                        <span className="info-value">{pedido.numeroPedido}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">🔐 Senha:</span>
                        <span className="info-value senha-destaque">{pedido.senhaPedido}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  {pedido.status === 'pendente' && (
                    <>
                      <button className="btn-aceitar" onClick={() => handleAceitar(i)}>
                        ✅ Aceitar
                      </button>
                      <button className="btn-cancelar" onClick={() => handleCancelar(i)}>
                        ❌ Cancelar
                      </button>
                    </>
                  )}
                  {pedido.status === 'aceito' && (
                    <button className="btn-finalizar" onClick={() => handleFinalizar(i)}>
                      💰 Finalizar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricoDetalhado;