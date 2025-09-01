const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    ESCOLA_LOGIN: `${API_BASE_URL}/auth/escola/login`,
  },
  USUARIO: {
    FIND_ALL: `${API_BASE_URL}/usuario/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/usuario/findById/${id}`,
    CREATE: `${API_BASE_URL}/usuario/create`,
    UPDATE: (id) => `${API_BASE_URL}/usuario/alterar/${id}`,
    DELETE: (id) => `${API_BASE_URL}/usuario/delete/${id}`,
  },
  PRODUTO: {
    FIND_ALL: `${API_BASE_URL}/produto/findAll`,
    FIND_ALL_CARDAPIO: `${API_BASE_URL}/produto/findAllCardapio`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/produto/findById/${id}`,
    FIND_BY_CATEGORIA: (id) => `${API_BASE_URL}/produto/findByCategoria/${id}`,
    FIND_BY_NOME: `${API_BASE_URL}/produto/findByNome`,
    CREATE: `${API_BASE_URL}/produto/createSemFoto`,
    UPDATE: (id) => `${API_BASE_URL}/produto/alterar/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/produto/inativar/${id}`,
  },
  CATEGORIA: {
    FIND_ALL: `${API_BASE_URL}/categoria/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/categoria/findById/${id}`,
    CREATE: `${API_BASE_URL}/categoria/create`,
    UPDATE: (id) => `${API_BASE_URL}/categoria/update/${id}`,
    DELETE: (id) => `${API_BASE_URL}/categoria/delete/${id}`,
  },
  CARRINHO: {
    OBTER: (usuarioId) => `${API_BASE_URL}/carrinho/obterCarrinho/${usuarioId}`,
    ADICIONAR: `${API_BASE_URL}/carrinho/adicionarItem`,
    REMOVER: (itemId) => `${API_BASE_URL}/carrinho/removerItem/${itemId}`,
    ATUALIZAR: (itemId) => `${API_BASE_URL}/carrinho/atualizarQuantidade/${itemId}`,
    LIMPAR: (usuarioId) => `${API_BASE_URL}/carrinho/limparCarrinho/${usuarioId}`,
    CALCULAR_TOTAL: (usuarioId) => `${API_BASE_URL}/carrinho/calcularTotal/${usuarioId}`,
  },
  PEDIDO: {
    FIND_ALL: `${API_BASE_URL}/pedido/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/pedido/findById/${id}`,
    FIND_BY_STATUS: (status) => `${API_BASE_URL}/pedido/findByStatus/${status}`,
    FIND_BY_CLIENTE: `${API_BASE_URL}/pedido/findByCliente`,
    CREATE: `${API_BASE_URL}/pedido/create`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/pedido/updateStatus/${id}`,
    CANCELAR: (id) => `${API_BASE_URL}/pedido/cancelar/${id}`,
  }
};

export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export default API_BASE_URL;