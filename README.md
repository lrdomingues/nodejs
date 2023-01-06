# NodeJS Project API

Neste projeto utilizei a stack NodeJS para o desenvolvimento do sistema. Escolhi NodeJS por ser uma plataforma de código aberto que permite o desenvolvimento de aplicações em tempo real, com alta performance e escalabilidade.

Utilizei a versão 12.13.0 do NodeJS e o framework Express para gerenciamento das rotas e requisições da aplicação. Além disso, adicionei os pacotes 'mongoose' para realizar a conexão e manipulação de dados com o banco de dados MongoDB e 'dotenv' para gerenciamento de variáveis de ambiente.

O banco de dados utilizado neste projeto é o MongoDB, escolhido por ser um banco de dados NoSQL, o que possibilita maior flexibilidade e escalabilidade para a aplicação.

## Executando os testes
Para subir o sistema e realizar os testes, siga os seguintes passos:

1. Certifique-se de ter o [NodeJS](https://nodejs.org/en/download/) e o [MongoDB](https://cloud.mongodb.com/v2/63b590ca5accf15e13348be8#/clusters/connect?clusterId=Cluster0) instalados em sua máquina.
2. Faça o clone do projeto para o seu computador.
```
git clone https://github.com/seu-usuario/nome-do-projeto.git
```
3. Acesse o diretório do projeto pelo terminal e execute o comando **`npm install`** para instalar todas as dependências do projeto.
```
cd nome-do-projeto
```
4. Crie um arquivo **`.env`** na raiz do projeto e adicione as variáveis de ambiente necessárias para a configuração do banco de dados e outras configurações da aplicação.
```
MONGO_URI = "mongodb+srv://<user>:<password>@cluster0.2q51z8b.mongodb.net/<database>?retryWrites=true&w=majority"
JWT_SECRET = "defina uma palavra ou frase..."
EMAIL = "informe o e-mail que será usado como transporter"
PASSWORD = "informe a senha do e-mail"
```
5. Inicie o servidor da aplicação com o comando **`npm run dev`**.
6. O servidor será iniciado no endereço **`http://localhost:3333`**.
7. Utilizando [Postman](https://www.postman.com/downloads/) ou [Insomnia](https://insomnia.rest/download) você poderá executar as rotas da API.