# Sistema de Cantina Online

Sistema completo para gerenciamento de cantina escolar com backend Spring Boot e frontend React.

## 📁 Estrutura do Projeto

```
cantina_bd/
├── backend/cantina/          # API Spring Boot
├── cantinabelval/           # Frontend React
└── banco de dados/          # Scripts SQL
```

## 🚀 Como executar

### Backend (Spring Boot)
```bash
cd backend/cantina
./mvnw spring-boot:run
```

### Frontend (React)
```bash
cd cantinabelval
npm install
npm run dev
```

### Banco de Dados
Execute o script SQL em `banco de dados/bd_cantina_online.sql` no seu MySQL.

## 🔧 Configuração

1. Configure o banco de dados MySQL
2. Ajuste as configurações em `backend/cantina/src/main/resources/application.properties`
3. Execute o backend na porta 8080
4. Execute o frontend na porta 5173

## 📋 Funcionalidades

- Sistema de login para alunos e funcionários
- Catálogo de produtos
- Carrinho de compras
- Histórico de pedidos
- Gerenciamento de produtos (admin)
- Central de ajuda

## 🛠️ Tecnologias

- **Backend**: Spring Boot, JPA, MySQL
- **Frontend**: React, Vite, CSS3
- **Banco**: MySQL