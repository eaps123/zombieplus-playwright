![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL

## 🤖 Como executar

1. Clonar o repositório, instalar as dependências
```
npm install
```

2. Executar testes em Headless
```
npx playwright test 
```

3. Executar ver o relatório dos testes
```
npx playwright show-report
```

<hr>
Curso disponível em https://qaxperience.com

## 🤖 Como executar o docker

1. Executar o Docker desktop e dar play no container zombieplus
```
- Sobe um novo ambiente (Banco de dados)
docker-compose up -d

- Deleta o ambiente criado (Banco de dados)
docker-compose down
```

2. Via gitbash, executar os comandos para subir o servidor API
```
cd /c/QAx/apps/zombieplus/api
./db.sh
npm run dev
```

3. Via gitbash, executar os comandos para subir o servidor WEB
```
cd /c/QAx/apps/zombieplus/web/
npm run dev 
```

Obs. Dados para registro do banco
```
Registro do ambiente:
Genenral: pgdb
Connection:
pgdb
5432
postgres
postgres
pwd123

Create-Database
zombieplus

Ao finalizar, basta ir na interface do docker > Containers > Clicar em stop/play para para ou ligar o banco, assim não zera!

http://localhost:3000/
http://localhost:16543/browser/
```