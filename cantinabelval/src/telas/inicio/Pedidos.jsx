import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioService } from '../../services';
import './Pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const usuario = UsuarioService.getCurrentUser();
      if (!usuario) {
        navigate('/entraraluno');
        return;
      }

      const response = await fetch('http://localhost:8080/pedido/findAll');
      const pedidosData = await response.json();
      console.log('Todos os pedidos:', pedidosData);
      
      // Filtrar apenas pedidos do usuário logado
      const pedidosDoUsuario = pedidosData.filter(pedido => 
        pedido.usuario && pedido.usuario.id === usuario.id
      );
      console.log('Pedidos do usuário:', pedidosDoUsuario);
      
      setPedidos(pedidosDoUsuario.reverse());
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      // Fallback para localStorage
      const dados = JSON.parse(localStorage.getItem('pedidos')) || [];
      setPedidos([...dados].reverse());
    }
  };

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
            const dataFormatada = pedido.dataPedido
              ? new Date(pedido.dataPedido).toLocaleDateString()
              : 'Data não disponível';
            const total = pedido.valor || 0;

            return (
              <div className="pedido-card" key={pedido.numero || index}>
                <div className="pedido-header-card">
                  <div className="pedido-info-header">
                    <h2>Pedido #{pedido.id}</h2>
                    <span className="data-pedido">{dataFormatada}</span>
                  </div>
                  <div className={`status-badge ${pedido.statusPedido?.toLowerCase() || 'ativo'}`}>
                    {pedido.statusPedido || 'ATIVO'}
                  </div>
                </div>

                <div className="pedido-info">
                  <div className="info-row">
                    <span className="label">Cliente:</span>
                    <span>{pedido.usuario?.nome || 'Cliente'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Pagamento:</span>
                    <span>{pedido.formaPagto || 'Não informado'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Informações:</span>
                    <span>{pedido.infoPedido || 'Sem informações'}</span>
                  </div>
                  
                  {pedido.statusPedido === 'CANCELADO' && (
                    <div className="info-row">
                      <span className="label">Status:</span>
                      <span>Pedido cancelado</span>
                    </div>
                  )}
                  
                  {pedido.statusPedido === 'ACEITO' && pedido.senhaPedido && (
                    <>
                      <div className="info-row">
                        <span className="label">Nº Pedido:</span>
                        <span>{pedido.id}</span>
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