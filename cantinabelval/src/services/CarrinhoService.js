import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from '../common/http-common';
const API_URL = "carrinho/";

const adicionarItem = (data) => {
    return httpClient.post(API_ROUTES.CARRINHO.ADICIONAR_ITEM, {
        produtoId: data.produtoId,
        quantidade: data.quantidade,
        usuarioId: data.usuarioId,
        observacoes: data.observacoes
    });
};

const removerItem = (itemId) => {
    return httpClient.delete(API_ROUTES.CARRINHO.REMOVER_ITEM(itemId));
};

const atualizarQuantidade = (itemId, quantidade) => {
    return httpClient.put(API_ROUTES.CARRINHO.ATUALIZAR_QUANTIDADE(itemId), { quantidade });
};

const obterCarrinho = (usuarioId) => {
    return httpClient.get(API_ROUTES.CARRINHO.OBTER_CARRINHO(usuarioId));
};

const limparCarrinho = (usuarioId) => {
    return httpClient.delete(API_ROUTES.CARRINHO.LIMPAR_CARRINHO(usuarioId));
};

const calcularTotal = (usuarioId) => {
    return httpClient.get(API_ROUTES.CARRINHO.CALCULAR_TOTAL(usuarioId));
};

const CarrinhoService = {
    adicionarItem,
    removerItem,
    atualizarQuantidade,
    obterCarrinho,
    limparCarrinho,
    calcularTotal,
}

export default CarrinhoService;
