import httpClient from '../api/httpClient';
import API_ROUTES from '../api/routes';
import UsuarioService from './UsuarioService';
import EscolaService from './EscolaService';

const login = async (email, senha, tipoUsuario = 'usuario') => {
    try {
        const endpoint = tipoUsuario === 'escola' 
            ? API_ROUTES.AUTH.LOGIN_ESCOLA 
            : API_ROUTES.AUTH.LOGIN_USUARIO;
            
        const response = await httpClient.post(endpoint, { email, senha });
        
        if (response.data) {
            const storageKey = tipoUsuario === 'escola' ? 'escola' : 'user';
            localStorage.setItem(storageKey, JSON.stringify(response.data));
        }
        
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = async (tipoUsuario = 'usuario') => {
    try {
        await httpClient.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
        console.warn('Erro ao fazer logout no servidor:', error);
    } finally {
        if (tipoUsuario === 'escola') {
            EscolaService.logout();
        } else {
            UsuarioService.logout();
        }
    }
};

const refreshToken = async () => {
    try {
        const response = await httpClient.post(API_ROUTES.AUTH.REFRESH_TOKEN);
        const { token } = response.data;
        
        const user = getCurrentUser();
        if (user) {
            user.token = token;
            const storageKey = user.cnpj ? 'escola' : 'user';
            localStorage.setItem(storageKey, JSON.stringify(user));
        }
        
        return token;
    } catch (error) {
        logout();
        throw error;
    }
};

const forgotPassword = async (email) => {
    return httpClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email });
};

const resetPassword = async (token, newPassword) => {
    return httpClient.post(API_ROUTES.AUTH.RESET_PASSWORD, { token, newPassword });
};

const getCurrentUser = () => {
    const usuario = UsuarioService.getCurrentUser();
    const escola = EscolaService.getCurrentEscola();
    
    return usuario || escola;
};

const isAuthenticated = () => {
    return getCurrentUser() !== null;
};

const getUserType = () => {
    const user = getCurrentUser();
    return user?.cnpj ? 'escola' : 'usuario';
};

const AuthService = {
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    isAuthenticated,
    getUserType,
}

export default AuthService;
