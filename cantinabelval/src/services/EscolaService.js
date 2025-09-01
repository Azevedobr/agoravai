import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from '../common/http-common';
const API_URL = "escola/";

const create = (data) => {
    return httpClient.post(API_ROUTES.ESCOLA.CREATE, {
        nome: data.nome,
        cnpj: data.cnpj,
        email: data.email,
        senha: data.senha,
        cep: data.cep,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        bairro: data.endereco.bairro,
        cidade: data.endereco.cidade,
        uf: data.endereco.uf
    });
};

const login = async (email, senha) => {
    const response = await httpClient.post(API_ROUTES.AUTH.LOGIN_ESCOLA, {
        email,
        senha,
    });
    if (response.data) {
        localStorage.setItem("escola", JSON.stringify(response.data));
    }
    return response.data;
};

const findAll = () => {
    return httpClient.get(API_ROUTES.ESCOLA.FIND_ALL);
};

const findById = (id) => {
    return httpClient.get(API_ROUTES.ESCOLA.FIND_BY_ID(id));
};

const update = (id, data) => {
    return httpClient.put(API_ROUTES.ESCOLA.UPDATE(id), data);
};

const inativar = (id) => {
    return httpClient.put(API_ROUTES.ESCOLA.INATIVAR(id));
};

const reativar = (id) => {
    return httpClient.put(API_ROUTES.ESCOLA.REATIVAR(id));
};

const logout = () => {
    localStorage.removeItem("escola");
};

const getCurrentEscola = () => {
    return JSON.parse(localStorage.getItem("escola"));
};

const EscolaService = {
    findAll,
    findById,
    create,
    update,
    login,
    logout,
    getCurrentEscola,
    inativar,
    reativar,
}

export default EscolaService;
