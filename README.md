# NLW Agents - Backend

Este é o backend do projeto **NLW Agents**, desenvolvido durante a trilha de Node.js do evento Next Level Week da [Rocketseat](https://rocketseat.com.br).

A aplicação consiste em uma API para gerenciar salas e agentes, utilizando um banco de dados PostgreSQL com a extensão `pgvector` para funcionalidades de busca por similaridade.

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e padrões:

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Fastify**: Framework web focado em performance e baixo overhead.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Drizzle ORM**: ORM (Object-Relational Mapper) moderno e performático para TypeScript.
- **PostgreSQL**: Banco de dados relacional.
- **pgvector**: Extensão para PostgreSQL que permite o armazenamento e a consulta de vetores de embeddings.
- **Docker**: Utilizado para criar e gerenciar o ambiente do banco de dados de forma isolada.
- **Zod**: Biblioteca para validação de schemas e tipos.
- **Biome**: Ferramenta para formatação e linting do código, garantindo a qualidade e consistência.

## Padrões de Projeto

- **Repositório (Repository Pattern)**: Acesso e manipulação de dados abstraídos através de repositórios, desacoplando a lógica de negócio da persistência de dados.
- **Injeção de Dependência (Dependency Injection)**: Utilizado para fornecer as dependências (como repositórios e serviços) para as rotas da API, facilitando a testabilidade e a manutenção.

## Setup e Configuração do Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

- Node.js (versão 20 ou superior)
- Docker e Docker Compose

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd NLW_20_Agents/backend
```

### 2. Instalar Dependências

Instale todas as dependências do projeto com o seu gerenciador de pacotes preferido.

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env` e preencha as variáveis necessárias.

```bash
cp .env.example .env
```

O conteúdo do arquivo `.env` deve ser semelhante a este:

```env
#HTTP
PORT=3333

#Database
DATABASE_URL="postgresql://docker:docker@localhost:5433/agents"
```

### 4. Iniciar o Banco de Dados

Utilize o Docker Compose para iniciar o container do PostgreSQL com a extensão `pgvector`.

```bash
docker-compose up -d
```

### 5. Executar as Migrations

Com o banco de dados em execução, aplique as migrations para criar as tabelas e estruturas necessárias.

```bash
npx drizzle-kit migrate
```

### 6. Iniciar a Aplicação

Execute o servidor de desenvolvimento.

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.

## Testando a API

Você pode utilizar o arquivo `client.http` na raiz do projeto para testar os endpoints da API com a extensão REST Client do VS Code ou ferramentas similares como Postman ou Insomnia.
