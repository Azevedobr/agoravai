import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Termos.css';

const Termos = () => {
  const navigate = useNavigate();

  return (
    <div className="termos-container">
      <div className="termos-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Voltar
        </button>
        <h1>Termos de Serviço</h1>
      </div>

      <div className="termos-content">
        <div className="termos-section">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao utilizar o FinnFood, você concorda com estes Termos de Serviço. 
            Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
          </p>
        </div>

        <div className="termos-section">
          <h2>2. Descrição do Serviço</h2>
          <p>
            O FinnFood é uma plataforma digital que conecta alunos às cantinas escolares, 
            permitindo pedidos online, pagamentos digitais e retirada agendada de produtos.
          </p>
        </div>

        <div className="termos-section">
          <h2>3. Cadastro e Conta do Usuário</h2>
          <p>
            Para usar nossos serviços, você deve criar uma conta fornecendo informações 
            precisas e atualizadas. Você é responsável por manter a confidencialidade 
            de sua senha e por todas as atividades em sua conta.
          </p>
        </div>

        <div className="termos-section">
          <h2>4. Uso Aceitável</h2>
          <p>Você concorda em usar o FinnFood apenas para:</p>
          <ul>
            <li>Fazer pedidos legítimos na cantina escolar</li>
            <li>Fornecer informações precisas</li>
            <li>Respeitar outros usuários e funcionários</li>
            <li>Cumprir as regras da instituição de ensino</li>
          </ul>
        </div>

        <div className="termos-section">
          <h2>5. Pagamentos e Reembolsos</h2>
          <p>
            Os pagamentos são processados de forma segura através de nossa plataforma. 
            Reembolsos podem ser solicitados em casos específicos, conforme nossa 
            política de reembolso disponível no aplicativo.
          </p>
        </div>

        <div className="termos-section">
          <h2>6. Privacidade</h2>
          <p>
            Respeitamos sua privacidade e protegemos seus dados pessoais conforme 
            nossa Política de Privacidade. Coletamos apenas as informações necessárias 
            para fornecer nossos serviços.
          </p>
        </div>

        <div className="termos-section">
          <h2>7. Limitação de Responsabilidade</h2>
          <p>
            O FinnFood não se responsabiliza por danos indiretos, incidentais ou 
            consequenciais decorrentes do uso de nossos serviços. Nossa responsabilidade 
            é limitada ao valor do pedido em questão.
          </p>
        </div>

        <div className="termos-section">
          <h2>8. Modificações dos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. 
            As alterações entrarão em vigor imediatamente após a publicação. 
            O uso continuado do serviço constitui aceitação dos novos termos.
          </p>
        </div>

        <div className="termos-section">
          <h2>9. Encerramento</h2>
          <p>
            Podemos encerrar ou suspender sua conta a qualquer momento, sem aviso prévio, 
            por violação destes termos ou por qualquer outro motivo que consideremos apropriado.
          </p>
        </div>

        <div className="termos-section">
          <h2>10. Contato</h2>
          <p>
            Para dúvidas sobre estes Termos de Serviço, entre em contato conosco:
          </p>
          <ul>
            <li>📧 Email: suporte@finnfood.com</li>
            <li>📱 WhatsApp: (11) 99999-9999</li>
            <li>🏫 Endereço: ITB Brasílio Flores de Azevedo</li>
          </ul>
        </div>

        <div className="termos-footer">
          <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
          <p><strong>Versão:</strong> 1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Termos;