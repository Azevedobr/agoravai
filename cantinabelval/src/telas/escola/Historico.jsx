import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Historico.css';

const Historico = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = () => {
    let pedidosSalvos = [];
    try {
      const dados = localStorage.getItem('pedidos');
      pedidosSalvos = dados ? JSON.parse(dados) : [];
      // Garantir que é um array
      if (!Array.isArray(pedidosSalvos)) {
        pedidosSalvos = [];
      }
    } catch {
      pedidosSalvos = [];
    }

    // Filtrar pedidos válidos
    const pedidosValidos = pedidosSalvos.filter(pedido => 
      pedido && typeof pedido === 'object'
    );

    setPedidos(pedidosValidos);
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
                    <strong>Pedido #{pedido.numero}</strong> - <span className="data-pedido">{formatarData(pedido.dataPedido)}</span>
                  </div>
                  <span className={`status-badge status-${pedido.status}`}>
                    {pedido.status.toUpperCase()}
                  </span>
                </div>

                <div className="info-pedido">
                  <p><strong>Cliente:</strong> {pedido.nomeCliente}</p>
                  <p><strong>Pagamento:</strong> {pedido.formaPagamento}</p>
                </div>

                <div className="produtos-pedido">
                  {pedido.produtos && Array.isArray(pedido.produtos) && pedido.produtos.map((p, idx) => (
                    <div key={idx} className="produto-item">
                      <span>{p.nome || 'Produto'}</span>
                      <span>Qtd: {p.quantidade || 0}</span>
                      <span>R$ {((p.preco || 0) * (p.quantidade || 0)).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="total-pedido">
                    <strong>Total: R$ {pedido.total ? pedido.total.toFixed(2) : 
                      (pedido.produtos && Array.isArray(pedido.produtos) ? 
                        pedido.produtos.reduce((sum, p) => sum + ((p.preco || 0) * (p.quantidade || 0)), 0).toFixed(2) : 
                        '0.00'
                      )}
                    </strong>
                  </div>
                </div>

                {pedido.status === 'cancelado' && (
                  <p className="motivo-cancelamento">
                    <strong>Motivo do cancelamento:</strong> {pedido.motivoCancelamento}
                  </p>
                )}

                {pedido.status === 'aceito' && (
                  <>
                    <p><strong>Nº do Pedido:</strong> {pedido.numeroPedido}</p>
                    <p><strong>Senha para retirada:</strong> {pedido.senhaPedido}</p>
                  </>
                )}

                <div className="acoes-pedido">
                  {pedido.status === 'pendente' && (
                    <>
                      <button className="botao-verde" onClick={() => handleAceitar(i)}>Aceitar</button>
                      <button className="botao-vermelho" onClick={() => handleCancelar(i)}>Cancelar</button>
                    </>
                  )}
                  {pedido.status === 'aceito' && (
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
