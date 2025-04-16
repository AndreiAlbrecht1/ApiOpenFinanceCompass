# 📘 API Open Finance Compass

API RESTful para gerenciamento de usuários, contas bancárias, instituições financeiras e transações, utilizando Node.js, Express, Sequelize e PostgreSQL.

---

## 🚀 Funcionalidades

- Cadastro, listagem, edição e remoção de usuários
- Criação de contas para usuários em instituições financeiras
- Realização de transações (crédito e débito)
- Consulta de saldo e extrato por instituição
- Gerenciamento completo de instituições financeiras
- Autenticação de usuários com JWT

---

## 🧰 Requisitos

- [Node.js](https://nodejs.org/en) **v20.18.0**
- [NPM](https://www.npmjs.com/) **v10.8.2**
- [Docker](https://www.docker.com/products/docker-desktop/)

---

## 📦 Dependências do Projeto

Este projeto utiliza as seguintes dependências para garantir a funcionalidade e qualidade do código:

### 🔧 **Dependências**

- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** – Biblioteca para hash de senhas.
- **[dotenv](https://www.npmjs.com/package/dotenv)** – Carrega variáveis de ambiente a partir de um arquivo `.env`.
- **[express](https://expressjs.com/)** – Framework para construção de APIs em Node.js.
- **[jsonwebtoken](https://jwt.io/)** – JWT (JSON Web Token) para autenticação segura de usuários.
- **[pg](https://www.npmjs.com/package/pg)** – Driver PostgreSQL para Node.js.
- **[pg-hstore](https://www.npmjs.com/package/pg-hstore)** – Biblioteca para serializar e desserializar objetos JSON em PostgreSQL.
- **[sequelize](https://sequelize.org/)** – ORM (Object-Relational Mapper) para interagir com bancos de dados SQL, como PostgreSQL.
- **[yup](https://github.com/jquense/yup)** – Biblioteca para validação de esquemas de objetos, usada para garantir que os dados de entrada atendam aos requisitos.

### 🛠️ **Dependências de Desenvolvimento**

- **[@eslint/js](https://www.npmjs.com/package/@eslint/js)** – Pacote principal do ESLint para análise estática de código.
- **[eslint](https://eslint.org/)** – Ferramenta de linting para identificar e corrigir problemas de estilo e possíveis bugs no código.
- **[globals](https://www.npmjs.com/package/globals)** – Conjunto de variáveis globais para o ESLint.
- **[nodemon](https://www.npmjs.com/package/nodemon)** – Utilitário que reinicia o servidor automaticamente durante o desenvolvimento.
- **[prettier](https://prettier.io/)** – Ferramenta de formatação de código que mantém um estilo consistente no código-fonte.
- **[sequelize-cli](https://sequelize.org/docs/v6/other-topics/cli/)** – Interface de linha de comando para facilitar a criação e execução de migrations e seeders no Sequelize.

---

## 🔐 Autenticação

Esta API utiliza **JWT (JSON Web Tokens)** para autenticação de usuários. A maioria das rotas é protegida e requer um token válido no header da requisição.

Após o login com email e senha válidos, um token JWT é gerado e deve ser enviado no cabeçalho `Authorization` em todas as requisições protegidas.

### ✅ Rotas públicas (não requerem token):

- `POST /users` – Criação de novo usuário.
- `POST /auth/login` – Autenticação de usuário e geração de token JWT.

### 🔒 Middleware de verificação de token

Para acessar rotas protegidas, inclua o token JWT retornado no login no cabeçalho da requisição:

```http
Authorization: Bearer seu_token_jwt
```

Se o token for inválido, ausente ou mal formatado, a requisição será rejeitada com erro 401.

---

## ⚙️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/AndreiAlbrecht1/ApiOpenFinanceCompass.git
cd ApiOpenFinanceCompass
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
SERVER_PORT = 3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=seu_banco

SECRET_KEY="sua_key"
```
> Sugestão para criar a SECRET_KEY: [jwtsecret](https://jwtsecret.com/generate)

> Ajuste os valores conforme sua configuração local, se necessário.

### 4. Suba o banco com Docker

```bash
docker-compose up -d
```

Aguarde o banco estar totalmente ativo antes de seguir.

### 6. Rode as migrations e a seed essencial com esse script

```bash
npm run db:start
```

### 7. Inicie a API em ambiente de desenvolvimento

```bash
npm run dev
```

### 8. Se quiser pode rodar seeds para testes com esse script

> todos os usuários criados pela seed teste tem a senha 12345678

```bash
npm run db:test
```

A aplicação estará disponível em `http://localhost:3000`

---

## 📌 Endpoints

### Autenticação
- `POST /auth/login` - Realizar Login

### Usuários
- `GET /users` - Listar todos
- `GET /users/:id` - Buscar por ID
- `POST /users` - Criar usuário
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Contas
- `POST /users/:id/accounts` - Criar conta bancária
- `GET /users/:id/accounts` - Listar contas (filtrável por institução)
- `DELETE /users/:id/accounts/:accountId` - Deletar conta

### Transações
- `POST /users/:id/transactions` - Criar transação
- `GET /users/:id/balance` - Consultar saldo (filtrável por institução)
- `GET /users/:id/statement` - Consultar extrato (filtrável por institução)

### Instituições financeiras
- `GET /institutions` - Listar todas instituições
- `GET /institutions/:id` - Buscar instituição por ID
- `POST /institutions` - Criar instituição
- `PATCH /institutions/:id` - Atualizar instituição
- `DELETE /institutions/:id` - Deletar instituição

---

## 📁 Estrutura do projeto

```
src
├── app
│   ├── controllers
│   ├── middlewares
│   ├── models
│   └── services
├── config
│   └── database.cjs
├── database
│   ├── migrations
│   └── seeds
├── routes
├── app.js
└── server.js
```

---

## 🧪 Scripts úteis

```bash
npm run dev             # Inicia o servidor com Nodemon
npm run db:start        # Migrations e Seed essencial
npm run db:reset        # Dropa, cria e popula o banco com a seed essencial
npm run db:test         # Popula o banco com seeds para testar o banco com exemplos
```
---

## 📌 Endpoint de Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "andrei@email.com",
  "password": "12345678"
}
```

**Resposta esperada:**
```json
{
  "user": {
    "id": 1,
    "name": "Andrei Albrecht",
    "email": "andrei@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🧾 Endpoints dos Usuários

### 1. Listar todos os usuários
```http
GET /users
```
**Resposta esperada:**
```json
[
  {
    "id": 1,
    "name": "Andrei",
    "email": "andrei@email.com",
    "hashed_password": "$2b$09$GZWO5bFPY6Oxb49Nb1TOR.x6ckg3uCy6h1/HvCU90Beh3DBdB0JfS",
    "rounds": 9,
    "created_at": "2025-04-14T21:44:03.676Z"
  },
  {
    "id": 2,
    "name": "Lucas",
    "email": "lucas@email.com",
    "hashed_password": "$2b$09$GZWO5bFPY6Oxb49Nb1TOR.x6ckg3uCy6h1/HvCU90Beh3DBdB0JfS",
    "rounds": 9,
    "created_at": "2025-04-14T21:44:03.676Z"
  },
  {
    "id": 3,
    "name": "Maria",
    "email": "maria@email.com",
    "hashed_password": "$2b$09$GZWO5bFPY6Oxb49Nb1TOR.x6ckg3uCy6h1/HvCU90Beh3DBdB0JfS",
    "rounds": 9,
    "created_at": "2025-04-14T21:44:03.676Z"
  }
]
```

### 2. Buscar usuário pelo ID
```http
GET /users/1
```
**Resposta esperada:**
```json
{
  "id": 1,
  "name": "Andrei",
  "email": "andrei@email.com",
  "hashed_password": "$2b$09$GZWO5bFPY6Oxb49Nb1TOR.x6ckg3uCy6h1/HvCU90Beh3DBdB0JfS",
  "rounds": 9,
  "created_at": "2025-04-14T21:44:03.676Z"
}
```

### 3. Criar usuário
```http
POST /users
Content-Type: application/json

{
  "name": "Andrei Albrecht",
  "email": "andrei@email.com",
  "password": "12345678"
}
```
**Resposta esperada:**
```json
{
  "message": "Usuário criado com sucesso"
}
```

### 4. Atualizar dados do usuário
#### Atualizando nome e email:
```http
PATCH /users/1
Content-Type: application/json

{
  "name": "Andrei Atualizado",
  "email": "novo@email.com"
}
```

#### Atualizando senha:
```http
PATCH /users/1
Content-Type: application/json

{
  "oldPassword": "12345678",
  "newPassword": "novaSenha123"
}
```
**Resposta esperada:**
```json
{
  "message": "Usuário atualizado com Sucesso"
}
```

### 5. Deletar usuário
```http
DELETE /users/1
```
**Resposta esperada:**
```json
{
  "message": "Usuário deletado com sucesso"
}
```

### 6. Criar conta para usuário
```http
POST /users/1/accounts
Content-Type: application/json

{
  "institutionName": "Banco do Brasil"
}
```
**Resposta esperada:**
```json
{
  "message": "Conta criada com sucesso"
}
```

### 7. Listar contas do usuário
#### Todas as contas:
```http
GET /users/1/accounts
```
**Resposta esperada:**
```json
[
  {
    "id": 1,
    "user": "Andrei",
    "institution": "Banco do Brasil",
    "balance": "400"
  },
  {
    "id": 2,
    "user": "Andrei",
    "institution": "Caixa Econômica",
    "balance": "150"
  },
  {
    "id": 3,
    "user": "Andrei",
    "institution": "Bradesco",
    "balance": "300"
  }
]
```

#### Filtrar por instituição:
```http
GET /users/1/accounts?institution=Banco%20do%20Brasil
```
**Resposta esperada:**
```json
[
  {
    "id": 1,
    "user": "Andrei Atualizado",
    "institution": "Banco do Brasil",
    "balance": "400"
  }
]
```

### 8. Deletar conta do usuário
```http
DELETE /users/1/accounts/3
```
**Resposta esperada:**
```json
{
  "message": "Conta deletada com sucesso."
}
```

### 9. Criar transação
```http
POST /users/1/transactions
Content-Type: application/json

{
  "institutionName": "Banco do Brasil",
  "typeTransaction": "crédito",
  "amount": 150.50,
  "description": "Salário"
}
```
**Resposta esperada:**
```json
{
  "message": "Transação feita com sucesso."
}
```

### 10. Ver saldo do usuário
#### Todas as contas:
```http
GET /users/1/balance
```
**Resposta esperada:**
```json
{
  "accounts": [
    {
      "id": 1,
      "user": "Andrei",
      "institution": "Banco do Brasil",
      "balance": "400"
    },
    {
      "id": 2,
      "user": "Andrei",
      "institution": "Caixa Econômica",
      "balance": "150"
    },
    {
      "id": 3,
      "user": "Andrei",
      "institution": "Bradesco",
      "balance": "300"
    }
  ],
  "totalBalance": 850
}
```

#### Por instituição:
```http
GET /users/1/balance?institution=Banco%20do%20Brasil
```
**Resposta esperada:**
```json
{
  "accounts": [
    {
      "id": 1,
      "user": "Andrei",
      "institution": "Banco do Brasil",
      "balance": "400"
    }
  ],
  "totalBalance": 400
}
```

### 11. Ver extrato do usuário
#### Todas as transações:
```http
GET /users/1/statement
```
**Resposta esperada:**
```json
[
  {
    "id": 1,
    "user": "Andrei",
    "institution": "Banco do Brasil",
    "amount": "500",
    "type": "crédito",
    "description": "Depósito inicial"
  },
  {
    "id": 2,
    "user": "Andrei",
    "institution": "Banco do Brasil",
    "amount": "100",
    "type": "débito",
    "description": "Supermercado"
  },
  {
    "id": 3,
    "user": "Andrei",
    "institution": "Caixa Econômica",
    "amount": "300",
    "type": "crédito",
    "description": "Pix recebido"
  },
  {
    "id": 4,
    "user": "Andrei",
    "institution": "Caixa Econômica",
    "amount": "150",
    "type": "débito",
    "description": "Gasolina"
  },
  {
    "id": 5,
    "user": "Andrei",
    "institution": "Bradesco",
    "amount": "300",
    "type": "crédito",
    "description": "Reembolso viagem"
  }
]
```

#### Por instituição:
```http
GET /users/1/statement?institution=Banco%20do%20Brasil
```
**Resposta esperada:**
```json
[
  {
    "id": 1,
    "user": "Andrei",
    "institution": "Banco do Brasil",
    "amount": "500",
    "type": "crédito",
    "description": "Depósito inicial"
  },
  {
    "id": 2,
    "user": "Andrei",
    "institution": "Banco do Brasil",
    "amount": "100",
    "type": "débito",
    "description": "Supermercado"
  }
]
```

---

## 📘 Rotas de Instituições

### 1. Listar Instituições
```http
GET /institutions
```
**Resposta esperada:**
```json
[
  {
    "id": 1,
    "name": "Banco do Brasil",
    "created_at": "2025-04-14T21:44:06.627Z"
  },
  {
    "id": 2,
    "name": "Caixa Econômica",
    "created_at": "2025-04-14T21:44:06.627Z"
  },
  {
    "id": 3,
    "name": "Bradesco",
    "created_at": "2025-04-14T21:44:06.627Z"
  },
  {
    "id": 4,
    "name": "Itaú",
    "created_at": "2025-04-14T21:44:06.627Z"
  },
  {
    "id": 5,
    "name": "Nubank",
    "created_at": "2025-04-14T21:44:06.627Z"
  }
]
```

### 2. Listar Instituição por ID
```http
GET /institutions/1
```
**Resposta esperada:**
```json
{
  "id": 1,
  "name": "Banco do Brasil",
  "created_at": "2025-04-14T21:44:06.627Z"
}
```

### 3. Criar Instituição
```http
POST /institutions
Content-Type: application/json

{
  "name": "Banco do Brasil"
}
```
**Resposta esperada:**
```json
{
  "message": "Instituição criada com sucesso"
}
```

### 4. Editar Instituição
```http
PATCH /institutions/1
Content-Type: application/json

{
  "name": "Banco Atualizado"
}
```
**Resposta esperada:**
```json
{
  "message": "Instituição atualizada com Sucesso"
}
```

### 5. Excluir Instituição
```http
DELETE /institutions/1
```
**Resposta esperada:**
```json
{
  "message": "Instituição deletada com sucesso"
}
```






