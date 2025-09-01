import { httpService } from './httpService';
import { API_ENDPOINTS } from '../config/apiRoutes';

export const springBootService = {
  // === USUÁRIOS ===
  usuario: {
    findAll: () => httpService.get(API_ENDPOINTS.USUARIO.FIND_ALL),
    findAllAtivos: () => httpService.get(API_ENDPOINTS.USUARIO.FIND_ALL_ATIVOS),
    findById: (id) => httpService.get(API_ENDPOINTS.USUARIO.FIND_BY_ID(id)),
    create: (usuario) => httpService.post(API_ENDPOINTS.USUARIO.CREATE, usuario),
    save: (usuario) => httpService.post(API_ENDPOINTS.USUARIO.SAVE, usuario),
    editar: (id, formData) => httpService.putFormData(API_ENDPOINTS.USUARIO.EDITAR(id), formData),
    alterarSenha: (id, senhaData) => httpService.put(API_ENDPOINTS.USUARIO.ALTERAR_SENHA(id), senhaData),
    inativar: (id) => httpService.put(API_ENDPOINTS.USUARIO.INATIVAR(id)),
    login: (credentials) => httpService.post(API_ENDPOINTS.USUARIO.LOGIN, credentials),
  },

  // === PRODUTOS ===
  produto: {
    findAll: () => httpService.get(API_ENDPOINTS.PRODUTO.FIND_ALL),
    findAllAtivos: () => httpService.get(API_ENDPOINTS.PRODUTO.FIND_ALL_ATIVOS),
    findAllCardapio: () => httpService.get(API_ENDPOINTS.PRODUTO.FIND_ALL_CARDAPIO),
    findById: (id) => httpService.get(API_ENDPOINTS.PRODUTO.FIND_BY_ID(id)),
    findByCodBarras: (codBarras) => httpService.get(API_ENDPOINTS.PRODUTO.FIND_BY_COD_BARRAS(codBarras)),
    createSemFoto: (produto) => httpService.post(API_ENDPOINTS.PRODUTO.CREATE_SEM_FOTO, produto),
    createComFoto: (formData) => httpService.postFormData(API_ENDPOINTS.PRODUTO.CREATE_COM_FOTO, formData),
    alterar: (id, formData) => httpService.putFormData(API_ENDPOINTS.PRODUTO.ALTERAR(id), formData),
    addCardapio: (id) => httpService.put(API_ENDPOINTS.PRODUTO.ADD_CARDAPIO(id)),
    inativar: (id) => httpService.put(API_ENDPOINTS.PRODUTO.INATIVAR(id)),
    reativar: (id) => httpService.put(API_ENDPOINTS.PRODUTO.REATIVAR(id)),
  },

  // === CATEGORIAS ===
  categoria: {
    findAll: () => httpService.get(API_ENDPOINTS.CATEGORIA.FIND_ALL),
    findById: (id) => httpService.get(API_ENDPOINTS.CATEGORIA.FIND_BY_ID(id)),
    create: (categoria) => httpService.post(API_ENDPOINTS.CATEGORIA.CREATE, categoria),
    update: (id, categoria) => httpService.put(API_ENDPOINTS.CATEGORIA.UPDATE(id), categoria),
    delete: (id) => httpService.delete(API_ENDPOINTS.CATEGORIA.DELETE(id)),
  },

  // === PEDIDOS ===
  pedido: {
    findAll: () => httpService.get(API_ENDPOINTS.PEDIDO.FIND_ALL),
    findById: (id) => httpService.get(API_ENDPOINTS.PEDIDO.FIND_BY_ID(id)),
    findByUsuario: (usuarioId) => httpService.get(API_ENDPOINTS.PEDIDO.FIND_BY_USUARIO(usuarioId)),
    create: (pedido) => httpService.post(API_ENDPOINTS.PEDIDO.CREATE, pedido),
    updateStatus: (id, status) => httpService.put(API_ENDPOINTS.PEDIDO.UPDATE_STATUS(id), { status }),
    cancelar: (id) => httpService.put(API_ENDPOINTS.PEDIDO.CANCELAR(id)),
  },

  // === MENSAGENS ===
  mensagem: {
    findAll: () => httpService.get(API_ENDPOINTS.MENSAGEM.FIND_ALL),
    findById: (id) => httpService.get(API_ENDPOINTS.MENSAGEM.FIND_BY_ID(id)),
    create: (mensagem) => httpService.post(API_ENDPOINTS.MENSAGEM.CREATE, mensagem),
    marcarComoLida: (id) => httpService.put(API_ENDPOINTS.MENSAGEM.MARCAR_COMO_LIDA(id)),
    inativar: (id) => httpService.put(API_ENDPOINTS.MENSAGEM.INATIVAR(id)),
  },

  // === ITENS PEDIDO ===
  itemPedido: {
    findAll: () => httpService.get(API_ENDPOINTS.ITEM_PEDIDO.FIND_ALL),
    findById: (id) => httpService.get(API_ENDPOINTS.ITEM_PEDIDO.FIND_BY_ID(id)),
    create: (itemPedido) => httpService.post(API_ENDPOINTS.ITEM_PEDIDO.CREATE, itemPedido),
    update: (id, itemPedido) => httpService.put(API_ENDPOINTS.ITEM_PEDIDO.UPDATE(id), itemPedido),
    delete: (id) => httpService.delete(API_ENDPOINTS.ITEM_PEDIDO.DELETE(id)),
  },

  // === UPLOAD ===
  upload: {
    imagem: (formData) => httpService.postFormData(API_ENDPOINTS.UPLOAD.IMAGEM, formData),
    getImagem: (filename) => API_ENDPOINTS.UPLOAD.GET_IMAGEM(filename),
  },

  // === ARQUIVOS ===
  file: {
    upload: (formData) => httpService.postFormData(API_ENDPOINTS.FILE.UPLOAD, formData),
    download: (filename) => API_ENDPOINTS.FILE.DOWNLOAD(filename),
  },
};

export default springBootService;