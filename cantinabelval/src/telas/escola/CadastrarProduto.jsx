import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarProduto.css';

const CadastrarProduto = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([
    { id: 1, nome: 'CARNES & FRIOS' },
    { id: 2, nome: 'DOCES' },
    { id: 3, nome: 'BEBIDAS' },
    { id: 4, nome: 'FRANGO' },
    { id: 7, nome: 'QUEIJO' }
  ]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produto/findAll');
      const data = await response.json();
      console.log('Produtos do banco:', data);
      setProdutos(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProdutos([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!novoProduto.nome || !novoProduto.preco || !novoProduto.categoria) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('nome', novoProduto.nome);
      formData.append('descricao', novoProduto.descricao);
      formData.append('codigoBarras', '');
      formData.append('preco', parseFloat(novoProduto.preco));
      formData.append('categoria', parseInt(novoProduto.categoria));

      const response = await fetch('http://localhost:8080/produto/createSemFoto', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Produto cadastrado com sucesso!');
        setNovoProduto({ nome: '', descricao: '', preco: '', categoria: '' });
        carregarProdutos();
      } else {
        alert('Erro ao cadastrar produto!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto!');
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        const response = await fetch(`http://localhost:8080/produto/inativar/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          alert('Produto excluído com sucesso!');
          carregarProdutos();
        }
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto!');
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        
        <div className="sidebar-content">
          <div className="brand">
            <div className="brand-icon">🍔</div>
            <h2>FinnFood</h2>
            <p>Admin Panel</p>
          </div>
          
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{produtos.length}</span>
              <span className="stat-label">Produtos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-main">
        <div className="page-header">
          <h1>Cadastro de Produtos</h1>
          <p>Gerencie o cardápio da sua cantina</p>
        </div>

        <div className="content-grid">
          <div className="form-section">
            <div className="section-header">
              <h3>Novo Produto</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="product-form">
              <div className="input-field">
                <label>Nome do Produto</label>
                <input
                  type="text"
                  name="nome"
                  value={novoProduto.nome}
                  onChange={handleInputChange}
                  placeholder="Digite o nome do produto"
                  required
                />
              </div>
              
              <div className="input-field">
                <label>Categoria</label>
                <select
                  name="categoria"
                  value={novoProduto.categoria}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecionar</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  value={novoProduto.descricao}
                  onChange={handleInputChange}
                  placeholder="Descreva o produto"
                  rows="3"
                />
              </div>
              
              <div className="input-field">
                <label>Preço (R$)</label>
                <input
                  type="number"
                  name="preco"
                  value={novoProduto.preco}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Cadastrando...' : 'Adicionar Produto'}
              </button>
            </form>
          </div>

          <div className="products-section">
            <div className="section-header">
              <h3>Produtos Cadastrados ({produtos.length})</h3>
            </div>
            
            <div className="products-list">
              {produtos.map((produto) => (
                <div key={produto.id} className="product-item">
                  <div className="product-img">
                    <div className="no-img">🍔</div>
                  </div>
                  
                  <div className="product-details">
                    <h4>{produto.nome}</h4>
                    <p className="category">{produto.categoria?.nome}</p>
                    <div className="product-meta">
                      <span>{produto.codigoBarras}</span>
                      <span className="price">R$ {Number(produto.preco).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="delete-btn"
                    onClick={() => handleExcluir(produto.id)}
                    title="Excluir produto"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrarProduto;