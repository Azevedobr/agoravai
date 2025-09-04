import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Carrinho.css';
import { PedidoService, CarrinhoService, UsuarioService } from '../../services';
import AppHeader from '../../components/AppHeader';

const Carrinho = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagamento, setPagamento] = useState('');

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const carregarCarrinho = async () => {
    const usuario = UsuarioService.getCurrentUser();
    if (!usuario) return;

    try {
      // Carregar do carrinho temporário
      const carrinhoKey = `carrinho_${usuario.id}`;
      const carrinhoData = sessionStorage.getItem(carrinhoKey);
      
      if (carrinhoData) {
        const itens = JSON.parse(carrinhoData);
        setItems(itens);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  useEffect(() => {
    const subtotal = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    setTotal(subtotal);
  }, [items]);



  const handleIncrementar = (id) => {
    const usuario = UsuarioService.getCurrentUser();
    const novosItens = items.map(item => item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item);
    setItems(novosItens);
    
    // Atualizar sessionStorage
    const carrinhoKey = `carrinho_${usuario.id}`;
    sessionStorage.setItem(carrinhoKey, JSON.stringify(novosItens));
  };

  const handleDecrementar = (id) => {
    const usuario = UsuarioService.getCurrentUser();
    const novosItens = items.map(item =>
      item.id === id && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );
    setItems(novosItens);
    
    // Atualizar sessionStorage
    const carrinhoKey = `carrinho_${usuario.id}`;
    sessionStorage.setItem(carrinhoKey, JSON.stringify(novosItens));
  };

  const handleRemover = (id) => {
    const usuario = UsuarioService.getCurrentUser();
    const novosItens = items.filter(item => item.id !== id);
    setItems(novosItens);
    
    // Atualizar sessionStorage
    const carrinhoKey = `carrinho_${usuario.id}`;
    sessionStorage.setItem(carrinhoKey, JSON.stringify(novosItens));
  };

  const handlePagamentoChange = (opcao) => {
    setPagamento(opcao);
  };

  const handlePagar = async () => {
    if (!pagamento || items.length === 0) return;
    
    const usuario = UsuarioService.getCurrentUser();
    if (!usuario) {
      alert('Você precisa estar logado para fazer um pedido!');
      navigate('/entraraluno');
      return;
    }
  
    try {
      // Criar pedido no banco usando JSON
      const itensTexto = items.map(item => 
        `${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}`
      ).join('; ');
      
      const pedidoData = {
        usuario: { id: usuario.id },
        valor: parseFloat(total.toFixed(2)),
        formaPagto: pagamento,
        infoPedido: `Pedido de ${usuario.nome} - Itens: ${itensTexto}`,
        statusPedido: 'ATIVO',
        dataPedido: new Date().toISOString()
      };
      
      console.log('Enviando pedido:', pedidoData);
      
      const response = await fetch('http://localhost:8080/pedido/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoData)
      });
      
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response body:', responseText);
      
      if (response.ok) {
        // Limpar carrinho temporário
        const carrinhoKey = `carrinho_${usuario.id}`;
        sessionStorage.removeItem(carrinhoKey);
        
        alert('Pedido realizado com sucesso!');
        setItems([]);
        navigate('/pedidos');
      } else {
        throw new Error(`Erro ao criar pedido: ${responseText}`);
      }
    } catch (error) {
      console.error('Erro ao conectar com backend:', error);
      // Fallback: salvar no localStorage
      const novoPedido = {
        id: Date.now(),
        precoTotal: total,
        produtos: items.map((item) => ({
          nome: item.nome,
          quantidade: item.quantidade,
          preco: item.preco
        })),
        nomeCliente: usuario.nome,
        formaPagamento: pagamento,
        status: 'pendente',
        data: new Date().toISOString()
      };
      
      const pedidosExistentes = JSON.parse(localStorage.getItem('pedidos')) || [];
      pedidosExistentes.push(novoPedido);
      localStorage.setItem('pedidos', JSON.stringify(pedidosExistentes));
      
      alert('Pedido realizado com sucesso!');
      setItems([]);
      navigate('/pedidos');
    }
  };

  const EmptyCart = () => (
    <div className="empty-cart">
      <div className="empty-cart-icon">🛒</div>
      <h3 className="empty-cart-title">Seu carrinho está vazio</h3>
      <p className="empty-cart-description">
        Adicione alguns produtos deliciosos do nosso menu
      </p>
      <button 
        className="continue-shopping-btn"
        onClick={() => navigate('/menu')}
      >
        🍕 Explorar Menu
      </button>
    </div>
  );

  return (
    <>
      <AppHeader title="Meu Carrinho" subtitle="Finalize sua compra" showBack={true} showCart={false} />
      
      <div className="main-container">
        <main className="cart-main">
          <div className="carrinho-container">
            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                {/* Lista de itens */}
                <div className="cart-header">
                  <h2 className="cart-title">
                    🛒 Seus Itens ({items.length})
                  </h2>
                </div>

                <div className="items-list">
                  {items.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="item-image">
                        <div className="product-placeholder">
                          🍽️
                        </div>
                      </div>
                      
                      <div className="product-info">
                        <h3 className="product-name">{item.nome}</h3>
                        <p className="product-price">R$ {item.preco.toFixed(2)} cada</p>
                        
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn decrease" 
                            onClick={() => handleDecrementar(item.id)}
                            disabled={item.quantidade <= 1}
                          >
                            −
                          </button>
                          <span className="quantity-value">{item.quantidade}</span>
                          <button 
                            className="quantity-btn increase" 
                            onClick={() => handleIncrementar(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="item-right-section">
                        <p className="item-total">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                        <button 
                          className="remove-btn" 
                          onClick={() => handleRemover(item.id)}
                          title="Remover item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumo e pagamento */}
                <div className="summary-section">
                  <div className="total-container">
                    <div className="total-row">
                      <span className="total-label">Subtotal:</span>
                      <span className="total-value">R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="total-row final">
                      <span className="total-label">Total:</span>
                      <span className="total-value">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="payment-methods">
                    <h3>💳 Forma de Pagamento</h3>
                    <div className="payment-options">
                      {[
                        { id: 'dinheiro', icon: '💵', label: 'Dinheiro' },
                        { id: 'cartao', icon: '💳', label: 'Cartão' },
                        { id: 'pix', icon: '📱', label: 'PIX' }
                      ].map((opcao) => (
                        <div 
                          key={opcao.id}
                          className={`payment-option ${pagamento === opcao.id ? 'selected' : ''}`}
                          onClick={() => handlePagamentoChange(opcao.id)}
                        >
                          <div className="payment-icon">{opcao.icon}</div>
                          <span className="payment-label">{opcao.label}</span>
                          <div className="payment-radio">
                            {pagamento === opcao.id && <div className="radio-selected">✓</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    className={`checkout-button ${!pagamento ? 'disabled' : ''}`}
                    disabled={!pagamento} 
                    onClick={handlePagar}
                  >
                    🚀 Finalizar Pedido - R$ {total.toFixed(2)}
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Carrinho;