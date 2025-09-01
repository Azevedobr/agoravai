import { externalClient } from '../api/httpClient';
import API_ROUTES from '../api/routes';
import http from '../common/http-common';

const getCep = async (cep) => {
    try {
        return await externalClient.get(API_ROUTES.EXTERNAL.CEP(cep));
    } catch (error) {
        // Fallback para o cliente antigo
        return http.apiCep.get(`https://viacep.com.br/ws/${cep}/json/`);
    }
};

const validarCep = (cep) => {
    const cepRegex = /^\d{5}-?\d{3}$/;
    return cepRegex.test(cep);
};

const formatarCep = (cep) => {
    return cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
};

const CepService = {
   getCep,
   validarCep,
   formatarCep,
}

export default CepService;
