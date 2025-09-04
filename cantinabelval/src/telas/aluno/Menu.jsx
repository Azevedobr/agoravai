import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Menu.css';
import { ProdutoService, CarrinhoService, UsuarioService, CategoriaService } from '../../services';
import {
  FiArrowLeft,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiClock,
  FiFilter,
  FiPlus
} from 'react-icons/fi';

import CarrinhoModal from '../../components/CarrinhoModal';
import DescricaoModal from '../../components/DescricaoModal';

const Menu = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [descricaoModalAberto, setDescricaoModalAberto] = useState(false);
  const [produtoDescricao, setProdutoDescricao] = useState(null);

  useEffect(() => {
    carregarDados();
    
    // Escutar eventos de atualização de produtos
    const handleProdutoAtualizado = () => {
      carregarDados();
    };
    
    window.addEventListener('produtoAtualizado', handleProdutoAtualizado);
    
    return () => {
      window.removeEventListener('produtoAtualizado', handleProdutoAtualizado);
    };
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
      // Usar apenas as 5 categorias definidas
      setCategorias([
        { id: 0, nome: 'Todos' },
        { id: 8, nome: 'BEBIDAS' },
        { id: 2, nome: 'DOCES' },
        { id: 1, nome: 'SALGADOS' },
        { id: 4, nome: 'SORVETES' },
        { id: 7, nome: 'BOLACHAS' }
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Fallback com produtos simulados
      setProdutos([
        { id: 1, nome: 'Coca-Cola', categoria: { nome: 'BEBIDAS' }, preco: 5.50, codigoBarras: '0001', descricao: 'Refrigerante Coca-Cola', statusProduto: 'ATIVO' },
        { id: 2, nome: 'Brigadeiro', categoria: { nome: 'DOCES' }, preco: 3.00, codigoBarras: '0002', descricao: 'Brigadeiro gourmet', statusProduto: 'ATIVO' }
      ]);
      setCategorias([{ id: 0, nome: 'Todos' }, { id: 8, nome: 'BEBIDAS' }, { id: 2, nome: 'DOCES' }, { id: 1, nome: 'SALGADOS' }, { id: 4, nome: 'SORVETES' }, { id: 7, nome: 'BOLACHAS' }]);
    }
  };

  const handleAdicionar = async (produto) => {
    const usuario = UsuarioService.getCurrentUser();
    
    if (!usuario) {
      alert('Você precisa estar logado!');
      navigate('/entraraluno');
      return;
    }

    try {
      // Salvar no carrinho temporário (usando usuário como chave)
      const carrinhoKey = `carrinho_${usuario.id}`;
      const carrinhoAtual = JSON.parse(sessionStorage.getItem(carrinhoKey) || '[]');
      
      const itemExistente = carrinhoAtual.find(item => item.produtoId === produto.id);
      
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinhoAtual.push({
          id: Date.now(),
          produtoId: produto.id,
          nome: produto.nome,
          preco: parseFloat(produto.preco),
          quantidade: 1
        });
      }
      
      sessionStorage.setItem(carrinhoKey, JSON.stringify(carrinhoAtual));
      
      // Mostrar modal
      setProdutoSelecionado(produto);
      setModalAberto(true);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      alert('Erro ao adicionar produto ao carrinho');
    }
  };

  const handleIrCarrinho = () => {
    setModalAberto(false);
    navigate('/carrinho');
  };

  const handleContinuarComprando = () => {
    setModalAberto(false);
    setProdutoSelecionado(null);
  };

  const toggleExpanded = (produto) => {
    setProdutoDescricao(produto);
    setDescricaoModalAberto(true);
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const produtosFiltrados = produtos.filter(produto => {
    // Mapear categorias do banco para nossas categorias
    let categoriaNome = produto.categoria?.nome;
    if (produto.categoria?.id === 4) categoriaNome = 'SORVETES';
    if (produto.categoria?.id === 1) categoriaNome = 'SALGADOS';
    if (produto.categoria?.id === 7) categoriaNome = 'BOLACHAS';
    if (produto.categoria?.id === 8) categoriaNome = 'BEBIDAS';
    
    const matchesCategory = categoriaSelecionada === 'Todos' || categoriaNome === categoriaSelecionada;
    const matchesSearch = produto.nome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-modern-container">
      {/* Header Moderno */}
      <header className="menu-header">
        <div className="header-top">
          <Link to="/telainicial" className="back-btn-modern">
            <FiArrowLeft />
          </Link>
          <div className="header-title">
            <h1>Menu Digital</h1>
            <p>Escolha seus produtos favoritos</p>
          </div>
          <Link to="/carrinho" className="cart-btn">
            <FiShoppingCart />
            <span className="cart-badge">3</span>
          </Link>
        </div>
        
        <div className="search-section">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar produtos deliciosos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="filter-btn">
              <FiFilter />
            </button>
          </div>
        </div>
      </header>

      <main className="menu-main">
        {/* Hero Section */}
        <section className="menu-hero">
          <div className="hero-content">
            <h2 className="hero-title">
              <span className="title-line">Sabores que</span>
              <span className="title-line gradient-text">conquistam</span>
            </h2>
            <p className="hero-description">
              Produtos frescos e deliciosos preparados com carinho especialmente para você.
            </p>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <FiStar className="stat-icon" />
              <span className="stat-number">4.9</span>
              <span className="stat-label">Avaliação</span>
            </div>
            <div className="stat-item">
              <FiClock className="stat-icon" />
              <span className="stat-number">5min</span>
              <span className="stat-label">Preparo</span>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="categories-section">
          <h3 className="section-title">Categorias</h3>
          <div className="categories-grid">
            {categorias.map(cat => (
              <button
                key={cat.id}
                className={`category-card ${categoriaSelecionada === cat.nome ? 'active' : ''}`}
                onClick={() => setCategoriaSelecionada(cat.nome)}
              >
                <div className="category-icon">
                  {cat.nome === 'BEBIDAS' ? '🥤' :
                   cat.nome === 'DOCES' ? '🍰' :
                   cat.nome === 'SALGADOS' ? '🥪' :
                   cat.nome === 'SORVETES' ? '🍦' :
                   cat.nome === 'BOLACHAS' ? '🍪' : '🍴'}
                </div>
                <span className="category-name">{cat.nome}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Produtos */}
        <section className="products-section">
          <div className="section-header">
            <h3 className="section-title">
              {categoriaSelecionada === 'Todos' ? 'Todos os Produtos' : categoriaSelecionada}
            </h3>
            <span className="products-count">{produtosFiltrados.length} produtos</span>
          </div>
          
          {produtosFiltrados.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h4>Nenhum produto encontrado</h4>
              <p>Tente ajustar os filtros ou buscar por outro termo</p>
            </div>
          ) : (
            <div className="products-grid">
              {produtosFiltrados.map((produto) => (
                <div className="product-card" key={produto.id}>
                  <div className="card-header">
                    {produto.foto ? (
                      <div className="product-image">
                        <img 
                          src={`data:image/jpeg;base64,${produto.foto}`}
                          alt={produto.nome} 
                          loading="lazy"
                        />
                        <div className="image-overlay">
                          <button className="favorite-btn">
                            <FiHeart />
                          </button>
                        </div>
                      </div>
                    ) : null}
                    <div className="category-tag">
                      {produto.categoria?.id === 4 ? 'SORVETES' :
                       produto.categoria?.id === 1 ? 'SALGADOS' :
                       produto.categoria?.id === 7 ? 'BOLACHAS' :
                       produto.categoria?.id === 8 ? 'BEBIDAS' :
                       produto.categoria?.nome}
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h4 className="product-name">{produto.nome}</h4>
                    {produto.codigoBarras && (
                      <p className="product-code">Código: {produto.codigoBarras}</p>
                    )}
                    <p className="product-description">
                      {truncateText(produto.descricao, 60)}
                      {produto.descricao && produto.descricao.length > 60 && (
                        <button 
                          className="read-more-btn"
                          onClick={() => toggleExpanded(produto)}
                        >
                          ver mais
                        </button>
                      )}
                    </p>
                  </div>
                  
                  <div className="card-footer">
                    <div className="price-section">
                      <span className="price">
                        {Number(produto.preco).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </span>
                    </div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAdicionar(produto)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <CarrinhoModal 
        isOpen={modalAberto}
        onClose={handleContinuarComprando}
        produto={produtoSelecionado}
        onIrCarrinho={handleIrCarrinho}
        onContinuarComprando={handleContinuarComprando}
      />
      
      <DescricaoModal 
        isOpen={descricaoModalAberto}
        onClose={() => setDescricaoModalAberto(false)}
        produto={produtoDescricao}
      />
    </div>
  );
};

export default Menu;