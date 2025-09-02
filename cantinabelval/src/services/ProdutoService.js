import httpClient, { uploadClient } from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from "../common/http-common";
const API_URL = "produto/";

const findAll = () => {
  return httpClient.get(API_ROUTES.PRODUTO.FIND_ALL);
};

const findById = id => {
  return httpClient.get(API_ROUTES.PRODUTO.FIND_BY_ID(id));
};

const createSemFoto = (data) => {
  const formData = new FormData();
  formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('codigoBarras', data.codigoBarras);
  formData.append('preco', data.preco);
  formData.append('categoria', data.categoria);
  
  return uploadClient.post('/produto/createSemFoto', formData);
};

const createComFoto = (file, data) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('codigoBarras', data.codigoBarras);
  formData.append('preco', data.preco);
  formData.append('categoria', data.categoria);

  return uploadClient.post('/produto/createComFoto', formData);
};

const alterar = (file, id, data) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('preco', data.preco);
  
  if (data.categoria.id === undefined) { // SE O USUÁRIO ALTEROU A "Categoria"
    formData.append('categoria', data.categoria.toString());
  } else { // SE O USUÁRIO NÃO ALTEROU A "Categoria"
    formData.append('categoria', data.categoria.id);
  }

/*
  for (const key of formData.entries()) {
    console.log(key[0] + ', ' + key[1]);
  } 
*/
  return http.multipartInstance.put(API_URL + `alterar/${id}`, formData);
};


const inativar = (id) => {
  return httpClient.put(`/produto/inativar/${id}`);
};

const reativar = (id) => {
  return http.multipartInstance.put(API_URL + `reativar/${id}`);
};

const addCardapio = (id) => {
  return http.multipartInstance.put(API_URL + `addCardapio/${id}`);
};

const findAllCardapio = () => {
  return httpClient.get(API_ROUTES.PRODUTO.FIND_ALL_CARDAPIO);
};

const findByCategoria = (categoriaId) => {
  return httpClient.get(API_ROUTES.PRODUTO.FIND_BY_CATEGORIA(categoriaId));
};

const findByNome = (nome) => {
  return httpClient.get(API_ROUTES.PRODUTO.FIND_BY_NOME, {
    params: { nome }
  });
};

const removeCardapio = (id) => {
  return httpClient.put(API_ROUTES.PRODUTO.REMOVE_CARDAPIO(id));
};

const ProdutoService = {
  findAll,
  findById,
  findByCategoria,
  findByNome,
  createSemFoto,
  createComFoto,
  alterar,
  inativar,
  reativar,
  addCardapio,
  removeCardapio,
  findAllCardapio
};

export default ProdutoService;
