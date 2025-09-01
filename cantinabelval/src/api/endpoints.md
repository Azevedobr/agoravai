# 📋 Documentação das APIs - FinnFood Backend

## 🔐 Autenticação

### POST /api/auth/login
**Descrição:** Login de usuário
```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

### POST /api/auth/escola/login
**Descrição:** Login de escola
```json
{
  "email": "escola@email.com",
  "senha": "123456"
}
```

### POST /api/auth/refresh
**Descrição:** Renovar token de acesso

### POST /api/auth/logout
**Descrição:** Logout do usuário

### POST /api/auth/forgot-password
**Descrição:** Solicitar recuperação de senha
```json
{
  "email": "usuario@email.com"
}
```

### POST /api/auth/reset-password
**Descrição:** Redefinir senha
```json
{
  "token": "reset_token",
  "newPassword": "nova_senha"
}
```

## 👤 Usuários

### GET /api/usuario/findAll
**Descrição:** Listar todos os usuários

### GET /api/usuario/findById/{id}
**Descrição:** Buscar usuário por ID

### GET /api/usuario/findByEmail/{email}
**Descrição:** Buscar usuário por email

### GET /api/usuario/findByNome?nome={nome}
**Descrição:** Buscar usuários por nome

### POST /api/usuario/create
**Descrição:** Criar usuário (admin)
```json
{
  "nome": "Nome Usuario",
  "email": "usuario@email.com",
  "nivelAcesso": "USUARIO"
}
```

### POST /api/usuario/signup
**Descrição:** Cadastro de usuário
```json
{
  "nome": "Nome Usuario",
  "email": "usuario@email.com",
  "password": "123456"
}
```

### PUT /api/usuario/update/{id}
**Descrição:** Atualizar usuário

### PUT /api/usuario/profile/{id}
**Descrição:** Atualizar perfil do usuário
```json
{
  "nome": "Novo Nome",
  "telefone": "(11) 99999-9999",
  "endereco": "Novo endereço"
}
```

### PUT /api/usuario/alterarSenha/{id}
**Descrição:** Alterar senha
```json
{
  "senha": "nova_senha"
}
```

### PUT /api/usuario/inativar/{id}
**Descrição:** Inativar usuário

### PUT /api/usuario/reativar/{id}
**Descrição:** Reativar usuário

### POST /api/usuario/avatar/{id}
**Descrição:** Upload de avatar (multipart/form-data)

## 🏫 Escola

### GET /api/escola/findAll
**Descrição:** Listar todas as escolas

### GET /api/escola/findById/{id}
**Descrição:** Buscar escola por ID

### POST /api/escola/create
**Descrição:** Criar escola
```json
{
  "nome": "Nome da Escola",
  "cnpj": "12.345.678/0001-90",
  "email": "escola@email.com",
  "senha": "123456",
  "cep": "12345-678",
  "endereco": {
    "logradouro": "Rua da Escola",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "uf": "SP"
  }
}
```

### PUT /api/escola/update/{id}
**Descrição:** Atualizar escola

### PUT /api/escola/inativar/{id}
**Descrição:** Inativar escola

### PUT /api/escola/reativar/{id}
**Descrição:** Reativar escola

## 🍔 Produtos

### GET /api/produto/findAll
**Descrição:** Listar todos os produtos

### GET /api/produto/findAllCardapio
**Descrição:** Listar produtos do cardápio

### GET /api/produto/findById/{id}
**Descrição:** Buscar produto por ID

### GET /api/produto/findByCategoria/{id}
**Descrição:** Buscar produtos por categoria

### GET /api/produto/findByNome?nome={nome}
**Descrição:** Buscar produtos por nome

### POST /api/produto/createSemFoto
**Descrição:** Criar produto sem foto
```json
{
  "nome": "Nome do Produto",
  "descricao": "Descrição do produto",
  "codigoBarras": "1234567890123",
  "preco": 15.50,
  "categoria": 1
}
```

### POST /api/produto/createComFoto
**Descrição:** Criar produto com foto (multipart/form-data)

### PUT /api/produto/alterar/{id}
**Descrição:** Atualizar produto (multipart/form-data)

### PUT /api/produto/inativar/{id}
**Descrição:** Inativar produto

### PUT /api/produto/reativar/{id}
**Descrição:** Reativar produto

### PUT /api/produto/addCardapio/{id}
**Descrição:** Adicionar produto ao cardápio

### PUT /api/produto/removeCardapio/{id}
**Descrição:** Remover produto do cardápio

## 📂 Categorias

### GET /api/categoria/findAll
**Descrição:** Listar todas as categorias

### GET /api/categoria/findById/{id}
**Descrição:** Buscar categoria por ID

### POST /api/categoria/create
**Descrição:** Criar categoria
```json
{
  "nome": "Nome da Categoria",
  "descricao": "Descrição da categoria",
  "icone": "🍔",
  "cor": "#ff6b35"
}
```

### PUT /api/categoria/update/{id}
**Descrição:** Atualizar categoria

### DELETE /api/categoria/delete/{id}
**Descrição:** Excluir categoria

## 🛒 Carrinho

### GET /api/carrinho/obterCarrinho/{usuarioId}
**Descrição:** Obter carrinho do usuário

### POST /api/carrinho/adicionarItem
**Descrição:** Adicionar item ao carrinho
```json
{
  "produtoId": 1,
  "quantidade": 2,
  "usuarioId": 1,
  "observacoes": "Sem cebola"
}
```

### DELETE /api/carrinho/removerItem/{itemId}
**Descrição:** Remover item do carrinho

### PUT /api/carrinho/atualizarQuantidade/{itemId}
**Descrição:** Atualizar quantidade do item
```json
{
  "quantidade": 3
}
```

### DELETE /api/carrinho/limparCarrinho/{usuarioId}
**Descrição:** Limpar carrinho do usuário

### GET /api/carrinho/calcularTotal/{usuarioId}
**Descrição:** Calcular total do carrinho

## 📦 Pedidos

### GET /api/pedido/findAll
**Descrição:** Listar todos os pedidos

### GET /api/pedido/findById/{id}
**Descrição:** Buscar pedido por ID

### GET /api/pedido/findByUsuario/{usuarioId}
**Descrição:** Buscar pedidos por usuário

### GET /api/pedido/findByCliente?nome={nome}
**Descrição:** Buscar pedidos por nome do cliente

### GET /api/pedido/findByStatus/{status}
**Descrição:** Buscar pedidos por status

### GET /api/pedido/findByData?dataInicio={data}&dataFim={data}
**Descrição:** Buscar pedidos por período

### POST /api/pedido/create
**Descrição:** Criar pedido
```json
{
  "precoTotal": 25.50,
  "produtos": [
    {
      "produtoId": 1,
      "quantidade": 2,
      "preco": 12.75
    }
  ],
  "nomeCliente": "Nome do Cliente",
  "formaPagamento": "CARTAO",
  "usuarioId": 1,
  "observacoes": "Entregar no portão"
}
```

### PUT /api/pedido/updateStatus/{id}
**Descrição:** Atualizar status do pedido
```json
{
  "status": "PREPARANDO"
}
```

### PUT /api/pedido/cancelar/{id}
**Descrição:** Cancelar pedido
```json
{
  "motivo": "Produto em falta"
}
```

### GET /api/pedido/historico/{usuarioId}
**Descrição:** Histórico de pedidos do usuário

## 🎉 Promoções

### GET /api/promocao/findAll
**Descrição:** Listar todas as promoções

### GET /api/promocao/findAllAtivos
**Descrição:** Listar promoções ativas

### GET /api/promocao/findById/{id}
**Descrição:** Buscar promoção por ID

### POST /api/promocao/addPromocao
**Descrição:** Criar promoção (multipart/form-data)

### PUT /api/promocao/alterar/{id}
**Descrição:** Atualizar promoção (multipart/form-data)

### PUT /api/promocao/inativar/{id}
**Descrição:** Inativar promoção

### PUT /api/promocao/ativar/{id}
**Descrição:** Ativar promoção

## 💬 Mensagens

### GET /api/mensagem/findAll
**Descrição:** Listar todas as mensagens

### GET /api/mensagem/findById/{id}
**Descrição:** Buscar mensagem por ID

### GET /api/mensagem/findByEmail?email={email}
**Descrição:** Buscar mensagens por email

### POST /api/mensagem/create
**Descrição:** Criar mensagem
```json
{
  "emissorMensagem": "Nome do Emissor",
  "email": "emissor@email.com",
  "telefone": "(11) 99999-9999",
  "texto": "Texto da mensagem"
}
```

### PUT /api/mensagem/marcarComoLida/{id}
**Descrição:** Marcar mensagem como lida

### PUT /api/mensagem/inativar/{id}
**Descrição:** Inativar mensagem

## 💳 Pagamentos

### POST /api/pagamento/cartao
**Descrição:** Processar pagamento com cartão
```json
{
  "numeroCartao": "1234567890123456",
  "nomePortador": "Nome do Portador",
  "validade": "12/25",
  "cvv": "123",
  "valor": 25.50,
  "pedidoId": 1,
  "parcelas": 1
}
```

### POST /api/pagamento/pix
**Descrição:** Processar pagamento PIX
```json
{
  "valor": 25.50,
  "pedidoId": 1,
  "chavePixDestino": "chave@pix.com"
}
```

### POST /api/pagamento/dinheiro
**Descrição:** Processar pagamento em dinheiro
```json
{
  "valor": 25.50,
  "pedidoId": 1,
  "valorRecebido": 30.00,
  "troco": 4.50
}
```

### GET /api/pagamento/status/{transacaoId}
**Descrição:** Verificar status do pagamento

### GET /api/pagamento/historico/{usuarioId}
**Descrição:** Histórico de pagamentos do usuário

## 📊 Relatórios

### GET /api/relatorio/vendas/diarias?data={data}
**Descrição:** Relatório de vendas diárias

### GET /api/relatorio/vendas/mensais?mes={mes}&ano={ano}
**Descrição:** Relatório de vendas mensais

### GET /api/relatorio/produtos/mais-vendidos?limite={limite}
**Descrição:** Produtos mais vendidos

### GET /api/relatorio/receita/total?dataInicio={data}&dataFim={data}
**Descrição:** Receita total por período

### GET /api/relatorio/usuarios/ativos
**Descrição:** Usuários ativos

## 📤 Upload de Arquivos

### POST /api/upload/produto/imagem
**Descrição:** Upload de imagem de produto (multipart/form-data)

### POST /api/upload/promocao/imagem
**Descrição:** Upload de imagem de promoção (multipart/form-data)

### POST /api/upload/usuario/avatar
**Descrição:** Upload de avatar de usuário (multipart/form-data)

## 🔧 Status Codes

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Erro de validação
- **401** - Não autorizado
- **403** - Acesso negado
- **404** - Não encontrado
- **500** - Erro interno do servidor

## 🔐 Autenticação

Todas as rotas protegidas requerem o header:
```
Authorization: Bearer {token}
```

## 📝 Observações

- Todas as datas devem estar no formato ISO 8601 (YYYY-MM-DD)
- Valores monetários devem ser enviados como números decimais
- Arquivos de upload devem ter tamanho máximo de 5MB
- Imagens aceitas: JPG, PNG, GIF