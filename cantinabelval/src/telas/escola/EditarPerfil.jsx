import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCamera, faBuilding, faEnvelope, faLock, faPhone, faMapMarkerAlt, faIdCard } from '@fortawesome/free-solid-svg-icons';
import './EditarPerfil.css';
import { useNavigate } from 'react-router-dom';

function Editarperfil() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);
  const [userData, setUserData] = useState({
    nome: 'ITB Brasílio Flores de Azevedo (FIEB)',
    email: 'itb@brasilioflores.edu.br',
    telefone: '(11) 4199-4220',
    endereco: 'R. Interna Grupo Bandeirante, 138 - Jardim Belval, Barueri - SP, 06420-150',
    cnpj: '12.345.678/0001-90'
  });
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [senhaAtualVisivel, setSenhaAtualVisivel] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (senha) {
      if (!senhaAtual) {
        alert('Digite a senha atual para alterá-la!');
        return;
      }
      if (senha !== confirmaSenha) {
        alert('As senhas não coincidem!');
        return;
      }
      
      // Verificar senha atual no banco
      try {
        const response = await fetch('http://localhost:8080/usuario/verificarSenha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: userData.email, 
            senhaAtual: senhaAtual 
          })
        });
        
        if (!response.ok) {
          alert('Senha atual incorreta!');
          return;
        }
      } catch (error) {
        alert('Erro ao verificar senha!');
        return;
      }
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
        {/* Seção do perfil */}
        <div className="profile-info-section">
          <div className="school-icon">🏫</div>
          <h2 className="profile-name">{userData.nome}</h2>
          <p className="profile-email">{userData.email}</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3 className="section-title">
              <FontAwesomeIcon icon={faBuilding} />
              Informações da Instituição
            </h3>
            
            <div className="form-group">
              <label>Nome da Instituição</label>
              <div className="input-wrapper disabled">
                <FontAwesomeIcon icon={faBuilding} className="input-icon" />
                <input
                  type="text"
                  value={userData.nome}
                  placeholder="Nome da instituição"
                  disabled
                />
              </div>
              <span className="input-help">O nome da instituição não pode ser alterado</span>
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
              <div className="input-wrapper disabled">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <input
                  type="tel"
                  value={userData.telefone}
                  placeholder="Telefone da instituição"
                  disabled
                />
              </div>
              <span className="input-help">O telefone não pode ser alterado</span>
            </div>

            <div className="form-group">
              <label>Endereço</label>
              <div className="input-wrapper disabled">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
                <input
                  type="text"
                  value={userData.endereco}
                  placeholder="Endereço da instituição"
                  disabled
                />
              </div>
              <span className="input-help">O endereço não pode ser alterado</span>
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

            {modoEdicao && (
              <>
                <div className="form-group">
                  <label>Senha Atual</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                      type={senhaAtualVisivel ? 'text' : 'password'}
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                      placeholder="Digite sua senha atual"
                    />
                    <FontAwesomeIcon
                      icon={senhaAtualVisivel ? faEyeSlash : faEye}
                      className="password-toggle"
                      onClick={() => setSenhaAtualVisivel(!senhaAtualVisivel)}
                    />
                  </div>
                  <span className="input-help">Necessário para alterar a senha</span>
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
              </>
            )}
          </div>

          {/* Ações */}
          <div className="form-actions">
            <button type="button" className="delete-btn" onClick={handleDeleteAccount}>
              🗑️ Excluir Conta
            </button>
            <div className="action-buttons">
              {!modoEdicao ? (
                <button type="button" className="edit-btn" onClick={() => setModoEdicao(true)}>
                  ✏️ Editar
                </button>
              ) : (
                <>
                  <button type="button" className="cancel-btn" onClick={() => {
                    setModoEdicao(false);
                    setSenhaAtual('');
                    setSenha('');
                    setConfirmaSenha('');
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
  );
}

export default Editarperfil;