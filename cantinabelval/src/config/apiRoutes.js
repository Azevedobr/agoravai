// Configuração centralizada das rotas da API Spring Boot
const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  // === USUÁRIOS ===
  USUARIO: {
    FIND_ALL: `${API_BASE_URL}/usuario/findAll`,
    FIND_ALL_ATIVOS: `${API_BASE_URL}/usuario/findAllAtivos`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/usuario/findById/${id}`,
    CREATE: `${API_BASE_URL}/usuario/create`,
    SAVE: `${API_BASE_URL}/usuario/save`,
    EDITAR: (id) => `${API_BASE_URL}/usuario/editar/${id}`,
    ALTERAR_SENHA: (id) => `${API_BASE_URL}/usuario/alterarSenha/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/usuario/inativar/${id}`,
    LOGIN: `${API_BASE_URL}/usuario/login`,
  },

  // === PRODUTOS ===
  PRODUTO: {
    FIND_ALL: `${API_BASE_URL}/produto/findAll`,
    FIND_ALL_ATIVOS: `${API_BASE_URL}/produto/findAllAtivos`,
    FIND_ALL_CARDAPIO: `${API_BASE_URL}/produto/findAllCardapio`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/produto/findById/${id}`,
    FIND_BY_COD_BARRAS: (codBarras) => `${API_BASE_URL}/produto/findByCodBarras/${codBarras}`,
    CREATE_SEM_FOTO: `${API_BASE_URL}/produto/createSemFoto`,
    CREATE_COM_FOTO: `${API_BASE_URL}/produto/createComFoto`,
    ALTERAR: (id) => `${API_BASE_URL}/produto/alterar/${id}`,
    ADD_CARDAPIO: (id) => `${API_BASE_URL}/produto/addCardapio/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/produto/inativar/${id}`,
    REATIVAR: (id) => `${API_BASE_URL}/produto/reativar/${id}`,
  },

  // === CATEGORIAS ===
  CATEGORIA: {
    FIND_ALL: `${API_BASE_URL}/categoria/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/categoria/findById/${id}`,
    CREATE: `${API_BASE_URL}/categoria/create`,
    UPDATE: (id) => `${API_BASE_URL}/categoria/update/${id}`,
    DELETE: (id) => `${API_BASE_URL}/categoria/delete/${id}`,
  },

  // === PEDIDOS ===
  PEDIDO: {
    FIND_ALL: `${API_BASE_URL}/pedido/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/pedido/findById/${id}`,
    FIND_BY_USUARIO: (usuarioId) => `${API_BASE_URL}/pedido/findByUsuario/${usuarioId}`,
    CREATE: `${API_BASE_URL}/pedido/create`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/pedido/updateStatus/${id}`,
    CANCELAR: (id) => `${API_BASE_URL}/pedido/cancelar/${id}`,
  },

  // === MENSAGENS ===
  MENSAGEM: {
    FIND_ALL: `${API_BASE_URL}/mensagem/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/mensagem/findById/${id}`,
    CREATE: `${API_BASE_URL}/mensagem/create`,
    MARCAR_COMO_LIDA: (id) => `${API_BASE_URL}/mensagem/marcarComoLida/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/mensagem/inativar/${id}`,
  },

  // === ITENS PEDIDO ===
  ITEM_PEDIDO: {
    FIND_ALL: `${API_BASE_URL}/itemPedido/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/itemPedido/findById/${id}`,
    CREATE: `${API_BASE_URL}/itemPedido/create`,
    UPDATE: (id) => `${API_BASE_URL}/itemPedido/update/${id}`,
    DELETE: (id) => `${API_BASE_URL}/itemPedido/delete/${id}`,
  },

  // === UPLOAD DE IMAGENS ===
  UPLOAD: {
    IMAGEM: `${API_BASE_URL}/image/upload`,
    GET_IMAGEM: (filename) => `${API_BASE_URL}/image/${filename}`,
  },

  // === ARQUIVOS ===
  FILE: {
    UPLOAD: `${API_BASE_URL}/file/upload`,
    DOWNLOAD: (filename) => `${API_BASE_URL}/file/download/${filename}`,
  }
};

export default API_ENDPOINTS;