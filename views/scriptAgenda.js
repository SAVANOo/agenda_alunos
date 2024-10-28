//-------------------------------------------
//./agenda_alunos/incluirAgendaAluno.html
//Rota POST /api/agenda - Incluir nova agenda
//-------------------------------------------
if (window.location.pathname === '/views/agenda_alunos/incluirAgendaAluno.html') {
    document.getElementById('agendaFormIncluir').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3000/api/agenda/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            if(result.message === 'Erro ao criar agenda'){
                window.alert(`${result.message}\n${result.error}`); 
            } else {
                window.alert(`Registro inserido com sucesso: \n${JSON.stringify(result).replaceAll(',',',\n')}`);
                window.history.back(); // Isso retorna para a página anterior no histórico
            }
            
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
        }
    });
}

//-------------------------------------------
//./agenda_alunos/listarAgendaAluno.html
//Rota GET /api/agenda/list - Listar agendas
//-------------------------------------------
if (window.location.pathname === '/views/agenda/listarAgendaAluno.html') {
    document.addEventListener('DOMContentLoaded', async () => {
        // Verifica se estamos na página específica
            await carregarAgenda(); // Chama a função apenas nesta página
        }
    );

    document.getElementById('btnPesquisa').addEventListener('click', async () => {
        const key = document.getElementById('inpKey').value;
    
        await carregarAgendaPorChave(key);
    });
}

//retorna true se determinada sequência de caracteres aparece no array
function substringExists(array, substring) {
    for(element of array){
        if(String(element).includes(substring)){
            return true;
        }
    }
    return false;
}

function criaRegistroAgenda(table, id, nome, dtnascimento, email, telefone){
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

    table.appendChild(tr);
}

async function carregarAgenda() {
    try {
        const response = await fetch('http://localhost:3000/api/agenda/list');
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const result = await response.json();
        const table = document.getElementById('tabelaAgenda');

        for (const agenda of result) {
            criaRegistroAgenda(table, agenda.id, agenda.aluno_id, agenda.data, agenda.hora, agenda.descricao, agenda.local); 
        }

    } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
    }
}

async function carregarAgendaPorChave(key) {
try {
    const response = await fetch('http://localhost:3000/api/agenda/list');
    if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const result = await response.json();
    const table = document.getElementById('tabelaAgenda');
    while (table.rows.length > 1) { // Mantém o cabeçalho (primeira linha)
        table.deleteRow(1); // Remove a primeira linha após o cabeçalho
    }

    for (const agenda of result) {

        if(key !== null && key !== undefined){
            const lineArray = [agenda.id, agenda.nome, agenda.data_nascimento,agenda.email, agenda.telefone]
            if(substringExists(lineArray, key)){
                criaRegistroAgenda(table, agenda.id, agenda.aluno_id, agenda.data, agenda.hora, agenda.descricao, agenda.local);
            }
        }
    }
} catch (error) {
    console.error('Erro ao enviar a requisição:', error);
}
}

//-------------------------------------------
//./agenda/atualizarAgendaAluno.html
//Rota PUT /api/agenda/:id - Atualizar agenda
//-------------------------------------------
if(window.location.pathname === '/views/agenda/atualizarAgendaAluno.html'){
    document.getElementById('agendaFormAtualizar').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const id = data.id;

        try {
            const response = await fetch(`http://localhost:3000/api/agenda/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            if(response.ok){
                window.alert(`Registro atualizado com sucesso: \n${JSON.stringify(result).replaceAll(',',',\n')}`);
                window.history.back(); // Isso retorna para a página anterior no histórico
            } else {
                switch (result.message){
                case 'Erro ao atualizar agenda':
                    window.alert(`${result.message}\n${result.error}`); 
                    break;
                case "Agenda não encontrado": 
                    window.alert(`${result.message}`); 
                    break;
                }
            }
            
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
        }
    })
}

//-------------------------------------------
//./agenda_aluno/excluirAluno.html
//Rota DELETE /api/agenda/:id - Excluir agenda
//-------------------------------------------
if(window.location.pathname === '/views/agenda/excluirAgendaAluno.html'){
    document.getElementById('agendaFormExcluir').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const id = data.id;

        try {
            const response = await fetch(`http://localhost:3000/api/agenda/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            
            if(response.status === 204){
                window.alert('Registro deletado com sucesso');
                window.history.back(); // Isso retorna para a página anterior no histórico
            } else {
                const result = await response.json();
                window.alert(`${result.message}`); 
            }
            
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
        }
    })
}
