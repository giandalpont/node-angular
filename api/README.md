# NodeJS API

API RESTful em Node.js que permite consultar produtores com o menor e maior intervalo entre dois prêmios consecutivos na categoria "Pior Filme".

## Estrutura do Projeto

```
api/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── services/
│   ├── usecases/
│   ├── infrastructure/
│   │   ├── db/
│   ├── interface_adapters/
│   │   └── http/
│   └── index.js
├── data/
│   └── file
├── .gitignore
├── package.json
├── README.md
```

---

## Pré-requisitos

* Node.js **v22.17.0** ou superior
* Git
---

## Instalação e Execução

```bash
# Clonar o repositório
git clone git@github.com:giandalpont/node-angular.git
cd node-angular/api

# Instalar dependências
npm install

# Rodar a aplicação
npm start
```

O servidor iniciará em [`http://localhost:3333`](http://localhost:3333)

---

## Uso da API

### GET [/api/v1/intervals](http://localhost:3333/api/v1/intervals)

Retorna um JSON com os produtores de menores e maiores intervalos.

**Exemplo de request**:

```http
GET http://localhost:3333/api/v1/intervals
```

**Exemplo de response**:

```json
{
  "min": [
    { "producer": "Producer 1", "interval": 1, "previousWin": 2008, "followingWin": 2009 },
    { "producer": "Producer 2", "interval": 1, "previousWin": 2018, "followingWin": 2019 }
  ],
  "max": [
    { "producer": "Producer 3", "interval": 99, "previousWin": 1900, "followingWin": 1999 },
    { "producer": "Producer 4", "interval": 99, "previousWin": 2000, "followingWin": 2099 }
  ]
}
```

---

## Formato do CSV

O arquivo `data/movies.csv` deve ter as colunas separadas por ponto-e-vírgula (`;`):

```
year;title;studios;producers;winner
1980;Movie A;Studio X;Producer A;yes
1981;Movie B;Studio Y;Producer B;no
...
```

* **year**: ano do award
* **title**: nome do filme
* **studios**: estúdios envolvidos (opcional)
* **producers**: lista de produtores, separados por vírgula
* **winner**: `yes` ou `no`

---

## Testes

### Unitários

```bash
npm run test
```

---

*Projeto desenvolvido com padrões de **Clean Architecture**, **SOLID** e **Clean Code**.*
