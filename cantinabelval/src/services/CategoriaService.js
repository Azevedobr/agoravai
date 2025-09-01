import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from "../common/http-common";
const API_URL = "categoria/";

const findAll = () => {
  return httpClient.get(API_ROUTES.CATEGORIA.FIND_ALL);
};

const findById = id => {
  return httpClient.get(API_ROUTES.CATEGORIA.FIND_BY_ID(id));
};

const create = (data) => {
  return httpClient.post(API_ROUTES.CATEGORIA.CREATE, {
    nome: data.nome,
    descricao: data.descricao,
    icone: data.icone,
    cor: data.cor
  });
};

const update = (id, data) => {
  return httpClient.put(API_ROUTES.CATEGORIA.UPDATE(id), {
    nome: data.nome,
    descricao: data.descricao,
    icone: data.icone,
    cor: data.cor
  });
};

const deleteCategoria = (id) => {
  return httpClient.delete(API_ROUTES.CATEGORIA.DELETE(id));
};


const CategoriaService = {
  findAll,
  findById,
  create,
  update,
  delete: deleteCategoria,
};

export default CategoriaService;
