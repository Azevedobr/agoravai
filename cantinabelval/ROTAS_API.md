# Conexão Frontend React com Spring Boot

Este documento explica como usar as rotas criadas para conectar o frontend React com o backend Spring Boot.

## Arquivos Criados

### 1. `/src/config/apiRoutes.js`
Configuração centralizada de todas as rotas da API Spring Boot.

### 2. `/src/services/httpService.js`
Serviço HTTP com interceptors para autenticação e tratamento de erros.

### 3. `/src/services/springBootService.js`
Serviço específico que mapeia todas as rotas do Spring Boot.

### 4. `/src/hooks/useApi.js`
Hooks personalizados para facilitar o uso das APIs nos componentes.

### 5. `/src/examples/ExemploUsoAPI.jsx`
Exemplo prático de como usar as APIs nos componentes.

## Como Usar

### 1. Importar o Hook Necessário

```javascript
import { useUsuarioApi, useProdutoApi, usePedidoApi } from '../hooks/useApi';
```

### 2. Usar no Componente

```javascript
const MeuComponente = () => {
  const usuarioApi = useUsuarioApi();
  const produtoApi = useProdutoApi();

  // Login
  const handleLogin = async (email, senha) => {
    try {
      const usuario = await usuarioApi.login({ email, senha });
      console.log('Login realizado:', usuario);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  // Buscar produtos
  const carregarProdutos = async () => {
    try {
      const produtos = await produtoApi.buscarCardapio();
      setProdutos(produtos);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  return (
    <div>
      {usuarioApi.loading && <div>Carregando...</div>}
      {usuarioApi.error && <div>Erro: {usuarioApi.error}</div>}
      {/* Seu componente aqui */}
    </div>
  );
};
```

## APIs Disponíveis

### Usuários
- `usuarioApi.login(credentials)` - Login
- `usuarioApi.cadastrar(usuario)` - Cadastrar usuário
- `usuarioApi.buscarTodos()` - Buscar todos os usuários
- `usuarioApi.buscarPorId(id)` - Buscar usuário por ID
- `usuarioApi.editar(id, formData)` - Editar usuário
- `usuarioApi.alterarSenha(id, senhaData)` - Alterar senha

### Produtos
- `produtoApi.buscarTodos()` - Buscar todos os produtos
- `produtoApi.buscarCardapio()` - Buscar produtos do cardápio
- `produtoApi.buscarPorId(id)` - Buscar produto por ID
- `produtoApi.criar(produto)` - Criar produto sem foto
- `produtoApi.criarComFoto(formData)` - Criar produto com foto
- `produtoApi.alterar(id, formData)` - Alterar produto
- `produtoApi.adicionarAoCardapio(id)` - Adicionar ao cardápio

### Pedidos
- `pedidoApi.buscarTodos()` - Buscar todos os pedidos
- `pedidoApi.buscarPorUsuario(usuarioId)` - Buscar pedidos do usuário
- `pedidoApi.criar(pedido)` - Criar pedido
- `pedidoApi.atualizarStatus(id, status)` - Atualizar status do pedido

## Estados dos Hooks

Todos os hooks retornam:
- `loading` - Estado de carregamento
- `error` - Mensagem de erro (se houver)
- Métodos específicos da API

## Configuração do Backend

Certifique-se de que o Spring Boot esteja rodando em `http://localhost:8080` e que o CORS esteja configurado corretamente no `WebConfig.java`.

## Exemplo de Uso Completo

Veja o arquivo `/src/examples/ExemploUsoAPI.jsx` para um exemplo completo de como usar todas as APIs.

## Tratamento de Erros

Os hooks automaticamente tratam erros e fornecem mensagens de erro através da propriedade `error`. Os erros de autenticação (401) redirecionam automaticamente para a página de login.

## Upload de Arquivos

Para upload de arquivos (como fotos de produtos), use FormData:

```javascript
const formData = new FormData();
formData.append('nome', 'Nome do Produto');
formData.append('preco', 10.50);
formData.append('file', arquivo);

await produtoApi.criarComFoto(formData);
```