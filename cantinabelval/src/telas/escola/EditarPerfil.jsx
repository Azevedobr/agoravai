import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCamera, faBuilding, faEnvelope, faLock, faPhone, faMapMarkerAlt, faIdCard } from '@fortawesome/free-solid-svg-icons';
import './EditarPerfil.css';
import { useNavigate } from 'react-router-dom';

function Editarperfil() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);
  const [userData, setUserData] = useState({
    nome: 'Escola Exemplo',
    email: 'escola@exemplo.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123',
    cnpj: '12.345.678/0001-90',
    foto: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=🏫'
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
    navigate('/telainicio');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      console.log('Conta excluída com sucesso');
      navigate('/');
    }
  };

  return (
    <div className="profile-edit-container">
      <div className="profile-header">
        <button onClick={() => navigate('/telainicio')} className="back-btn">
          ← Voltar
        </button>
        <div className="header-content">
          <h1>Editar Perfil</h1>
          <p>Atualize as informações da escola</p>
        </div>
      </div>

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
              <FontAwesomeIcon icon={faBuilding} />
              Informações da Escola
            </h3>
            
            <div className="form-group">
              <label>Nome da Instituição</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faBuilding} className="input-icon" />
                <input
                  type="text"
                  value={userData.nome}
                  onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                  placeholder="Digite o nome da instituição"
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
                  placeholder="escola@email.com"
                  disabled
                />
              </div>
              <span className="input-help">O email não pode ser alterado</span>
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <input
                  type="tel"
                  value={userData.telefone}
                  onChange={(e) => setUserData({ ...userData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Endereço</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
                <input
                  type="text"
                  value={userData.endereco}
                  onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                  placeholder="Endereço completo"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>CNPJ</label>
              <div className="input-wrapper disabled">
                <FontAwesomeIcon icon={faIdCard} className="input-icon" />
                <input
                  type="text"
                  value={userData.cnpj}
                  placeholder="00.000.000/0000-00"
                  disabled
                />
              </div>
              <span className="input-help">O CNPJ não pode ser alterado</span>
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
                />
                <FontAwesomeIcon
                  icon={senhaVisivel ? faEyeSlash : faEye}
                  className="password-toggle"
                  onClick={() => setSenhaVisivel(!senhaVisivel)}
                />
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
                />
                <FontAwesomeIcon
                  icon={confirmaSenhaVisivel ? faEyeSlash : faEye}
                  className="password-toggle"
                  onClick={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)}
                />
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="form-actions">
            <button type="button" className="delete-btn" onClick={handleDeleteAccount}>
              🗑️ Excluir Conta
            </button>
            <div className="action-buttons">
              <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
                Cancelar
              </button>
              <button type="submit" className="save-btn">
                💾 Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editarperfil;