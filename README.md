# 🚀 API de Blog RESTful com NestJS e Prisma ORM

Este projeto implementa uma API RESTful completa para um sistema de blog, conforme os requisitos do trabalho prático. A aplicação utiliza a arquitetura modular do NestJS, o ORM Prisma para interagir com o banco de dados SQLite e validação de dados via DTOs.

## ✨ Funcionalidades Implementadas

* **CRUD Completo (Criação, Leitura, Edição, Deleção)** para Usuários, Autores e Posts.
* **Edição (PUT):** Todos os recursos (User, Author, Post) suportam atualização via método `PUT`.
* **Relações Complexas:**
    * **1:1:** `User` e `Author` (um usuário pode ser um autor).
    * **1:N:** `Author` e `Post` (um autor tem vários posts).
    * **N:N:** `User` pode favoritar vários `Post`s através da tabela `Favorite`.
* **Filtros Dinâmicos:** Consulta de posts por `authorId` e por `date` (com tratamento de fuso horário).

## 🛠️ Tecnologias Utilizadas

* **Framework:** NestJS
* **Linguagem:** TypeScript
* **ORM:** Prisma ORM
* **Banco de Dados:** SQLite (arquivo `dev.db`)
* **Validação:** Class-Validator & Class-Transformer

## ⚙️ Boas Práticas e Arquitetura

O projeto foi estruturado seguindo as melhores práticas do NestJS e do desenvolvimento de APIs:

1.  **Arquitetura Modular:** Separação lógica em módulos independentes (`UsersModule`, `AuthorsModule`, `PostsModule`).
2.  **DTOs (Data Transfer Objects):** Uso de DTOs (`Create*Dto`, `Update*Dto`) com `class-validator` para garantir a integridade dos dados de entrada em todas as requisições.
3.  **Prisma Global:** O `PrismaModule` foi configurado como global, centralizando a conexão com o banco de dados e garantindo a correta inicialização (`$connect`) e encerramento (`$disconnect`).
4.  **ParseIntPipe:** Uso de `ParseIntPipe` nos Controllers para converter corretamente os parâmetros de rota (`:id`) de `string` para `number`, evitando erros de validação no Prisma.
5.  **Lógica de Negócio nos Services:** Manutenção da separação de responsabilidades (Controllers lidam com HTTP, Services lidam com a lógica de dados e Prisma).
6.  **Tratamento de Ambiente:** Uso do `dotenv-cli` para garantir que as variáveis de ambiente (`DATABASE_URL`) sejam carregadas corretamente durante as migrações e o desenvolvimento.

## 🚀 Como Executar o Projeto

Siga estas etapas para configurar e rodar o projeto localmente:

### 1. Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados.

### 2. Instalação de Dependências

```bash
npm install
```

### 3. Configuração do Banco de Dados

O projeto utiliza SQLite, que é um banco de dados baseado em arquivo (dev.db). Você precisa aplicar as migrações para criar as tabelas (User, Author, Post, Favorite).

Nota sobre .env: O projeto usa o dotenv-cli para garantir que o DATABASE_URL seja carregado corretamente durante a migração.

```bash
# Aplica as migrações do schema.prisma e cria o arquivo dev.db
npx prisma migrate dev
```

### 4. Inicialização do Servidor

Para iniciar a aplicação em modo de desenvolvimento (com watch mode):

```bash
npm run start:dev
```

A API estará acessível em http://localhost:3000.

### 5. Acessar o Prisma Studio (Opcional)

Para visualizar e gerenciar os dados diretamente no navegador:
```bash
npx prisma studio
```
O Studio estará acessível em http://localhost:5555.

### 📌 Documentação dos Endpoints (Rotas)

Abaixo estão os principais endpoints para interagir com a API. Recomenda-se usar ferramentas como Thunder Client (VS Code) ou Postman para testar.

### 1. Módulo Usuários (`/users`)

| Método | Endpoint | Descrição | Corpo de Exemplo |
| :--- | :--- | :--- | :--- |
| `POST` | `/users` | Cria um novo usuário. | `{ "name": "Paola Oda", "email": "paola@email.com" }` |
| `GET` | `/users` | Lista todos os usuários. | (N/A) |
| `PUT` | `/users/:id` | Atualiza o nome/email de um usuário. | `{ "name": "Paola Mayuri" }` |
| `POST` | `/users/:id/favorites/:postId` | **Favorita um post.** | (N/A) |
| `GET` | `/users/:id/favorites` | Lista todos os favoritos de um usuário. | (N/A) |

### 2. Módulo Autores (`/authors`)

| Método | Endpoint | Descrição | Corpo de Exemplo |
| :--- | :--- | :--- | :--- |
| `POST` | `/authors` | Cria um autor vinculado a um usuário existente. | `{ "userId": 1, "bio": "Desenvolvedor..." }` |
| `GET` | `/authors` | Lista todos os autores. | (N/A) |
| `PUT` | `/authors/:id` | Atualiza a biografia (`bio`) de um autor. | `{ "bio": "Biografia atualizada." }` |

### 3. Módulo Posts (`/posts`)

| Método | Endpoint | Descrição | Corpo de Exemplo |
| :--- | :--- | :--- | :--- |
| `POST` | `/posts` | Cria um novo post, vinculado a um autor existente. | `{ "title": "Novo Post", "content": "Conteúdo...", "authorId": 1 }` |
| `GET` | `/posts` | Lista todos os posts (suporta filtros). | (N/A) |
| `PUT` | `/posts/:id` | Atualiza um post (título, conteúdo, status `published`). | `{ "published": true }` |

### 4. Exemplos de Filtros (GET /posts)

| Parâmetro | Exemplo | Resultado |
| :--- | :--- | :--- |
| `authorId` | `/posts?authorId=1` | Lista posts apenas do Autor com ID 1. |
| `date` | `/posts?date=2025-10-27` | Lista posts publicados no dia 27 de Outubro de 2025. |
| Combinado | `/posts?authorId=2&date=2025-10-28` | Filtro por autor e data combinados. |







