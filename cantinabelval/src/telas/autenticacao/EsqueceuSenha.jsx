import { useState } from 'react';
import './EsqueceuSenha.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function EsqueceuSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const enviarRecuperacao = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Por favor, insira seu email.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert(`Instruções enviadas para ${email}`);
      setLoading(false);
      navigate('/entraraluno');
    }, 1500);
  };

  const voltar = () => navigate('/entraraluno');

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-elements">
          <div className="element">🍔</div>
          <div className="element">🍟</div>
          <div className="element">🥤</div>
          <div className="element">🍕</div>
          <div className="element">🌮</div>
        </div>
      </div>
      
      <div className="login-header">
        <button className="back-button" onClick={voltar}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Recuperar Senha</h1>
        <div></div>
      </div>

      <div className="login-content">
        <div className="brand-section">
          <div className="brand-logo">
            <span className="logo-icon">🔐</span>
            <h2>FinnFood</h2>
          </div>
          <p className="brand-subtitle">Vamos recuperar sua senha!</p>
        </div>

        <form onSubmit={enviarRecuperacao} className="login-form">
          <div className="input-container">
            <input
              type="email"
              placeholder="Digite seu email cadastrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Instruções'}
          </button>
        </form>

        <div className="signup-section">
          <p>Lembrou da senha?</p>
          <button className="signup-button" onClick={voltar}>
            Voltar ao login
          </button>
        </div>
      </div>
    </div>
  );
}

export default EsqueceuSenha;
