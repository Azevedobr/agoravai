import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiArrowRight,
  FiShoppingCart,
  FiCreditCard,
  FiClock,
  FiCheck,
  FiMapPin,
  FiPlay,
  FiX
} from 'react-icons/fi';
import './Tutorial.css';

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Bem-vindo ao FinnFood! 🎉",
      description: "Vamos te ensinar como fazer seu primeiro pedido de forma rápida e fácil.",
      icon: "🍽️",
      content: (
        <div className="tutorial-welcome">
          <div className="welcome-animation">
            <div className="phone-demo">
              <div className="screen">
                <div className="app-logo">🍽️</div>
                <div className="welcome-text">FinnFood</div>
              </div>
            </div>
          </div>
          <p>Em apenas 3 passos simples você terá seu lanche pronto!</p>
        </div>
      )
    },
    {
      id: 2,
      title: "1️⃣ Escolha seus produtos",
      description: "Navegue pelo menu e adicione os itens que deseja ao carrinho.",
      icon: <FiShoppingCart />,
      content: (
        <div className="tutorial-step">
          <div className="step-demo">
            <div className="menu-demo">
              <div className="menu-item">
                <span className="food-emoji">🍕</span>
                <div className="item-info">
                  <h4>Pizza Margherita</h4>
                  <p>R$ 12,90</p>
                </div>
                <button className="add-btn">+</button>
              </div>
              <div className="menu-item">
                <span className="food-emoji">🥤</span>
                <div className="item-info">
                  <h4>Refrigerante</h4>
                  <p>R$ 4,50</p>
                </div>
                <button className="add-btn">+</button>
              </div>
            </div>
          </div>
          <div className="step-tips">
            <h4>💡 Dicas:</h4>
            <ul>
              <li>Veja fotos e descrições dos produtos</li>
              <li>Confira preços atualizados</li>
              <li>Adicione quantos itens quiser</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "2️⃣ Finalize o pagamento",
      description: "Escolha sua forma de pagamento preferida e confirme o pedido.",
      icon: <FiCreditCard />,
      content: (
        <div className="tutorial-step">
          <div className="step-demo">
            <div className="payment-demo">
              <div className="payment-option active">
                <span className="payment-icon">💳</span>
                <span>Cartão</span>
              </div>
              <div className="payment-option">
                <span className="payment-icon">📱</span>
                <span>PIX</span>
              </div>
              <div className="payment-option">
                <span className="payment-icon">💵</span>
                <span>Dinheiro</span>
              </div>
            </div>
            <div className="order-summary">
              <div className="total">Total: R$ 17,40</div>
              <button className="confirm-btn">Confirmar Pedido</button>
            </div>
          </div>
          <div className="step-tips">
            <h4>🔒 Segurança:</h4>
            <ul>
              <li>Pagamentos 100% seguros</li>
              <li>Dados protegidos</li>
              <li>Confirmação instantânea</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "3️⃣ Aguarde a confirmação",
      description: "A escola receberá seu pedido e confirmará em poucos minutos.",
      icon: <FiClock />,
      content: (
        <div className="tutorial-step">
          <div className="step-demo">
            <div className="status-demo">
              <div className="status-item completed">
                <FiCheck className="status-icon" />
                <span>Pedido recebido</span>
              </div>
              <div className="status-item processing">
                <div className="loading-spinner"></div>
                <span>Preparando...</span>
              </div>
              <div className="status-item pending">
                <FiMapPin className="status-icon" />
                <span>Pronto para retirar</span>
              </div>
            </div>
          </div>
          <div className="step-tips">
            <h4>⏰ Tempo médio:</h4>
            <ul>
              <li>Confirmação: 1-2 minutos</li>
              <li>Preparo: 5-10 minutos</li>
              <li>Notificação quando pronto</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "4️⃣ Retire seu pedido",
      description: "Quando estiver pronto, vá até a cantina e retire seu lanche!",
      icon: <FiMapPin />,
      content: (
        <div className="tutorial-step">
          <div className="step-demo">
            <div className="pickup-demo">
              <div className="notification">
                <div className="notif-icon">🔔</div>
                <div className="notif-text">
                  <strong>Pedido #1234 pronto!</strong>
                  <p>Retire na cantina</p>
                </div>
              </div>
              <div className="pickup-info">
                <div className="qr-code">📱</div>
                <p>Mostre este código na cantina</p>
              </div>
            </div>
          </div>
          <div className="step-tips">
            <h4>📍 Retirada:</h4>
            <ul>
              <li>Sem filas, sem espera</li>
              <li>Mostre o código do pedido</li>
              <li>Aproveite seu lanche!</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Pronto! Você é um expert! 🎓",
      description: "Agora você sabe como usar o FinnFood. Que tal fazer seu primeiro pedido?",
      icon: "🎉",
      content: (
        <div className="tutorial-complete">
          <div className="success-animation">
            <div className="success-icon">✅</div>
            <h3>Tutorial concluído!</h3>
          </div>
          <div className="next-steps">
            <h4>Próximos passos:</h4>
            <div className="action-buttons">
              <Link to="/menu" className="primary-action">
                <FiShoppingCart />
                Fazer Primeiro Pedido
              </Link>
              <Link to="/inicio" className="secondary-action">
                Voltar ao Início
              </Link>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="tutorial-container">
      <div className="tutorial-header">
        <Link to="/inicio" className="back-btn">
          <FiX />
        </Link>
        <div className="tutorial-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentStep + 1} de {steps.length}
          </span>
        </div>
      </div>

      <div className="tutorial-content">
        <div className="step-indicator">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => goToStep(index)}
            >
              {index < currentStep ? <FiCheck /> : index + 1}
            </button>
          ))}
        </div>

        <div className="step-content">
          <div className="step-header">
            <div className="step-icon">
              {typeof steps[currentStep].icon === 'string' ? 
                steps[currentStep].icon : 
                steps[currentStep].icon
              }
            </div>
            <h2>{steps[currentStep].title}</h2>
            <p>{steps[currentStep].description}</p>
          </div>

          <div className="step-body">
            {steps[currentStep].content}
          </div>
        </div>

        <div className="tutorial-navigation">
          <button 
            className="nav-btn prev" 
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <FiArrowLeft />
            Anterior
          </button>
          
          <button 
            className="nav-btn next" 
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? 'Concluído' : 'Próximo'}
            {currentStep !== steps.length - 1 && <FiArrowRight />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;