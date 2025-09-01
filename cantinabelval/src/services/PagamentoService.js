import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';

const processarPagamentoCartao = async (dadosPagamento) => {
    return httpClient.post(API_ROUTES.PAGAMENTO.PROCESSAR_CARTAO, {
        numeroCartao: dadosPagamento.numeroCartao,
        nomePortador: dadosPagamento.nomePortador,
        validade: dadosPagamento.validade,
        cvv: dadosPagamento.cvv,
        valor: dadosPagamento.valor,
        pedidoId: dadosPagamento.pedidoId,
        parcelas: dadosPagamento.parcelas || 1,
    });
};

const processarPagamentoPix = async (dadosPagamento) => {
    return httpClient.post(API_ROUTES.PAGAMENTO.PROCESSAR_PIX, {
        valor: dadosPagamento.valor,
        pedidoId: dadosPagamento.pedidoId,
        chavePixDestino: dadosPagamento.chavePixDestino,
    });
};

const processarPagamentoDinheiro = async (dadosPagamento) => {
    return httpClient.post(API_ROUTES.PAGAMENTO.PROCESSAR_DINHEIRO, {
        valor: dadosPagamento.valor,
        pedidoId: dadosPagamento.pedidoId,
        valorRecebido: dadosPagamento.valorRecebido,
        troco: dadosPagamento.troco,
    });
};

const verificarStatusPagamento = async (transacaoId) => {
    return httpClient.get(API_ROUTES.PAGAMENTO.VERIFICAR_STATUS(transacaoId));
};

const obterHistoricoPagamentos = async (usuarioId) => {
    return httpClient.get(API_ROUTES.PAGAMENTO.HISTORICO(usuarioId));
};

const PagamentoService = {
    processarPagamentoCartao,
    processarPagamentoPix,
    processarPagamentoDinheiro,
    verificarStatusPagamento,
    obterHistoricoPagamentos,
};

export default PagamentoService;
