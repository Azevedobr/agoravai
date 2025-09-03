import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarProduto.css';

const CadastrarProduto = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([
    { id: 8, nome: 'BEBIDAS' },
    { id: 2, nome: 'DOCES' },
    { id: 1, nome: 'SALGADOS' },
    { id: 4, nome: 'SORVETES' },
    { id: 7, nome: 'BOLACHAS' }
  ]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: ''
  });
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produto/findAll');
      const data = await response.json();
      console.log('Produtos do banco:', data);
      // Mostrar todos os produtos (ativos e inativos)
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

  const handleInativar = async (id) => {
    if (window.confirm('Tem certeza que deseja inativar este produto?')) {
      try {
        const response = await fetch(`http://localhost:8080/produto/inativar/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          alert('Produto inativado com sucesso!');
          carregarProdutos();
        }
      } catch (error) {
        console.error('Erro ao inativar produto:', error);
        alert('Erro ao inativar produto!');
      }
    }
  };

  const handleReativar = async (id) => {
    if (window.confirm('Tem certeza que deseja reativar este produto?')) {
      try {
        const response = await fetch(`http://localhost:8080/produto/reativar/${id}`, {
          method: 'PUT'
        });
        if (response.ok) {
          alert('Produto reativado com sucesso!');
          carregarProdutos();
        }
      } catch (error) {
        console.error('Erro ao reativar produto:', error);
        alert('Erro ao reativar produto!');
      }
    }
  };

  const handleEditar = (produto) => {
    setProdutoEditando({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao || '',
      preco: produto.preco.toString(),
      categoria: produto.categoria?.id?.toString() || ''
    });
    setModalAberto(true);
  };

  const handleSalvarEdicao = async (e) => {
    e.preventDefault();
    if (!produtoEditando.nome || !produtoEditando.preco || !produtoEditando.categoria) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('nome', produtoEditando.nome);
      formData.append('descricao', produtoEditando.descricao);
      formData.append('preco', parseFloat(produtoEditando.preco));
      formData.append('categoria', parseInt(produtoEditando.categoria));

      // Usar o endpoint de alteração padrão
      const response = await fetch(`http://localhost:8080/produto/alterar/${produtoEditando.id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        alert('Produto atualizado com sucesso!');
        setModalAberto(false);
        setProdutoEditando(null);
        carregarProdutos();
        
        // Notificar outras telas sobre a atualização
        window.dispatchEvent(new CustomEvent('produtoAtualizado', {
          detail: { produtoId: produtoEditando.id }
        }));
      } else {
        alert('Erro ao atualizar produto!');
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto!');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChangeEdicao = (e) => {
    const { name, value } = e.target;
    setProdutoEditando({ ...produtoEditando, [name]: value });
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
                    <p className="category">
                      {produto.categoria?.id === 4 ? 'SORVETES' :
                       produto.categoria?.id === 1 ? 'SALGADOS' :
                       produto.categoria?.id === 7 ? 'BOLACHAS' :
                       produto.categoria?.id === 8 ? 'BEBIDAS' :
                       produto.categoria?.nome}
                    </p>
                    <div className="product-meta">
                      <span>{produto.codigoBarras}</span>
                      <span className="price">R$ {Number(produto.preco).toFixed(2)}</span>
                      <span className={`status ${produto.statusProduto === 'ATIVO' ? 'ativo' : 'inativo'}`}>
                        {produto.statusProduto === 'ATIVO' ? '✓ Ativo' : '❌ Inativo'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="product-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditar(produto)}
                      title="Editar produto"
                    >
                      ✏️
                    </button>
                    {produto.statusProduto === 'ATIVO' ? (
                      <button 
                        className="delete-btn"
                        onClick={() => handleInativar(produto.id)}
                        title="Inativar produto"
                      >
                        🚫
                      </button>
                    ) : (
                      <button 
                        className="reactivate-btn"
                        onClick={() => handleReativar(produto.id)}
                        title="Reativar produto"
                      >
                        ✅
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Editar Produto</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setModalAberto(false);
                  setProdutoEditando(null);
                }}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSalvarEdicao} className="product-form">
              <div className="input-field">
                <label>Nome do Produto</label>
                <input
                  type="text"
                  name="nome"
                  value={produtoEditando?.nome || ''}
                  onChange={handleInputChangeEdicao}
                  placeholder="Digite o nome do produto"
                  required
                />
              </div>
              
              <div className="input-field">
                <label>Categoria</label>
                <select
                  name="categoria"
                  value={produtoEditando?.categoria || ''}
                  onChange={handleInputChangeEdicao}
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
                  value={produtoEditando?.descricao || ''}
                  onChange={handleInputChangeEdicao}
                  placeholder="Descreva o produto"
                  rows="3"
                />
              </div>
              
              <div className="input-field">
                <label>Preço (R$)</label>
                <input
                  type="number"
                  name="preco"
                  value={produtoEditando?.preco || ''}
                  onChange={handleInputChangeEdicao}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setModalAberto(false);
                    setProdutoEditando(null);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastrarProduto;