import React from 'react';
import './CarrinhoModal.css';

const DescricaoModal = ({ isOpen, onClose, produto }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-icon">📖</div>
          <h3>Descrição do Produto</h3>
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
            <p style={{ marginTop: '16px', textAlign: 'left', lineHeight: '1.5', color: '#2c3e50' }}>
              {produto.descricao}
            </p>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            className="btn-carrinho"
            onClick={onClose}
          >
            ✅ Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescricaoModal;