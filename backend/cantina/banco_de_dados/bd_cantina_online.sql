USE master IF EXISTS(select * from sys.databases where name='bd_cantina_online') 
DROP DATABASE bd_cantina_online
GO 
-- CRIAR UM BANCO DE DADOS
CREATE DATABASE bd_cantina_online
GO
-- ACESSAR O BANCO DE DADOS
USE bd_cantina_online
GO

CREATE TABLE Usuario
( 
   id            INT			IDENTITY,
   nome          VARCHAR(100)	NOT NULL,
   email         VARCHAR(100)	UNIQUE NOT NULL,
   senha         VARCHAR(100)	NOT NULL,
   nivelAcesso   VARCHAR(10)    NULL, -- ADMIN ou USER
   foto			 VARBINARY(MAX) NULL,
   dataCadastro	 SMALLDATETIME	NOT NULL,
   statusUsuario VARCHAR(20)    NOT NULL, -- ATIVO ou INATIVO ou TROCAR_SENHA

   PRIMARY KEY (id)
)
GO
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Fulano da Silva', 'fulano@email.com.br', 'MTIzNDU2Nzg=', 'ADMIN', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Beltrana de Sá', 'beltrana@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Sicrana de Oliveira', 'sicrana@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'INATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Ordnael Zurc', 'ordnael@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'TROCAR_SENHA')
GO

CREATE TABLE Categoria
(
	id	 INT		  IDENTITY,
	nome VARCHAR(100) NOT NULL,  -- QUEIJO, FRANGO, CARNES & FRIOS, LEGUMES, DOCES, ESPECIAS, PEIXE

	PRIMARY KEY(id)
)
GO
INSERT Categoria (nome) VALUES ('CARNES & FRIOS')
INSERT Categoria (nome) VALUES ('DOCES')
INSERT Categoria (nome) VALUES ('ESPECIAS')
INSERT Categoria (nome) VALUES ('FRANGO')
INSERT Categoria (nome) VALUES ('LEGUME')
INSERT Categoria (nome) VALUES ('PEIXE')
INSERT Categoria (nome) VALUES ('QUEIJO')
INSERT Categoria (nome) VALUES ('SUCO')
INSERT Categoria (nome) VALUES ('REFRIGERANTE')
GO

CREATE TABLE Produto
(
	id			 INT		    IDENTITY,
	nome	     VARCHAR(100)	NOT NULL,
	descricao	 VARCHAR(400)	NOT NULL,
	codigoBarras VARCHAR(100)	NULL,
	foto		 VARBINARY(max) NULL,
	preco		 DECIMAL(8,2)	NOT NULL,
	categoria_id INT			NOT NULL,
	statusProduto	 VARCHAR(10)	NOT NULL, -- ATIVO, CARDAPIO ou INATIVO

	PRIMARY KEY (id),
	FOREIGN KEY (categoria_id) REFERENCES Categoria (id)
)
GO
INSERT Produto (nome, descricao, codigoBarras, foto, preco, categoria_id, statusProduto) 
VALUES ('Muçarela', 'Base de molho de tomate com cobertura de muçarela, orégano e tomate', '0001', NULL, 29.98, 7, 'ATIVO')
INSERT Produto (nome, descricao, codigoBarras, foto, preco, categoria_id, statusProduto) 
VALUES ('Calabresa', 'Base de molho de tomate e queijo com cobertura de calabresa', '0002', NULL, 29.98, 1, 'ATIVO')
INSERT Produto (nome, descricao, codigoBarras, foto, preco, categoria_id, statusProduto) 
VALUES ('Frango com Catupiry', 'Base de molho de tomate com cobertura de frango desfiado com catupiry', '0003', NULL, 37.98, 4, 'ATIVO')
INSERT Produto (nome, descricao, codigoBarras, foto, preco, categoria_id, statusProduto) 
VALUES ('Marguerita', 'Base de molho de tomate com cobertura de muçarela, manjericão, orégano e tomate', '0004', NULL, 31.98, 7, 'ATIVO')
INSERT Produto (nome, descricao, codigoBarras, foto, preco, categoria_id, statusProduto) 
VALUES ('Banana com Canela e Leite Condensado', 'Banana picada coberta com Canela em pó em uma base de Leite Condensado', '0005', NULL, 35.99, 2, 'ATIVO')
GO

CREATE TABLE Pedido
(
	id	            INT			   IDENTITY,
	usuario_id		INT			   NOT NULL,
    dataPedido		SMALLDATETIME  NOT NULL,
	senhaPedido     VARCHAR(100)	   NULL,
	valor			DECIMAL(8,2)	   NULL,
	formaPagto 	    VARCHAR(100)   NOT NULL,
	infoPedido 	    VARCHAR(200)	   NULL,

	statusPedido	VARCHAR(10)	   NOT NULL, -- ATIVO ou INATIVO ou CONFIRMADO ou CANCELADO

	PRIMARY KEY (id),
	FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
)
GO

CREATE TABLE ItemPedido
(
	id	        INT		IDENTITY,
	pedido_id	INT		NOT NULL,
	produto_id	INT		NOT NULL,
	quantidade	INT		NOT NULL,

	statusItem	VARCHAR(10)	   NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id),
	FOREIGN KEY (pedido_id) REFERENCES Pedido (id),
	FOREIGN KEY (produto_id) REFERENCES Produto (id)
)
GO


SELECT * FROM Usuario
SELECT * FROM Categoria
SELECT * FROM Produto
SELECT * FROM Pedido


/* VERIFICAR CONEXÕES EXISTENTES */
/*
SELECT * FROM sys.dm_exec_sessions
WHERE database_id = DB_ID('bd_pizzaria_3d')
AND host_name IS NOT NULL
AND program_name LIKE 'Microsoft SQL Server Management Studio%'
*/




