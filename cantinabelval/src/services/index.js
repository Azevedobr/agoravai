// Exportação centralizada de todos os services
export { default as AuthService } from './AuthService';
export { default as UsuarioService } from './UsuarioService';
export { default as EscolaService } from './EscolaService';
export { default as ProdutoService } from './ProdutoService';
export { default as CategoriaService } from './CategoriaService';
export { default as CarrinhoService } from './CarrinhoService';
export { default as PedidoService } from './PedidoService';
export { default as PromocaoService } from './PromocaoService';
export { default as MensagemService } from './MensagemService';
export { default as PagamentoService } from './PagamentoService';
export { default as RelatorioService } from './RelatorioService';
export { default as CepService } from './CepService';

// Exportação das configurações de API
export { default as API_ROUTES } from '../api/routes';
export { httpClient, uploadClient, externalClient } from '../api/httpClient';
