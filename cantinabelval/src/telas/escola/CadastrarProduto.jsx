import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarProduto.css';

const categorias = [
  'Sorvete',
  'Bebida',
  'Salgadinhos',
  'Bolachas',
  'Doces',
  'Promoção'
];

const CadastrarProduto = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    peso: '',
    unidade: 'g',
    preco: '',
    categoria: '',
    imagem: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    setProdutos(produtosSalvos);
  }, []);

  useEffect(() => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }, [produtos]);

  const handleVoltar = () => navigate(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNovoProduto(prev => ({ ...prev, imagem: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const validarCampos = () => {
    if (!novoProduto.nome || !novoProduto.peso || !novoProduto.preco || !novoProduto.categoria) {
      setErro('Preencha todos os campos obrigatórios, incluindo categoria!');
      return false;
    }
    if (isNaN(novoProduto.peso) || isNaN(novoProduto.preco)) {
      setErro('Valores numéricos inválidos!');
      return false;
    }
    setErro('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      const novoItem = {
        ...novoProduto,
        id: Date.now(),
        pesoOuVolume: `${novoProduto.peso}${novoProduto.unidade}`
      };
      const novosProdutos = [...produtos, novoItem];
      setProdutos(novosProdutos);
      localStorage.setItem('produtos', JSON.stringify(novosProdutos));
      console.log('Produto salvo:', novoItem);
      setNovoProduto({
        nome: '',
        descricao: '',
        peso: '',
        unidade: 'g',
        preco: '',
        categoria: '',
        imagem: ''
      });
    }
  };

  const handleExcluir = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      const produtosAtualizados = produtos.filter(produto => produto.id !== id);
      setProdutos(produtosAtualizados);
      localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <button className="back-btn" onClick={handleVoltar}>
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
              <div className="input-row">
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
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
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

              <div className="input-row">
                <div className="input-field">
                  <label>Peso/Volume</label>
                  <div className="input-group">
                    <input
                      type="number"
                      name="peso"
                      value={novoProduto.peso}
                      onChange={handleInputChange}
                      placeholder="500"
                      min="0"
                      required
                    />
                    <select
                      name="unidade"
                      value={novoProduto.unidade}
                      onChange={handleInputChange}
                    >
                      <option value="g">g</option>
                      <option value="ml">ml</option>
                    </select>
                  </div>
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
              </div>

              <div className="input-field">
                <label>Imagem do Produto</label>
                <div className="file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagemChange}
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="file-label">
                    {novoProduto.imagem ? (
                      <img src={novoProduto.imagem} alt="Preview" className="preview-img" />
                    ) : (
                      <div className="upload-area">
                        <span>📷</span>
                        <span>Escolher arquivo</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {erro && (
                <div className="error-msg">
                  {erro}
                </div>
              )}

              <button type="submit" className="submit-btn">
                Adicionar Produto
              </button>
            </form>
          </div>

          <div className="products-section">
            <div className="section-header">
              <h3>Produtos Cadastrados</h3>
            </div>
            
            {produtos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <p>Nenhum produto cadastrado ainda</p>
              </div>
            ) : (
              <div className="products-list">
                {produtos.map((produto) => (
                  <div key={produto.id} className="product-item">
                    <div className="product-img">
                      {produto.imagem ? (
                        <img src={produto.imagem} alt={produto.nome} />
                      ) : (
                        <div className="no-img">🍔</div>
                      )}
                    </div>
                    
                    <div className="product-details">
                      <h4>{produto.nome}</h4>
                      <p className="category">{produto.categoria}</p>
                      <div className="product-meta">
                        <span>{produto.peso}{produto.unidade}</span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrarProduto;