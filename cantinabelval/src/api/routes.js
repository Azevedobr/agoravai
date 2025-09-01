// Configuração centralizada de todas as rotas da API
const API_BASE_URL = 'http://localhost:8080/api';

export const API_ROUTES = {
  // === AUTENTICAÇÃO ===
  AUTH: {
    LOGIN_USUARIO: `${API_BASE_URL}/auth/login`,
    LOGIN_ESCOLA: `${API_BASE_URL}/auth/escola/login`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },

  // === USUÁRIOS ===
  USUARIO: {
    BASE: `${API_BASE_URL}/usuario`,
    FIND_ALL: `${API_BASE_URL}/usuario/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/usuario/findById/${id}`,
    FIND_BY_EMAIL: (email) => `${API_BASE_URL}/usuario/findByEmail/${email}`,
    FIND_BY_NOME: `${API_BASE_URL}/usuario/findByNome`,
    CREATE: `${API_BASE_URL}/usuario/create`,
    SIGNUP: `${API_BASE_URL}/usuario/signup`,
    UPDATE: (id) => `${API_BASE_URL}/usuario/update/${id}`,
    UPDATE_PROFILE: (id) => `${API_BASE_URL}/usuario/profile/${id}`,
    CHANGE_PASSWORD: (id) => `${API_BASE_URL}/usuario/alterarSenha/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/usuario/inativar/${id}`,
    REATIVAR: (id) => `${API_BASE_URL}/usuario/reativar/${id}`,
    UPLOAD_AVATAR: (id) => `${API_BASE_URL}/usuario/avatar/${id}`,
  },

  // === ESCOLA ===
  ESCOLA: {
    BASE: `${API_BASE_URL}/escola`,
    FIND_ALL: `${API_BASE_URL}/escola/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/escola/findById/${id}`,
    CREATE: `${API_BASE_URL}/escola/create`,
    UPDATE: (id) => `${API_BASE_URL}/escola/update/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/escola/inativar/${id}`,
    REATIVAR: (id) => `${API_BASE_URL}/escola/reativar/${id}`,
  },

  // === PRODUTOS ===
  PRODUTO: {
    BASE: `${API_BASE_URL}/produto`,
    FIND_ALL: `${API_BASE_URL}/produto/findAll`,
    FIND_ALL_CARDAPIO: `${API_BASE_URL}/produto/findAllCardapio`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/produto/findById/${id}`,
    FIND_BY_CATEGORIA: (id) => `${API_BASE_URL}/produto/findByCategoria/${id}`,
    FIND_BY_NOME: `${API_BASE_URL}/produto/findByNome`,
    CREATE_SEM_FOTO: `${API_BASE_URL}/produto/createSemFoto`,
    CREATE_COM_FOTO: `${API_BASE_URL}/produto/createComFoto`,
    UPDATE: (id) => `${API_BASE_URL}/produto/alterar/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/produto/inativar/${id}`,
    REATIVAR: (id) => `${API_BASE_URL}/produto/reativar/${id}`,
    ADD_CARDAPIO: (id) => `${API_BASE_URL}/produto/addCardapio/${id}`,
    REMOVE_CARDAPIO: (id) => `${API_BASE_URL}/produto/removeCardapio/${id}`,
  },

  // === CATEGORIAS ===
  CATEGORIA: {
    BASE: `${API_BASE_URL}/categoria`,
    FIND_ALL: `${API_BASE_URL}/categoria/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/categoria/findById/${id}`,
    CREATE: `${API_BASE_URL}/categoria/create`,
    UPDATE: (id) => `${API_BASE_URL}/categoria/update/${id}`,
    DELETE: (id) => `${API_BASE_URL}/categoria/delete/${id}`,
  },

  // === CARRINHO ===
  CARRINHO: {
    BASE: `${API_BASE_URL}/carrinho`,
    OBTER_CARRINHO: (usuarioId) => `${API_BASE_URL}/carrinho/obterCarrinho/${usuarioId}`,
    ADICIONAR_ITEM: `${API_BASE_URL}/carrinho/adicionarItem`,
    REMOVER_ITEM: (itemId) => `${API_BASE_URL}/carrinho/removerItem/${itemId}`,
    ATUALIZAR_QUANTIDADE: (itemId) => `${API_BASE_URL}/carrinho/atualizarQuantidade/${itemId}`,
    LIMPAR_CARRINHO: (usuarioId) => `${API_BASE_URL}/carrinho/limparCarrinho/${usuarioId}`,
    CALCULAR_TOTAL: (usuarioId) => `${API_BASE_URL}/carrinho/calcularTotal/${usuarioId}`,
  },

  // === PEDIDOS ===
  PEDIDO: {
    BASE: `${API_BASE_URL}/pedido`,
    FIND_ALL: `${API_BASE_URL}/pedido/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/pedido/findById/${id}`,
    FIND_BY_USUARIO: (usuarioId) => `${API_BASE_URL}/pedido/findByUsuario/${usuarioId}`,
    FIND_BY_CLIENTE: `${API_BASE_URL}/pedido/findByCliente`,
    FIND_BY_STATUS: (status) => `${API_BASE_URL}/pedido/findByStatus/${status}`,
    FIND_BY_DATA: `${API_BASE_URL}/pedido/findByData`,
    CREATE: `${API_BASE_URL}/pedido/create`,
    UPDATE_STATUS: (id) => `${API_BASE_URL}/pedido/updateStatus/${id}`,
    CANCELAR: (id) => `${API_BASE_URL}/pedido/cancelar/${id}`,
    HISTORICO: (usuarioId) => `${API_BASE_URL}/pedido/historico/${usuarioId}`,
  },

  // === PROMOÇÕES ===
  PROMOCAO: {
    BASE: `${API_BASE_URL}/promocao`,
    FIND_ALL: `${API_BASE_URL}/promocao/findAll`,
    FIND_ALL_ATIVOS: `${API_BASE_URL}/promocao/findAllAtivos`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/promocao/findById/${id}`,
    CREATE: `${API_BASE_URL}/promocao/addPromocao`,
    UPDATE: (id) => `${API_BASE_URL}/promocao/alterar/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/promocao/inativar/${id}`,
    ATIVAR: (id) => `${API_BASE_URL}/promocao/ativar/${id}`,
  },

  // === MENSAGENS/CONTATO ===
  MENSAGEM: {
    BASE: `${API_BASE_URL}/mensagem`,
    FIND_ALL: `${API_BASE_URL}/mensagem/findAll`,
    FIND_BY_ID: (id) => `${API_BASE_URL}/mensagem/findById/${id}`,
    FIND_BY_EMAIL: `${API_BASE_URL}/mensagem/findByEmail`,
    CREATE: `${API_BASE_URL}/mensagem/create`,
    MARCAR_COMO_LIDA: (id) => `${API_BASE_URL}/mensagem/marcarComoLida/${id}`,
    INATIVAR: (id) => `${API_BASE_URL}/mensagem/inativar/${id}`,
  },

  // === PAGAMENTOS ===
  PAGAMENTO: {
    BASE: `${API_BASE_URL}/pagamento`,
    PROCESSAR_CARTAO: `${API_BASE_URL}/pagamento/cartao`,
    PROCESSAR_PIX: `${API_BASE_URL}/pagamento/pix`,
    PROCESSAR_DINHEIRO: `${API_BASE_URL}/pagamento/dinheiro`,
    VERIFICAR_STATUS: (transacaoId) => `${API_BASE_URL}/pagamento/status/${transacaoId}`,
    HISTORICO: (usuarioId) => `${API_BASE_URL}/pagamento/historico/${usuarioId}`,
  },

  // === RELATÓRIOS ===
  RELATORIO: {
    BASE: `${API_BASE_URL}/relatorio`,
    VENDAS_DIARIAS: `${API_BASE_URL}/relatorio/vendas/diarias`,
    VENDAS_MENSAIS: `${API_BASE_URL}/relatorio/vendas/mensais`,
    PRODUTOS_MAIS_VENDIDOS: `${API_BASE_URL}/relatorio/produtos/mais-vendidos`,
    RECEITA_TOTAL: `${API_BASE_URL}/relatorio/receita/total`,
    USUARIOS_ATIVOS: `${API_BASE_URL}/relatorio/usuarios/ativos`,
  },

  // === UPLOAD DE ARQUIVOS ===
  UPLOAD: {
    BASE: `${API_BASE_URL}/upload`,
    PRODUTO_IMAGEM: `${API_BASE_URL}/upload/produto/imagem`,
    PROMOCAO_IMAGEM: `${API_BASE_URL}/upload/promocao/imagem`,
    USUARIO_AVATAR: `${API_BASE_URL}/upload/usuario/avatar`,
  },

  // === EXTERNOS ===
  EXTERNAL: {
    CEP: (cep) => `https://viacep.com.br/ws/${cep}/json/`,
  }
};

export default API_ROUTES;