import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CentralAjuda.css';

const CentralAjuda = () => {
  const navigate = useNavigate();

  return (
    <div className="help-container">
      <div className="help-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <h1>Central de Ajuda</h1>
        <p>Estamos aqui para ajudar você</p>
      </div>

      <div className="help-content">
        <div className="contact-section">
          <h2>Entre em Contato</h2>
          
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <p>suporte@finnfood.com</p>
              <span>Resposta em até 24h</span>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Telefone</h3>
              <p>(11) 99999-8888</p>
              <span>Seg-Sex: 8h às 18h</span>
            </div>

            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>(11) 99999-8888</p>
              <span>Atendimento rápido</span>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>Perguntas Frequentes</h2>
          
          <div className="faq-item">
            <h4>Como fazer um pedido?</h4>
            <p>Acesse o menu, escolha seus produtos e finalize no carrinho.</p>
          </div>

          <div className="faq-item">
            <h4>Quais formas de pagamento aceitas?</h4>
            <p>Aceitamos PIX, cartão de débito, crédito e dinheiro.</p>
          </div>

          <div className="faq-item">
            <h4>Como acompanhar meu pedido?</h4>
            <p>Vá na seção "Pedidos" para ver o status em tempo real.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralAjuda;