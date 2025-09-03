import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './EditarPerfil.css';
import { useNavigate } from 'react-router-dom';
import { UsuarioService } from '../../services';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';

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
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      console.log('Conta excluída com sucesso');
      navigate('/');
    }
  };

  return (
    <>
      <AppHeader title="Editar Perfil" subtitle="Atualize suas informações" showBack={true} showCart={false} />
      
      {loading ? (
        <div className="profile-edit-container">
          <div className="loading-state">
            <p>Carregando dados do perfil...</p>
          </div>
        </div>
      ) : (
        <div className="profile-edit-container">
        <div className="profile-content">
          {/* Seção de informações do usuário */}
          <div className="profile-info-section">
            <div className="user-icon">👤</div>
            <h2 className="profile-name">{userData.nome}</h2>
            <p className="profile-email">{userData.email}</p>
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
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                  <input
                    type="text"
                    value={userData.nome}
                    onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                    placeholder="Digite seu nome completo"
                    disabled={!isEditing}
                    required
                  />
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
                </div>
                <span className="input-help">O email não pode ser alterado</span>
              </div>


            </div>

            <div className="form-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faLock} />
                Segurança
              </h3>

              {isEditing && (
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
                      style={{
                        borderColor: senhaAtual ? (senhaAtualValida ? '#22c55e' : '#ef4444') : 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                    <FontAwesomeIcon
                      icon={senhaAtualVisivel ? faEyeSlash : faEye}
                      className="password-toggle"
                      onClick={() => setSenhaAtualVisivel(!senhaAtualVisivel)}
                    />
                  </div>
                  <span className="input-help">Necessário para alterar a senha</span>
                </div>
              )}

              {isEditing && (
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
                  <span className="input-help">Deixe em branco para manter a senha atual</span>
                </div>
              )}

              {isEditing && (
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
                    />
                    <FontAwesomeIcon
                      icon={confirmaSenhaVisivel ? faEyeSlash : faEye}
                      className="password-toggle"
                      onClick={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Ações */}
            <div className="form-actions">
              {isEditing && (
                <button type="button" className="delete-btn" onClick={handleDeleteAccount}>
                  🗑️ Excluir Conta
                </button>
              )}
              <div className="action-buttons">
                {!isEditing ? (
                  <button type="button" className="save-btn" onClick={() => setIsEditing(true)}>
                    ✏️ Editar Perfil
                  </button>
                ) : (
                  <>
                    <button type="button" className="cancel-btn" onClick={() => {
                      setIsEditing(false);
                      setSenhaAtual('');
                      setSenha('');
                      setConfirmaSenha('');
                      setSenhaAtualValida(false);
                    }}>
                      Cancelar
                    </button>
                    <button type="submit" className="save-btn">
                      💾 Salvar Alterações
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      )}
      
      <BottomNavigation />
    </>
  );
}

export default EditarPerfil;