import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { ProdutoService, CarrinhoService, UsuarioService } from '../../services';
import BottomNavigation from '../../components/BottomNavigation';
import AppHeader from '../../components/AppHeader';
import SearchBar from '../../components/SearchBar';

const categorias = [
  'Todos',
  'Sorvete',
  'Bebida',
  'Salgadinhos',
  'Bolachas',
  'Doces',
  'Promoção'
];

const Menu = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await ProdutoService.findAll();
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        // Fallback para localStorage se API falhar
        const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
        setProdutos(produtosSalvos);
      }
    };
    carregarProdutos();
  }, []);

  const handleAdicionar = async (produto) => {
    const usuario = UsuarioService.getCurrentUser();
    
    const produtoFormatado = {
      id: Date.now(),
      nome: produto.nome,
      preco: Number(produto.preco),
      quantidade: 1,
      peso: produto.peso,
      volume: produto.volume,
      imagem: produto.imagem,
    };

    if (usuario) {
      try {
        await CarrinhoService.adicionarItem({
          produtoId: produto.id,
          quantidade: 1,
          usuarioId: usuario.id
        });
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    }
    
    navigate('/carrinho', { state: { novoItem: produtoFormatado } });
  };

  const produtosFiltrados = produtos.filter(produto => {
    const matchesCategory = categoriaSelecionada === 'Todos' || produto.categoria === categoriaSelecionada;
    const matchesSearch = produto.nome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
    <AppHeader title="Nossas Delícias" subtitle="Escolha seus produtos favoritos" showBack={true} />
    <div className="menu-container">
      <SearchBar 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar produtos..."
      />

      <h1 className="menu-titulo">
        <span className="destaque-titulo">Nossas Delícias</span>
        <div className="linha-decorativa"></div>
      </h1>

      <div className="filtro-categorias">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`btn-categoria ${categoriaSelecionada === cat ? 'ativo' : ''}`}
            onClick={() => setCategoriaSelecionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-itens">
        {produtosFiltrados.length === 0 && (
          <p className="nenhum-produto">Nenhum produto encontrado nesta categoria.</p>
        )}

        {produtosFiltrados.map((produto) => (
          <div className="menu-item" key={produto.id}>
            {produto.imagem && (
              <div className="imagem-container">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome} 
                  className="menu-imagem"
                  loading="lazy"
                />
                <div className="efeito-imagem"></div>
              </div>
            )}
            <div className="conteudo-item">
              <div className="categoria-badge">{produto.categoria}</div>
              <h2 className="menu-nome">{produto.nome}</h2>
              <div className="detalhes-produto">
                {produto.peso && <p className="menu-peso">⚖️ {produto.peso}</p>}
                {produto.volume && <p className="menu-volume">📦 {produto.volume}</p>}
              </div>
              <p className="menu-descricao">{produto.descricao}</p>
              <div className="preco-container">
                <p className="menu-preco">
                  {Number(produto.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>
              </div>
              <button 
                className="menu-botao"
                onClick={() => handleAdicionar(produto)}
              >
                🛒 Adicionar
                <span className="efeito-botao"></span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <BottomNavigation />
    </>
  );
};

export default Menu;
