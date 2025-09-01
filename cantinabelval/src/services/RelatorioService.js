import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';

const obterVendasDiarias = async (data) => {
    return httpClient.get(API_ROUTES.RELATORIO.VENDAS_DIARIAS, {
        params: { data }
    });
};

const obterVendasMensais = async (mes, ano) => {
    return httpClient.get(API_ROUTES.RELATORIO.VENDAS_MENSAIS, {
        params: { mes, ano }
    });
};

const obterProdutosMaisVendidos = async (limite = 10) => {
    return httpClient.get(API_ROUTES.RELATORIO.PRODUTOS_MAIS_VENDIDOS, {
        params: { limite }
    });
};

const obterReceitaTotal = async (dataInicio, dataFim) => {
    return httpClient.get(API_ROUTES.RELATORIO.RECEITA_TOTAL, {
        params: { dataInicio, dataFim }
    });
};

const obterUsuariosAtivos = async () => {
    return httpClient.get(API_ROUTES.RELATORIO.USUARIOS_ATIVOS);
};

const RelatorioService = {
    obterVendasDiarias,
    obterVendasMensais,
    obterProdutosMaisVendidos,
    obterReceitaTotal,
    obterUsuariosAtivos,
};

export default RelatorioService;
