import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Funcionarios.css';

const categorias = [
  'Sorvete',
  'Bebida',
  'Salgadinhos',
  'Bolachas',
  'Doces',
  'Promoção'
];

const Funcionarios = () => {
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

  // Função para carregar a imagem como base64
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
      setProdutos([...produtos, novoItem]);
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

  return (
    <div className="produtos-container">
      <button className="voltar-botao" onClick={handleVoltar}>← Voltar</button>
      <h2>Cadastro de Produtos</h2>

      <form onSubmit={handleSubmit} className="form-produto" encType="multipart/form-data">
        <div className="form-group">
          <label>Nome*:</label>
          <input
            type="text"
            name="nome"
            value={novoProduto.nome}
            onChange={handleInputChange}
            placeholder="Nome do produto"
          />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={novoProduto.descricao}
            onChange={handleInputChange}
            placeholder="Descrição do produto"
          />
        </div>

        <div className="form-group">
          <label>Peso/Volume*:</label>
          <div className="peso-group">
            <input
              type="number"
              name="peso"
              value={novoProduto.peso}
              onChange={handleInputChange}
              placeholder="Ex: 500"
              min="0"
            />
            <select
              name="unidade"
              value={novoProduto.unidade}
              onChange={handleInputChange}
            >
              <option value="g">Gramas (g)</option>
              <option value="ml">Mililitros (ml)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Preço* (R$):</label>
          <input
            type="number"
            name="preco"
            value={novoProduto.preco}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Categoria*:</label>
          <select
            name="categoria"
            value={novoProduto.categoria}
            onChange={handleInputChange}
          >
            <option value="">-- Selecione a categoria --</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Imagem do Produto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
          />
          {novoProduto.imagem && (
            <img
              src={novoProduto.imagem}
              alt="Preview do produto"
              style={{ marginTop: '10px', maxWidth: '150px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            />
          )}
        </div>

        {erro && <div className="mensagem-erro">{erro}</div>}

        <button type="submit" className="botao-adicionar">
          Adicionar Produto
        </button>
      </form>

      <div className="tabela-produtos">
        <h3>Produtos Cadastrados</h3>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Peso/Volume</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>
                  {produto.imagem ? (
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  ) : (
                    '—'
                  )}
                </td>
                <td>{produto.nome}</td>
                <td>{produto.descricao || '—'}</td>
                <td>{produto.categoria}</td>
                <td>{produto.peso}{produto.unidade}</td>
                <td>R$ {Number(produto.preco).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funcionarios;
