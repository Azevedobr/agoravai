import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from '../common/http-common';
const API_URL = "usuario/";

const findAll = () => {
    return httpClient.get(API_ROUTES.USUARIO.FIND_ALL);
};

const findById = (id) => {
    return httpClient.get(API_ROUTES.USUARIO.FIND_BY_ID(id));
};

const signup = (nome, email, password) => {
    return httpClient.post(API_ROUTES.USUARIO.SIGNUP, {
        nome,
        email,
        password,
    });
};

const signin = async (email, senha) => {
    const response = await httpClient.post('/usuario/login', {
        email,
        senha,
    });
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const create = data => {
    return httpClient.post(API_ROUTES.USUARIO.CREATE, {
        nome: data.nome,
        email: data.email,
        nivelAcesso: data.nivelAcesso
    });
};

const update = (id, data) => {
    return httpClient.put(API_ROUTES.USUARIO.UPDATE(id), data);
};

const inativar = (id) => {
    return httpClient.put(API_ROUTES.USUARIO.INATIVAR(id));
};

const reativar = (id) => {
    return httpClient.put(API_ROUTES.USUARIO.REATIVAR(id));
};

const alterarSenha = (id, data) => {
    return httpClient.put(API_ROUTES.USUARIO.CHANGE_PASSWORD(id), {
        senha: data.senha
    });
};

const findByNome = nome => {
    return httpClient.get(API_ROUTES.USUARIO.FIND_BY_NOME, {
        params: { nome }
    });
};

const findByEmail = (email) => {
    return httpClient.get(API_ROUTES.USUARIO.FIND_BY_EMAIL(email));
};

const updateProfile = (id, data) => {
    return httpClient.put(API_ROUTES.USUARIO.UPDATE_PROFILE(id), data);
};

const cadastrarAluno = (data) => {
    return httpClient.post('/usuario/signup', {
        nome: data.nome,
        email: data.email,
        senha: data.senha
    });
};

const UsuarioService = {
    findAll,
    findById,
    findByEmail,
    findByNome,
    signup,
    signin,
    logout,
    getCurrentUser,
    create,
    update,
    updateProfile,
    inativar,
    reativar,
    alterarSenha,
    cadastrarAluno,
}

export default UsuarioService;
