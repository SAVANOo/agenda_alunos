import { ENDPOINTS, VIEW_PATHS } from "../config.js";
//-------------------------------------------
//./alunos/listarAluno.html
//Rota GET /api/alunos/list - Listar alunos
//-------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
    // Verifica se estamos na página específica
    await carregarAlunos(); // Chama a função apenas nesta página
}
);


const pesquisarButton = document.getElementById('pesquisa-button')
pesquisarButton.addEventListener('click', async () => {
    const key = document.getElementById('chave-input').value;

    await carregarAlunosPorChave(key);
});


//retorna true se determinada sequência de caracteres aparece no array
function substringExists(array, substring) {
    for (element of array) {
        if (String(element).includes(substring)) {
            return true;
        }
    }
    return false;
}

function criaRegistroAluno(table, id, nome, dtnascimento, email, telefone) {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = id;
    tr.appendChild(tdId);

    const tdNome = document.createElement('td');
    tdNome.textContent = nome;
    tr.appendChild(tdNome);

    const tdDataNascimento = document.createElement('td');
    tdDataNascimento.textContent = dtnascimento;
    tr.appendChild(tdDataNascimento);

    const tdEmail = document.createElement('td');
    tdEmail.textContent = email;
    tr.appendChild(tdEmail);

    const tdTelefone = document.createElement('td');
    tdTelefone.textContent = telefone;
    tr.appendChild(tdTelefone);

    const tdButton = document.createElement('td');
    const criarAgendaButton = document.createElement('button');
    criarAgendaButton.addEventListener('click', () => {window.location.href= `${VIEW_PATHS.AGENDA.INCLUIR}?aluno_id=${id}`});
    criarAgendaButton.textContent = 'Criar Agenda';
    criarAgendaButton.target = '_blank';
    tdButton.appendChild(criarAgendaButton);
    tr.appendChild(tdButton);

    table.appendChild(tr);
}

async function carregarAlunos() {
    try {
        const response = await fetch(`${ENDPOINTS.ALUNOS}/list`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const result = await response.json();
        const table = document.getElementById('alunos-table');

        for (const aluno of result) {
            criaRegistroAluno(table, aluno.id, aluno.nome, aluno.data_nascimento, aluno.email, aluno.telefone);
        }

    } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
    }
}

async function carregarAlunosPorChave(key) {
    try {
        const response = await fetch(`${ENDPOINTS.ALUNOS}/list`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const result = await response.json();
        const table = document.getElementById('alunos-table');
        while (table.rows.length > 1) { // Mantém o cabeçalho (primeira linha)
            table.deleteRow(1); // Remove a primeira linha após o cabeçalho
        }

        for (const aluno of result) {

            if (key !== null && key !== undefined) {
                const lineArray = [aluno.id, aluno.nome, aluno.data_nascimento, aluno.email, aluno.telefone]
                if (substringExists(lineArray, key)) {
                    criaRegistroAluno(table, aluno.id, aluno.nome, aluno.data_nascimento, aluno.email, aluno.telefone);
                }
            }
        }
    } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
    }
}
