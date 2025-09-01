import React, { useState, useEffect } from 'react';
import { useUsuarioApi, useProdutoApi, usePedidoApi } from '../hooks/useApi';

// Exemplo de como usar as APIs nos componentes
const ExemploUsoAPI = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  // Hooks das APIs
  const usuarioApi = useUsuarioApi();
  const produtoApi = useProdutoApi();
  const pedidoApi = usePedidoApi();

  // Carregar dados ao montar o componente
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // Buscar usuários
      const usuariosData = await usuarioApi.buscarTodos();
      setUsuarios(usuariosData);

      // Buscar produtos do cardápio
      const produtosData = await produtoApi.buscarCardapio();
      setProdutos(produtosData);

      // Buscar todos os pedidos
      const pedidosData = await pedidoApi.buscarTodos();
      setPedidos(pedidosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  // Exemplo de login
  const handleLogin = async (email, senha) => {
    try {
      const usuario = await usuarioApi.login({ email, senha });
      localStorage.setItem('usuario', JSON.stringify(usuario));
      console.log('Login realizado com sucesso:', usuario);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  // Exemplo de cadastro de usuário
  const handleCadastroUsuario = async (dadosUsuario) => {
    try {
      await usuarioApi.cadastrar(dadosUsuario);
      console.log('Usuário cadastrado com sucesso');
      carregarDados(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  // Exemplo de criação de produto com foto
  const handleCriarProduto = async (dadosProduto, arquivo) => {
    try {
      const formData = new FormData();
      formData.append('nome', dadosProduto.nome);
      formData.append('preco', dadosProduto.preco);
      formData.append('descricao', dadosProduto.descricao);
      if (arquivo) {
        formData.append('file', arquivo);
      }

      await produtoApi.criarComFoto(formData);
      console.log('Produto criado com sucesso');
      carregarDados(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  // Exemplo de criação de pedido
  const handleCriarPedido = async (dadosPedido) => {
    try {
      await pedidoApi.criar(dadosPedido);
      console.log('Pedido criado com sucesso');
      carregarDados(); // Recarregar lista
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Exemplo de Uso das APIs</h1>
      
      {/* Loading states */}
      {(usuarioApi.loading || produtoApi.loading || pedidoApi.loading) && (
        <div>Carregando...</div>
      )}

      {/* Error states */}
      {usuarioApi.error && <div style={{ color: 'red' }}>Erro usuários: {usuarioApi.error}</div>}
      {produtoApi.error && <div style={{ color: 'red' }}>Erro produtos: {produtoApi.error}</div>}
      {pedidoApi.error && <div style={{ color: 'red' }}>Erro pedidos: {pedidoApi.error}</div>}

      {/* Botões de exemplo */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleLogin('teste@email.com', '123456')}>
          Exemplo Login
        </button>
        <button onClick={() => handleCadastroUsuario({
          nome: 'Usuário Teste',
          email: 'novo@email.com',
          senha: '123456'
        })}>
          Exemplo Cadastro
        </button>
        <button onClick={() => handleCriarProduto({
          nome: 'Produto Teste',
          preco: 10.50,
          descricao: 'Descrição do produto'
        })}>
          Exemplo Criar Produto
        </button>
      </div>

      {/* Listas de dados */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h3>Usuários ({usuarios.length})</h3>
          <ul>
            {usuarios.map(usuario => (
              <li key={usuario.id}>{usuario.nome} - {usuario.email}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Produtos ({produtos.length})</h3>
          <ul>
            {produtos.map(produto => (
              <li key={produto.id}>{produto.nome} - R$ {produto.preco}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Pedidos ({pedidos.length})</h3>
          <ul>
            {pedidos.map(pedido => (
              <li key={pedido.id}>Pedido #{pedido.id} - Status: {pedido.status}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExemploUsoAPI;