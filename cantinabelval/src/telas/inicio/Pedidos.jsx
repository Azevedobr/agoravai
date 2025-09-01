import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega pedidos do localStorage
    const dados = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos([...dados].reverse());
  }, []);

  const handleVoltar = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="pedidos-container">
      <div className="pedidos-header">
        <button onClick={handleVoltar} className="btn-voltar">
          ← Voltar
        </button>
        <h1>Meus Pedidos</h1>
      </div>

      {pedidos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p className="sem-pedidos">Nenhum pedido encontrado</p>
          <p className="empty-subtitle">Faça seu primeiro pedido!</p>
        </div>
      ) : (
        <div className="lista-pedidos">
          {pedidos.map((pedido, index) => {
            const dataFormatada = pedido.data
              ? new Date(pedido.data).toLocaleDateString()
              : pedido.dataPedido
              ? new Date(pedido.dataPedido).toLocaleDateString()
              : 'Data não disponível';
            const total = pedido.precoTotal || 
              (pedido.produtos
                ? pedido.produtos.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0)
                : 0);

            return (
              <div className="pedido-card" key={pedido.numero || index}>
                <div className="pedido-header-card">
                  <div className="pedido-info-header">
                    <h2>Pedido #{(pedido.numero || Date.now()).toString().slice(-6)}</h2>
                    <span className="data-pedido">{dataFormatada}</span>
                  </div>
                  <div className={`status-badge ${pedido.status || 'pendente'}`}>
                    {pedido.status || 'Em análise'}
                  </div>
                </div>

                <div className="pedido-info">
                  <div className="info-row">
                    <span className="label">Cliente:</span>
                    <span>{pedido.nomeCliente || 'Cliente'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Pagamento:</span>
                    <span>{pedido.formaPagamento || 'Não informado'}</span>
                  </div>
                  
                  {pedido.status === 'cancelado' && pedido.motivoCancelamento && (
                    <div className="info-row">
                      <span className="label">Motivo:</span>
                      <span>{pedido.motivoCancelamento}</span>
                    </div>
                  )}
                  
                  {pedido.status === 'aceito' && (
                    <>
                      <div className="info-row">
                        <span className="label">Nº Pedido:</span>
                        <span>{pedido.numeroPedido}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Senha:</span>
                        <span className="senha-destaque">{pedido.senhaPedido}</span>
                      </div>
                    </>
                  )}
                </div>

                {pedido.produtos && pedido.produtos.length > 0 && (
                  <div className="produtos-lista">
                    <h4>Itens do pedido:</h4>
                    {pedido.produtos.map((produto, produtoIndex) => (
                      <div className="produto-item" key={produtoIndex}>
                        <span className="produto-nome">{produto.nome}</span>
                        <div className="produto-detalhes">
                          <span className="quantidade">x{produto.quantidade}</span>
                          <span className="preco">R$ {(produto.preco * produto.quantidade).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pedido-total">
                  <span>Total do pedido:</span>
                  <span className="valor-total">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Pedidos;