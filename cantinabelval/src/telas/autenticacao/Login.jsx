import { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UsuarioService } from '../../services';

function Login() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mostrarSenha = () => setSenhaVisivel(!senhaVisivel);

  const validarFormulario = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert('Por favor, preencha ambos os campos!');
      return;
    }
    
    setLoading(true);
    
    // Verificar credenciais de admin
    if (email === 'admin@admin' && senha === 'admin') {
      setTimeout(() => {
        setLoading(false);
        navigate('/telainicio');
      }, 1000);
      return;
    }
    
    // Login normal para alunos
    setTimeout(() => {
      setLoading(false);
      navigate('/telainicial');
    }, 1000);
  };

  const voltarParaApp = () => navigate('/');
  const irParaCadastro = () => navigate('/cadastroaluno');

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
        <button className="back-button" onClick={voltarParaApp}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Entrar</h1>
        <div></div>
      </div>

      <div className="login-content">
        <div className="brand-section">
          <div className="brand-logo">
            <span className="logo-icon">🍔</span>
            <h2>FinnFood</h2>
          </div>
          <p className="brand-subtitle">Bem-vindo de volta!</p>
        </div>

        <form onSubmit={validarFormulario} className="login-form">
          <div className="input-container">
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="input-container">
            <input
              type={senhaVisivel ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="form-input"
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={mostrarSenha}
            >
              <FontAwesomeIcon icon={senhaVisivel ? faEyeSlash : faEye} />
            </button>
          </div>

          <div className="form-options">
            <button type="button" className="forgot-link" onClick={() => navigate('/esqueceu')}>
              Esqueceu sua senha?
            </button>
          </div>

          <button 
            type="submit" 
            className={`login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="signup-section">
          <p>Não tem uma conta?</p>
          <button className="signup-button" onClick={irParaCadastro}>
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;