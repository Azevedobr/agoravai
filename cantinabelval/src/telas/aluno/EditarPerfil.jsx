import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faEnvelope, faLock, faCamera, faShield, faCog, faSignOutAlt, faTrash, faEdit, faSave, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './EditarPerfil.css';
import { useNavigate } from 'react-router-dom';
import { UsuarioService } from '../../services';
import AppHeader from '../../components/AppHeader';

function EditarPerfil() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: '',
    email: '',


  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const carregarDadosUsuario = () => {
    try {
      const usuario = UsuarioService.getCurrentUser();
      if (usuario) {
        setUserData({
          nome: usuario.nome || '',
          email: usuario.email || '',


        });
      } else {
        // Se não há usuário logado, redirecionar para login
        navigate('/entraraluno');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [senhaAtualVisivel, setSenhaAtualVisivel] = useState(false);
  const [senhaAtualValida, setSenhaAtualValida] = useState(false);
  const navigate = useNavigate();



  const verificarSenhaAtual = async (senhaDigitada) => {
    if (!senhaDigitada) {
      setSenhaAtualValida(false);
      return;
    }
    
    try {
      const usuario = UsuarioService.getCurrentUser();
      const response = await fetch(`http://localhost:8080/usuario/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: usuario.email, 
          senha: senhaDigitada 
        })
      });
      
      const result = await response.json();
      setSenhaAtualValida(response.ok && result.id === usuario.id);
    } catch (error) {
      setSenhaAtualValida(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (senha) {
      if (!senhaAtualValida) {
        alert('Digite a senha atual correta para alterá-la!');
        return;
      }
      if (senha !== confirmaSenha) {
        alert('As senhas não coincidem!');
        return;
      }
    }
    
    try {
      const usuario = UsuarioService.getCurrentUser();
      if (usuario) {
        // Atualizar nome via API
        const formData = new FormData();
        formData.append('nome', userData.nome);
        formData.append('nivelAcesso', usuario.nivelAcesso || 'USER');
        
        const response = await fetch(`http://localhost:8080/usuario/editar/${usuario.id}`, {
          method: 'PUT',
          body: formData
        });
        
        if (response.ok) {
          // Se há nova senha, atualizar senha
          if (senha) {
            const senhaData = new FormData();
            senhaData.append('senha', senha);
            
            const senhaResponse = await fetch(`http://localhost:8080/usuario/alterarSenha/${usuario.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ senha: senha })
            });
            
            if (!senhaResponse.ok) {
              throw new Error('Erro ao atualizar senha');
            }
          }
          
          // Atualizar dados no localStorage
          const usuarioAtualizado = {
            ...usuario,
            nome: userData.nome
          };
          localStorage.setItem('user', JSON.stringify(usuarioAtualizado));
          
          alert('Perfil atualizado com sucesso!');
          setIsEditing(false);
          setSenhaAtual('');
          setSenha('');
          setConfirmaSenha('');
          setSenhaAtualValida(false);
        } else {
          throw new Error('Erro ao atualizar perfil');
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil!');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('⚠️ ATENÇÃO: Tem certeza que deseja excluir sua conta?\n\nEsta ação é IRREVERSÍVEL e você perderá:\n• Todos os seus dados\n• Histórico de pedidos\n• Preferências salvas\n\nDigite "EXCLUIR" para confirmar:')) {
      const confirmacao = prompt('Digite "EXCLUIR" para confirmar a exclusão da conta:');
      if (confirmacao === 'EXCLUIR') {
        UsuarioService.logout();
        alert('Conta excluída com sucesso!');
        navigate('/');
      } else {
        alert('Exclusão cancelada.');
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair da sua conta?')) {
      UsuarioService.logout();
      navigate('/entraraluno');
    }
  };

  return (
    <>
      <AppHeader title="Meu Perfil" subtitle="Gerencie suas informações" showBack={true} showCart={false} />
      
      {loading ? (
        <div className="profile-edit-container">
          <div className="loading-state">
            <div className="loading-spinner">⏳</div>
            <p>Carregando dados do perfil...</p>
          </div>
        </div>
      ) : (
        <div className="profile-edit-container">
          <div className="profile-content">
            {/* Header do Perfil */}
            <div className="profile-header-section">
              <div className="profile-avatar">
                <div className="avatar-container">
                  <div className="user-avatar">👤</div>
                  <div className="avatar-badge">
                    <FontAwesomeIcon icon={faCamera} />
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <h2 className="profile-name">{userData.nome}</h2>
                <p className="profile-email">{userData.email}</p>
                <div className="profile-status">
                  <span className="status-badge active">
                    <FontAwesomeIcon icon={faCheck} />
                    Conta Ativa
                  </span>
                </div>
              </div>
            </div>

            {/* Menu de Ações Rápidas */}
            <div className="quick-actions">
              <button 
                className={`quick-action-btn ${isEditing ? 'active' : ''}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} />
                <span>{isEditing ? 'Cancelar' : 'Editar'}</span>
              </button>
              <button className="quick-action-btn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Sair</span>
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-section">
                <h3 className="section-title">
                  <FontAwesomeIcon icon={faUser} />
                  Informações Pessoais
                </h3>
                
                <div className="form-group">
                  <label>Nome Completo</label>
                  <div className={`input-wrapper ${!isEditing ? 'disabled' : ''}`}>
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                      type="text"
                      value={userData.nome}
                      onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                      placeholder="Digite seu nome completo"
                      disabled={!isEditing}
                      required
                    />
                    {isEditing && (
                      <div className="input-status">
                        <FontAwesomeIcon icon={faEdit} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrapper disabled">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input
                      type="email"
                      value={userData.email}
                      placeholder="seu@email.com"
                      disabled
                    />
                    <div className="input-lock">
                      <FontAwesomeIcon icon={faLock} />
                    </div>
                  </div>
                  <span className="input-help">📧 O email não pode ser alterado por segurança</span>
                </div>
              </div>

              {isEditing && (
                <div className="form-section security-section">
                  <h3 className="section-title">
                    <FontAwesomeIcon icon={faShield} />
                    Alterar Senha
                  </h3>

                  <div className="security-notice">
                    <FontAwesomeIcon icon={faShield} />
                    <span>Para sua segurança, confirme sua senha atual antes de alterá-la</span>
                  </div>

                  <div className="form-group">
                    <label>Senha Atual</label>
                    <div className="input-wrapper">
                      <FontAwesomeIcon icon={faLock} className="input-icon" />
                      <input
                        type={senhaAtualVisivel ? 'text' : 'password'}
                        value={senhaAtual}
                        onChange={(e) => {
                          setSenhaAtual(e.target.value);
                          verificarSenhaAtual(e.target.value);
                        }}
                        placeholder="Digite sua senha atual"
                        className={senhaAtual ? (senhaAtualValida ? 'valid' : 'invalid') : ''}
                      />
                      <FontAwesomeIcon
                        icon={senhaAtualVisivel ? faEyeSlash : faEye}
                        className="password-toggle"
                        onClick={() => setSenhaAtualVisivel(!senhaAtualVisivel)}
                      />
                      {senhaAtual && (
                        <div className={`validation-icon ${senhaAtualValida ? 'valid' : 'invalid'}`}>
                          <FontAwesomeIcon icon={senhaAtualValida ? faCheck : faTimes} />
                        </div>
                      )}
                    </div>
                    {senhaAtual && (
                      <span className={`input-help ${senhaAtualValida ? 'success' : 'error'}`}>
                        {senhaAtualValida ? '✅ Senha confirmada' : '❌ Senha incorreta'}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Nova Senha</label>
                    <div className="input-wrapper">
                      <FontAwesomeIcon icon={faLock} className="input-icon" />
                      <input
                        type={senhaVisivel ? 'text' : 'password'}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite uma nova senha"
                        disabled={!senhaAtualValida}
                      />
                      <FontAwesomeIcon
                        icon={senhaVisivel ? faEyeSlash : faEye}
                        className="password-toggle"
                        onClick={() => setSenhaVisivel(!senhaVisivel)}
                      />
                    </div>
                    <span className="input-help">🔒 Deixe em branco para manter a senha atual</span>
                  </div>

                  <div className="form-group">
                    <label>Confirmar Nova Senha</label>
                    <div className="input-wrapper">
                      <FontAwesomeIcon icon={faLock} className="input-icon" />
                      <input
                        type={confirmaSenhaVisivel ? 'text' : 'password'}
                        value={confirmaSenha}
                        onChange={(e) => setConfirmaSenha(e.target.value)}
                        placeholder="Confirme a nova senha"
                        disabled={!senhaAtualValida}
                        className={senha && confirmaSenha ? (senha === confirmaSenha ? 'valid' : 'invalid') : ''}
                      />
                      <FontAwesomeIcon
                        icon={confirmaSenhaVisivel ? faEyeSlash : faEye}
                        className="password-toggle"
                        onClick={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)}
                      />
                      {senha && confirmaSenha && (
                        <div className={`validation-icon ${senha === confirmaSenha ? 'valid' : 'invalid'}`}>
                          <FontAwesomeIcon icon={senha === confirmaSenha ? faCheck : faTimes} />
                        </div>
                      )}
                    </div>
                    {senha && confirmaSenha && (
                      <span className={`input-help ${senha === confirmaSenha ? 'success' : 'error'}`}>
                        {senha === confirmaSenha ? '✅ Senhas coincidem' : '❌ Senhas não coincidem'}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Ações */}
              {isEditing && (
                <div className="form-actions">
                  <div className="danger-zone">
                    <h4>⚠️ Zona de Perigo</h4>
                    <button type="button" className="delete-btn" onClick={handleDeleteAccount}>
                      <FontAwesomeIcon icon={faTrash} />
                      Excluir Conta
                    </button>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      type="button" 
                      className="cancel-btn" 
                      onClick={() => {
                        setIsEditing(false);
                        setSenhaAtual('');
                        setSenha('');
                        setConfirmaSenha('');
                        setSenhaAtualValida(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                      Cancelar
                    </button>
                    <button type="submit" className="save-btn">
                      <FontAwesomeIcon icon={faSave} />
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditarPerfil;