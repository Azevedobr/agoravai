import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from '../common/http-common';
const API_URL = "mensagem/";

const findAll = () => {
    return httpClient.get(API_ROUTES.MENSAGEM.FIND_ALL);
};

const findById = (id) => {
    return httpClient.get(API_ROUTES.MENSAGEM.FIND_BY_ID(id));
};

const findByEmail = (email) => {
    return httpClient.get(API_ROUTES.MENSAGEM.FIND_BY_EMAIL, {
        params: { email }
    });
};

const create = data => {
    return httpClient.post(API_ROUTES.MENSAGEM.CREATE, {
        emissorMensagem: data.emissorMensagem,
        email: data.email,
        telefone: data.telefone,
        texto: data.texto
    });
};

const inativar = (id) => {
    return httpClient.put(API_ROUTES.MENSAGEM.INATIVAR(id));
};

const marcarComoLida = (id) => {
    return httpClient.put(API_ROUTES.MENSAGEM.MARCAR_COMO_LIDA(id));
};

const MensagemService = {
    findAll,
    findById,
    findByEmail,
    create,
    inativar,
    marcarComoLida,
}

export default MensagemService;
