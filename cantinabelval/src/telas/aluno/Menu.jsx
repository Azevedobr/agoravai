import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import { ProdutoService, CarrinhoService, UsuarioService, CategoriaService } from '../../services';
import BottomNavigation from '../../components/BottomNavigation';
import AppHeader from '../../components/AppHeader';
import SearchBar from '../../components/SearchBar';

const Menu = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [produtosRes, categoriasRes] = await Promise.all([
        fetch('http://localhost:8080/produto/findAll'),
        fetch('http://localhost:8080/categoria/findAll')
      ]);
      
      const produtos = await produtosRes.json();
      const categorias = await categoriasRes.json();
      
      console.log('Produtos carregados:', produtos);
      const produtosAtivos = produtos.filter(p => p.statusProduto === 'ATIVO');
      console.log('Produtos ativos:', produtosAtivos);
      
      setProdutos(produtosAtivos);
      setCategorias([{ id: 0, nome: 'Todos' }, ...categorias]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Fallback com produtos simulados
      setProdutos([
        { id: 1, nome: 'Muçarela', categoria: { nome: 'QUEIJO' }, preco: 29.98, codigoBarras: '0001', descricao: 'Pizza de muçarela', statusProduto: 'ATIVO' },
        { id: 2, nome: 'Calabresa', categoria: { nome: 'CARNES & FRIOS' }, preco: 29.98, codigoBarras: '0002', descricao: 'Pizza de calabresa', statusProduto: 'ATIVO' }
      ]);
      setCategorias([{ id: 0, nome: 'Todos' }, { id: 1, nome: 'QUEIJO' }, { id: 2, nome: 'CARNES & FRIOS' }]);
    }
  };

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
    const matchesCategory = categoriaSelecionada === 'Todos' || produto.categoria?.nome === categoriaSelecionada;
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
            key={cat.id}
            className={`btn-categoria ${categoriaSelecionada === cat.nome ? 'ativo' : ''}`}
            onClick={() => setCategoriaSelecionada(cat.nome)}
          >
            {cat.nome}
          </button>
        ))}
      </div>

      <div className="menu-itens">
        {produtosFiltrados.length === 0 && (
          <div className="nenhum-produto">
            <p>Nenhum produto encontrado.</p>
            <p>Total de produtos: {produtos.length}</p>
          </div>
        )}

        {produtosFiltrados.map((produto) => (
          <div className="menu-item" key={produto.id}>
            {produto.foto && (
              <div className="imagem-container">
                <img 
                  src={`data:image/jpeg;base64,${produto.foto}`}
                  alt={produto.nome} 
                  className="menu-imagem"
                  loading="lazy"
                />
                <div className="efeito-imagem"></div>
              </div>
            )}
            <div className="conteudo-item">
              <div className="categoria-badge">{produto.categoria?.nome}</div>
              <h2 className="menu-nome">{produto.nome}</h2>
              <div className="detalhes-produto">
                {produto.codigoBarras && <p className="menu-codigo">📊 {produto.codigoBarras}</p>}
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