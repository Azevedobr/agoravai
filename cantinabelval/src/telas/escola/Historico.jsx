import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Historico.css';

const Historico = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = async () => {
    try {
      const response = await fetch('http://localhost:8080/pedido/findAll');
      const pedidosData = await response.json();
      setPedidos(pedidosData.reverse());
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
    }
  };

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
    <div className="caixa-historico">
      <div className="conteudo-historico">
        <h2>Pedidos Recebidos</h2>

        <div className="botoes-acao">
          <button className="botao-voltar" onClick={handleVoltar}>← Voltar</button>
          <button className="botao-azul" onClick={inserirPedidoTeste}>+ Adicionar Pedido de Teste</button>
        </div>

        {pedidos.length === 0 ? (
          <p className="sem-pedidos">Nenhum pedido disponível.</p>
        ) : (
          <div className="lista-pedidos">
            {pedidos.map((pedido, i) => (
              <div className="card-pedido" key={i}>
                <div className="header-card">
                  <div>
                    <strong>Pedido #{pedido.id}</strong> - <span className="data-pedido">{formatarData(pedido.dataPedido)}</span>
                  </div>
                  <span className={`status-badge status-${pedido.statusPedido?.toLowerCase()}`}>
                    {pedido.statusPedido?.toUpperCase()}
                  </span>
                </div>

                <div className="info-pedido">
                  <p><strong>Cliente:</strong> {pedido.usuario?.nome}</p>
                  <p><strong>Pagamento:</strong> {pedido.formaPagto}</p>
                  <p><strong>Informações:</strong> {pedido.infoPedido}</p>
                </div>

                <div className="produtos-pedido">
                  {pedido.infoPedido && pedido.infoPedido.includes('Itens:') && (
                    <div className="itens-pedido">
                      <h4>Itens do pedido:</h4>
                      <p>{pedido.infoPedido.split('Itens: ')[1] || 'Itens não disponíveis'}</p>
                    </div>
                  )}
                  <div className="total-pedido">
                    <strong>Total: R$ {pedido.valor ? pedido.valor.toFixed(2) : '0.00'}</strong>
                  </div>
                </div>

                {pedido.statusPedido === 'CANCELADO' && (
                  <p className="motivo-cancelamento">
                    <strong>Motivo do cancelamento:</strong> {pedido.motivoCancelamento || 'Ver informações do pedido'}
                  </p>
                )}

                {pedido.statusPedido === 'ACEITO' && pedido.senhaPedido && (
                  <div className="pedido-aceito">
                    <p><strong>Nº do Pedido:</strong> {pedido.id}</p>
                    <p><strong>Senha para retirada:</strong> <span className="senha-destaque">{pedido.senhaPedido}</span></p>
                  </div>
                )}

                <div className="acoes-pedido">
                  {pedido.statusPedido === 'ATIVO' && (
                    <>
                      <button className="botao-verde" onClick={() => handleAceitar(i)}>Aceitar</button>
                      <button className="botao-vermelho" onClick={() => handleCancelar(i)}>Cancelar</button>
                    </>
                  )}
                  {pedido.statusPedido === 'ACEITO' && (
                    <button className="botao-azul" onClick={() => handleFinalizar(i)}>Finalizar</button>
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

export default Historico;
