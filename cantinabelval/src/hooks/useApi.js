import { useState, useCallback } from 'react';
import springBootService from '../services/springBootService';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = useCallback(async (apiCall) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro na requisição';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    executeRequest,
    api: springBootService,
  };
};

// Hook específico para usuários
export const useUsuarioApi = () => {
  const { loading, error, executeRequest, api } = useApi();

  const login = useCallback((credentials) => {
    return executeRequest(() => api.usuario.login(credentials));
  }, [executeRequest, api]);

  const cadastrar = useCallback((usuario) => {
    return executeRequest(() => api.usuario.create(usuario));
  }, [executeRequest, api]);

  const buscarTodos = useCallback(() => {
    return executeRequest(() => api.usuario.findAll());
  }, [executeRequest, api]);

  const buscarPorId = useCallback((id) => {
    return executeRequest(() => api.usuario.findById(id));
  }, [executeRequest, api]);

  const editar = useCallback((id, formData) => {
    return executeRequest(() => api.usuario.editar(id, formData));
  }, [executeRequest, api]);

  const alterarSenha = useCallback((id, senhaData) => {
    return executeRequest(() => api.usuario.alterarSenha(id, senhaData));
  }, [executeRequest, api]);

  return {
    loading,
    error,
    login,
    cadastrar,
    buscarTodos,
    buscarPorId,
    editar,
    alterarSenha,
  };
};

// Hook específico para produtos
export const useProdutoApi = () => {
  const { loading, error, executeRequest, api } = useApi();

  const buscarTodos = useCallback(() => {
    return executeRequest(() => api.produto.findAll());
  }, [executeRequest, api]);

  const buscarCardapio = useCallback(() => {
    return executeRequest(() => api.produto.findAllCardapio());
  }, [executeRequest, api]);

  const buscarPorId = useCallback((id) => {
    return executeRequest(() => api.produto.findById(id));
  }, [executeRequest, api]);

  const criar = useCallback((produto) => {
    return executeRequest(() => api.produto.createSemFoto(produto));
  }, [executeRequest, api]);

  const criarComFoto = useCallback((formData) => {
    return executeRequest(() => api.produto.createComFoto(formData));
  }, [executeRequest, api]);

  const alterar = useCallback((id, formData) => {
    return executeRequest(() => api.produto.alterar(id, formData));
  }, [executeRequest, api]);

  const adicionarAoCardapio = useCallback((id) => {
    return executeRequest(() => api.produto.addCardapio(id));
  }, [executeRequest, api]);

  return {
    loading,
    error,
    buscarTodos,
    buscarCardapio,
    buscarPorId,
    criar,
    criarComFoto,
    alterar,
    adicionarAoCardapio,
  };
};

// Hook específico para pedidos
export const usePedidoApi = () => {
  const { loading, error, executeRequest, api } = useApi();

  const buscarTodos = useCallback(() => {
    return executeRequest(() => api.pedido.findAll());
  }, [executeRequest, api]);

  const buscarPorUsuario = useCallback((usuarioId) => {
    return executeRequest(() => api.pedido.findByUsuario(usuarioId));
  }, [executeRequest, api]);

  const criar = useCallback((pedido) => {
    return executeRequest(() => api.pedido.create(pedido));
  }, [executeRequest, api]);

  const atualizarStatus = useCallback((id, status) => {
    return executeRequest(() => api.pedido.updateStatus(id, status));
  }, [executeRequest, api]);

  return {
    loading,
    error,
    buscarTodos,
    buscarPorUsuario,
    criar,
    atualizarStatus,
  };
};

export default useApi;