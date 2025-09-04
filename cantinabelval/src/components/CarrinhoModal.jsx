import React from 'react';
import './CarrinhoModal.css';

const CarrinhoModal = ({ isOpen, onClose, produto, onIrCarrinho, onContinuarComprando }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-icon">✅</div>
          <h3>Produto Adicionado!</h3>
        </div>
        
        <div className="modal-body">
          <div className="produto-info">
            <h4>{produto.nome}</h4>
            <p className="produto-preco">
              {Number(produto.preco).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            className="btn-continuar"
            onClick={onContinuarComprando}
          >
            🛍️ Continuar Comprando
          </button>
          <button 
            className="btn-carrinho"
            onClick={onIrCarrinho}
          >
            🛒 Ir para Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarrinhoModal;