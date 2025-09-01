import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const escolasSalvas = JSON.parse(localStorage.getItem('escolas')) || [];
    const escolasFormatadas = escolasSalvas.map(escola => ({
      nome: escola.nome,
      cidade: escola.endereco.cidade,
      uf: escola.endereco.uf
    }));
    setEscolas([
      { nome: 'Escola Municipal de Ensino Fundamental', cidade: 'São Paulo', uf: 'SP' },
      ...escolasFormatadas
    ]);
  }, []);

  const mostrarSenha = () => setSenhaVisivel(!senhaVisivel);
  const mostrarConfirmaSenha = () => setConfirmaSenhaVisivel(!confirmaSenhaVisivel);

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  const validarFormulario = async (e) => {
    e.preventDefault();
  
    if (senha !== confirmaSenha) {
      alert('As senhas não correspondem. Por favor, digite novamente.');
      return;
    }
  
    if (!selectedSchool) {
      alert('Por favor, selecione uma escola.');
      return;
    }

    setLoading(true);
    try {
      const novoAluno = {
        nome,
        email,
        escola: selectedSchool,
        dataCadastro: new Date().toISOString()
      };

      const alunosSalvos = JSON.parse(localStorage.getItem('alunos')) || [];
      localStorage.setItem('alunos', JSON.stringify([...alunosSalvos, novoAluno]));
    
      navigate('/telainicial');
    } finally {
      setLoading(false);
    }
  };

  const voltarParaInicio = () => navigate('/');
  const irParaLogin = () => navigate('/entraraluno');

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="floating-elements">
          <div className="element">🍔</div>
          <div className="element">🍟</div>
          <div className="element">🥤</div>
          <div className="element">🍕</div>
          <div className="element">🌮</div>
        </div>
      </div>
      
      <div className="signup-header">
        <button className="back-button" onClick={voltarParaInicio}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Criar Conta</h1>
        <div></div>
      </div>

      <div className="signup-content">
        <div className="brand-section">
          <div className="brand-logo">
            <span className="logo-icon">🍔</span>
            <h2>FinnFood</h2>
          </div>
          <p className="brand-subtitle">Crie sua conta e comece a pedir!</p>
        </div>

        <div className="access-buttons">
          <button
            type="button"
            className="access-btn active"
          >
            Acesso Aluno
          </button>
          <button
            type="button"
            className="access-btn"
            onClick={() => navigate('/contaescola')}
          >
            Acesso Escola
          </button>
        </div>

        <form onSubmit={validarFormulario} className="signup-form">
          <div className="input-container">
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="form-input"
              required
              pattern="[A-Za-zÀ-ú\s]+"
            />
          </div>

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
            <select 
              className="form-input"
              value={selectedSchool} 
              onChange={handleSchoolChange}
              required
            >
              <option value="">Selecione sua escola</option>
              {escolas.map((escola, index) => (
                <option key={index} value={escola.nome}>
                  {escola.nome} - {escola.cidade}/{escola.uf}
                </option>
              ))}
            </select>
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

          <div className="input-container">
            <input
              type={confirmaSenhaVisivel ? "text" : "password"}
              placeholder="Confirme sua senha"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              className="form-input"
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={mostrarConfirmaSenha}
            >
              <FontAwesomeIcon icon={confirmaSenhaVisivel ? faEyeSlash : faEye} />
            </button>
          </div>

          <button 
            type="submit" 
            className={`signup-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="login-section">
          <p>Já tem uma conta?</p>
          <button className="login-button" onClick={irParaLogin}>
            Fazer login
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;