import httpClient, { uploadClient } from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from "../common/http-common";
const API_URL = "promocao/";

const findAll = () => {
  return httpClient.get(API_ROUTES.PROMOCAO.FIND_ALL);
};

const findAllAtivos = () => {
  return httpClient.get(API_ROUTES.PROMOCAO.FIND_ALL_ATIVOS);
};

const findById = id => {
  return httpClient.get(API_ROUTES.PROMOCAO.FIND_BY_ID(id));
};

const addPromocao = (file, data, usuario) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('nome', data.nome);
  formData.append('info', data.info);
  formData.append('usuario', usuario.id);

  return uploadClient.post(API_ROUTES.PROMOCAO.CREATE, formData);
};

const alterar = (file, id, data, usuario) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('nome', data.nome);
  formData.append('info', data.info);
  formData.append('usuario', usuario.id);

  return uploadClient.put(API_ROUTES.PROMOCAO.UPDATE(id), formData);
};

const inativar = (id) => {
  return httpClient.put(API_ROUTES.PROMOCAO.INATIVAR(id));
};

const ativar = (id) => {
  return httpClient.put(API_ROUTES.PROMOCAO.ATIVAR(id));
};


const PromocaoService = {
  findAll,
  findAllAtivos,
  findById,
  addPromocao,
  alterar,
  inativar,
  ativar,
};

export default PromocaoService;
