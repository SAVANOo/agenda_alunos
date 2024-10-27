# Api Agenda de Alunos

Esse projeto foi desenvolvido na disciplina de banco de dados e tem como objetivo implementar um CRUD completo em um cenário de agendamento de alunos.

Essa é a parte do back end reponsável pelas rotas e lógicas de serviço.

## Como rodar o projeto localmente
1. clone o repositório para sua máquina.

``` 
git clone https://github.com/SAVANOo/agenda_alunos.git 
```

2. Entre na pasta
``` shell
cd agenda_alunos
``` 

3. Instale os pacotes necessários para o projeto
``` shell
npm install 
``` 

4. Execute os comandos necessários no seu servidor postgrees para criação de um banco de dados local.


``` sql
CREATE DATABASE agenda_alunos
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```

``` sql
CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

``` sql
CREATE TABLE agenda_aluno (
    id SERIAL PRIMARY KEY,
    aluno_id INT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    descricao TEXT NOT NULL,
    local VARCHAR(255),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);
```
