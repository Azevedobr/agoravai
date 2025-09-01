import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Instância principal para requisições JSON
const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Instância para upload de arquivos
const uploadClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 30000,
});

// Interceptor para adicionar token de autenticação
const addAuthInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const escola = JSON.parse(localStorage.getItem('escola') || '{}');
      
      const token = user.token || escola.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor para tratamento de respostas
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('escola');
        window.location.href = '/entraraluno';
      }
      
      if (error.code === 'ERR_NETWORK') {
        console.error('Backend não está rodando em:', API_BASE_URL);
        throw new Error('Erro de conexão: Verifique se o backend está rodando');
      }
      
      return Promise.reject(error);
    }
  );
};

// Aplicar interceptors
addAuthInterceptor(httpClient);
addAuthInterceptor(uploadClient);

// Cliente para APIs externas (CEP)
const externalClient = axios.create({
  timeout: 5000,
});

export { httpClient, uploadClient, externalClient };
export default httpClient;