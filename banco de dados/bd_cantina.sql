CREATE DATABASE finnfood;
GO

USE finnfood;
GO

-- Alunos
CREATE TABLE alunos (
    id BIGINT IDENTITY PRIMARY KEY,
    telefone NVARCHAR(50),
    endereco NVARCHAR(255)
);
GO

-- Escolas
CREATE TABLE escolas (
    id BIGINT IDENTITY PRIMARY KEY,
    nome_instituicao NVARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    email_institucional NVARCHAR(255) NOT NULL UNIQUE,
    cep CHAR(9) NOT NULL,
    logradouro NVARCHAR(255) NOT NULL,
    numero NVARCHAR(20) NOT NULL,
    bairro NVARCHAR(100) NOT NULL,
    cidade NVARCHAR(100) NOT NULL,
    uf CHAR(2) NOT NULL,
    data_cadastro DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Produtos
CREATE TABLE produtos (
    id BIGINT IDENTITY PRIMARY KEY,
    id_escola BIGINT NOT NULL,
    nome NVARCHAR(255) NOT NULL,
    descricao NVARCHAR(MAX),
    preco DECIMAL(18,2) NOT NULL CHECK (preco > 0),
    quantidade INT NOT NULL CHECK (quantidade > 0),
    categoria NVARCHAR(100),
    imagem NVARCHAR(255),
    ativo BIT NOT NULL DEFAULT 1,
    data_criacao DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_produtos_escolas FOREIGN KEY (id_escola) REFERENCES escolas(id)
);
GO

ALTER TABLE pedidos
ADD justificativa_cancelamento NVARCHAR(MAX);

CREATE TABLE pedidos (
    id BIGINT IDENTITY PRIMARY KEY,
    id_aluno BIGINT,
    status NVARCHAR(20) NOT NULL,
    justificativa_cancelamento NVARCHAR(MAX),
    data_pedido DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    valor_total DECIMAL(18,2),
    forma_pagamento NVARCHAR(100),
    observacoes NVARCHAR(MAX),
    CONSTRAINT FK_pedidos_alunos FOREIGN KEY (id_aluno) REFERENCES alunos(id)
);


DROP TABLE IF EXISTS itens_pedido;

CREATE TABLE itens_pedido (
    id BIGINT IDENTITY PRIMARY KEY,
    id_pedido BIGINT NULL,
    id_produto BIGINT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(18,2) NOT NULL CHECK (preco_unitario > 0),
    CONSTRAINT FK_itenspedido_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
    CONSTRAINT FK_itenspedido_produto FOREIGN KEY (id_produto) REFERENCES produtos(id)
);


-- Testes rápidos
SELECT * FROM alunos;
SELECT * FROM escolas;


ALTER TABLE itens_pedido DROP CONSTRAINT CK__itens_ped__preco__4D94879B;
ALTER TABLE produtos DROP CONSTRAINT CK__produtos__preco__3A81B327;
