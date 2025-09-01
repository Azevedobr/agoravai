// Configuração centralizada das APIs
export const API_ENDPOINTS = {
    USUARIO: "usuario/",
    ESCOLA: "escola/",
    PRODUTO: "produto/",
    PEDIDO: "pedido/",
    CARRINHO: "carrinho/",
    CATEGORIA: "categoria/",
    PROMOCAO: "promocao/",
    MENSAGEM: "mensagem/",
    CEP: "cep/"
};

export const API_ACTIONS = {
    // Ações comuns
    FIND_ALL: "findAll",
    FIND_BY_ID: "findById",
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete",
    
    // Ações específicas de usuário
    LOGIN: "login",
    SIGNUP: "signup",
    LOGOUT: "logout",
    ALTERAR_SENHA: "alterarSenha",
    INATIVAR: "inativar",
    REATIVAR: "reativar",
    
    // Ações específicas de carrinho
    ADICIONAR_ITEM: "adicionarItem",
    REMOVER_ITEM: "removerItem",
    ATUALIZAR_QUANTIDADE: "atualizarQuantidade",
    OBTER_CARRINHO: "obterCarrinho",
    LIMPAR_CARRINHO: "limparCarrinho",
    
    // Ações específicas de pedido
    UPDATE_STATUS: "updateStatus",
    FIND_BY_CLIENTE: "findByCliente"
};

export default {
    API_ENDPOINTS,
    API_ACTIONS
};
