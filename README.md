<h1 align="center">CRUD de usuarios.</h1>

Esse projeto consiste em uma aplicacao backend composta por 7 rotas, onde 4 destas rotas possuem protecao de token e administracao para o acesso, ou seja, voce precisa ter um cadastro, efetuar o login com sucesso e possuir permissoes de adm(chave isAdm no objeto de cadastro).

## Recursos utilizados no desenvolvimento:

- Node.Js;
- JavaScript;
- Express;
- Jest.

## 🛠️ Excutar e testar o projeto:

- Nao esqueca de rodar o comando `yarn` para instalar as dependencias antes de testar a aplicacao.
- `yarn dev` para manipulacoes no Insomnia ou `yarn test` para a bateria de teste do jest.

## Testando a Aplicação Localmente:

OBJETOS ESPERADOS NAS ROTAS:

- Para cadastro: `{ "name": string, "email": string, "password": string, "isAdm": boolean }`

- Para Login: `{ "email": string, "password": string }`

- Para edicao do usuario: `{ "name": string, "email": string }`

ROTAS:

| ROTA           | HTTP(Verbo) | Descrição                    |
| -------------- | ----------- | ---------------------------- |
| /users         | POST        | Cadastrar usuario            |
| /login         | POST        | Logar com usuario            |
| /users         | GET         | Selecionar todos os usuarios |
| /users/:id     | GET         | Selecionar Por Id            |
| /users/profile | GET         | Selecionar o usuario logado  |
| /users/:id     | PUT         | Atualizar Por Id             |
| /users/:id     | DELETE      | Excluir Por Id               |

### Obrigado por acessar. E se encontrar falhas nao esqueca de me contatar. Afinal estamos sempre aprendendo!
