import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from '../common/http-common';
const API_URL = "pedido/";

const create = (data) => {
    return httpClient.post(API_ROUTES.PEDIDO.CREATE, {
        precoTotal: data.precoTotal,
        produtos: data.produtos,
        nomeCliente: data.nomeCliente,
        formaPagamento: data.formaPagamento,
        status: data.status || 'pendente',
        usuarioId: data.usuarioId,
        observacoes: data.observacoes
    });
};

const findAll = () => {
    return httpClient.get(API_ROUTES.PEDIDO.FIND_ALL);
};

const findById = (id) => {
    return httpClient.get(API_ROUTES.PEDIDO.FIND_BY_ID(id));
};

const updateStatus = (id, status) => {
    return httpClient.put(API_ROUTES.PEDIDO.UPDATE_STATUS(id), { status });
};

const findByCliente = (nomeCliente) => {
    return httpClient.get(API_ROUTES.PEDIDO.FIND_BY_CLIENTE, {
        params: { nome: nomeCliente }
    });
};

const findByUsuario = (usuarioId) => {
    return httpClient.get(API_ROUTES.PEDIDO.FIND_BY_USUARIO(usuarioId));
};

const findByStatus = (status) => {
    return httpClient.get(API_ROUTES.PEDIDO.FIND_BY_STATUS(status));
};

const findByData = (dataInicio, dataFim) => {
    return httpClient.get(API_ROUTES.PEDIDO.FIND_BY_DATA, {
        params: { dataInicio, dataFim }
    });
};

const cancelarPedido = (id, motivo) => {
    return httpClient.put(API_ROUTES.PEDIDO.CANCELAR(id), { motivo });
};

const obterHistorico = (usuarioId) => {
    return httpClient.get(API_ROUTES.PEDIDO.HISTORICO(usuarioId));
};

const PedidoService = {
    create,
    findAll,
    findById,
    findByUsuario,
    findByCliente,
    findByStatus,
    findByData,
    updateStatus,
    cancelarPedido,
    obterHistorico,
}

export default PedidoService;
