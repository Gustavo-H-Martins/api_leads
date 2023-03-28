# Api de acesso aos dados de cartões benefícios
        Este repositório serve de modelo de aplicação da api de leads da Abrasel com base nos cartões benefícios parceiros.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

* ### [Git](https://git-scm.com/)
* ### [Node.js](https://nodejs.org/en/)
* ### [SQLite](https://www.npmjs.com/package/sqlite3)

Além disso, é recomendável ter um editor de código, como o [Visual Studio Code](https://code.visualstudio.com/).

## Como instalar
```bash
# Clone este repositório
$ git clone https://github.com/Gustavo-H-Martins/api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api

# Instale as dependências
$ npm install
```

## Como executar

```bash
# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor iniciará na porta definida no arquivo app.js. Ex: http://localhost:3000
```

## Rotas da API
A API possui as seguintes [rotas](./app/routes/leads.js):

* #### GET `/api/v2/leads/all/{page}/{pageSize}` 
Retorna uma lista de leads determinado pelo número da página e tamanho.
* #### GET `/api/v2/leads/bandeira=all/estado={uf}` 
Retorna uma lista de leads determinado pelo estado selecionado
* #### GET `/api/v2/leads/bandeira={bandeira}/estado=all`
Retorna uma lista de leads determinado pela bandeira do cartão selecionado
* #### GET `/api/v2/leads/bandeira={bandeira}/estado={uf}`
Retorna uma lista de leads determinado pela bandeira e o estado selecionado
* #### GET `/api/v2/leads/bandeira={bandeira}/estado={uf}/cidade={cidade}`
Retorna uma lista de leads determinado pela bandeira, o estado e a cidade selecionados

## Documentação da API
A documentação da API pode ser encontrada na rota `/api/v2/leads/docs`, onde é possível visualizar a lista de rotas, parâmetros e exemplos de requisições e respostas.

Contribuição
Faça um fork do projeto.
Crie uma nova branch com suas alterações: `git checkout -b minha-feature`
Salve suas alterações e faça um commit: `git commit -m "Minha feature"`
Envie suas alterações para o seu fork: `git push origin minha-feature`
Crie um pull request para o repositório original.

[![Gustavo-H-Martins](https://github-readme-stats.vercel.app/api?username=Gustavo-H-Martins&show_icons=true&theme=radical)](https://github.com/Gustavo-H-Martins)
## Licença
Este projeto está sob a licença Apache License 2.0. Consulte o arquivo [LICENSE](./licence) para mais detalhes.
