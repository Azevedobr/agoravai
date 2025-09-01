import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PagamentoCartao.css';
import { Link } from 'react-router-dom'; // Importe o Link

const PagamentoCartao = () => {
  return (
    <div className="pagamento-cartao">
      {/* Links de navegação */}
      <div className="botao-container">
        <Link to="/telainicial" className="botao-link"> {/* Link para Telainicial */}
          <div className="caixa">
            <p className="texto-inicio">Início</p>
          </div>
        </Link>
        <Link to="/pagina2cheetos" className="botao-link"> {/* Link para Pagina2Cheetos */}
          
            <p className="texto-menu">Menu</p>
          
        </Link>
        <Link to="/carrinho" className="botao-link"> {/* Link para Carrinho */}
          <div className="caixa">
            <p className="texto-carrinho">Carrinho</p>
          </div>
        </Link>
        <Link to="/paginaeditarperfil" className="botao-link"> {/* Link para PaginaEditarPerfil */}
          <div className="caixa">
            <p className="texto-perfil">Perfil</p>
          </div>
        </Link>
      </div>

      {/* Caixa Grande */}
      <div className="caixa-grande">
        <div className="texto-cheetos">Cheetos</div>
        <div className="texto-preco">R$ 3,00</div>
        <div className="nova-caixa">
          <p className="texto-retireseuproduto">
            Vá até o balcão de 
 pagamento mais próximo e 

            mostre o número de 
 atendimento, e retire o seu 

            produto!
          </p>
        </div>
        <div className="caixacartao">
          <p className="caixacartao">Cartão</p>
        </div>
        <div className="numero2">
          <p className="numero2">NÚMERO: 2</p>
        </div>
      </div>
    </div>
  );
};

export default PagamentoCartao;