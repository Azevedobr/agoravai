import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCamera, faUser, faEnvelope, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import './EditarPerfil.css';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';
import BottomNavigation from '../../components/BottomNavigation';

function EditarPerfil() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    telefone: '(11) 99999-8888',
    foto: 'https://via.placeholder.com/150/6C63FF/FFFFFF?text=JS'
  });
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha && senha !== confirmaSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Perfil atualizado com sucesso!');
    navigate('/telainicial');
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
      
      <div className="profile-edit-container">
        <div className="profile-content">
          {/* Seção da foto de perfil */}
          <div className="profile-photo-section">
            <div className="photo-container">
              <img src={userData.foto} alt="Perfil" className="profile-photo" />
              <div className="photo-overlay">
                <label className="camera-icon">
                  <FontAwesomeIcon icon={faCamera} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={!isEditing}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
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

              <div className="form-group">
                <label>Telefone</label>
                <div className="input-wrapper disabled">
                  <FontAwesomeIcon icon={faPhone} className="input-icon" />
                  <input
                    type="tel"
                    value={userData.telefone}
                    placeholder="(11) 99999-9999"
                    disabled
                  />
                </div>
                <span className="input-help">Funcionalidade será implementada em breve</span>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">
                <FontAwesomeIcon icon={faLock} />
                Segurança
              </h3>

              <div className="form-group">
                <label>Nova Senha</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    type={senhaVisivel ? 'text' : 'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite uma nova senha"
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <FontAwesomeIcon
                      icon={senhaVisivel ? faEyeSlash : faEye}
                      className="password-toggle"
                      onClick={() => setSenhaVisivel(!senhaVisivel)}
                    />
                  )}
                </div>
                <span className="input-help">Deixe em branco para manter a senha atual</span>
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
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <FontAwesomeIcon
                      icon={confirmaSenhaVisivel ? faEyeSlash : faEye}
                      className="password-toggle"
                      onClick={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)}
                    />
                  )}
                </div>
              </div>
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
                    <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
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
      
      <BottomNavigation />
    </>
  );
}

export default EditarPerfil;