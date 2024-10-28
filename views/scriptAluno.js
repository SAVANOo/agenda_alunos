//-------------------------------------------
//./alunos/incluirAluno.html
//Rota POST /api/alunos - Incluir novo aluno
//-------------------------------------------
if (window.location.pathname === '/views/alunos/incluirAluno.html') {
    document.getElementById('alunoFormIncluir').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3000/api/alunos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            if(result.error) throw new Error(result.error);
            
            window.alert(`Registro inserido com sucesso: \n${JSON.stringify(result).replaceAll(',',',\n')}`);
            window.history.back(); // Isso retorna para a página anterior no histórico
            
        } catch (error) {
            console.error(error.message, error);
            window.alert(`Erro ao enviar o formulário:\n${error.message}\n`);
        }
    });
}

//-------------------------------------------
//./alunos/listarAluno.html
//Rota GET /api/alunos/list - Listar alunos
//-------------------------------------------
if (window.location.pathname === '/views/alunos/listarAlunos.html') {
    document.addEventListener('DOMContentLoaded', async () => {
        // Verifica se estamos na página específica
            await carregarAlunos(); // Chama a função apenas nesta página
        }
    );

    document.getElementById('btnPesquisa').addEventListener('click', async () => {
        const key = document.getElementById('inpKey').value;
    
        await carregarAlunosPorChave(key);
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

function criaRegistroAluno(table, id, nome, dtnascimento, email, telefone){
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

async function carregarAlunos() {
    try {
        const response = await fetch('http://localhost:3000/api/alunos/list');
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        const result = await response.json();
        const table = document.getElementById('tabelaAlunos');

        for (const aluno of result) {
            criaRegistroAluno(table, aluno.id, aluno.nome, aluno.data_nascimento, aluno.email, aluno.telefone); 
        }

    } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
    }
}

async function carregarAlunosPorChave(key) {
try {
    const response = await fetch('http://localhost:3000/api/alunos/list');
    if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const result = await response.json();
    const table = document.getElementById('tabelaAlunos');
    while (table.rows.length > 1) { // Mantém o cabeçalho (primeira linha)
        table.deleteRow(1); // Remove a primeira linha após o cabeçalho
    }

    for (const aluno of result) {

        if(key !== null && key !== undefined){
            const lineArray = [aluno.id, aluno.nome, aluno.data_nascimento,aluno.email, aluno.telefone]
            if(substringExists(lineArray, key)){
                criaRegistroAluno(table, aluno.id, aluno.nome, aluno.data_nascimento, aluno.email, aluno.telefone);
            }
        }
    }
} catch (error) {
    console.error('Erro ao enviar a requisição:', error);
}
}

//-------------------------------------------
//./alunos/atualizarAluno.html
//Rota PUT /api/alunos/:id - Atualizar aluno
//-------------------------------------------
if(window.location.pathname === '/views/alunos/atualizarAluno.html'){
    document.getElementById('alunoFormAtualizar').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const id = data.id;

        try {
            const response = await fetch(`http://localhost:3000/api/alunos/${id}`, {
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
                case 'Erro ao atualizar aluno':
                    window.alert(`${result.message}\n${result.error}`); 
                    break;
                case "Aluno não encontrado": 
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
//./alunos/excluirAluno.html
//Rota DELETE /api/alunos/:id - Excluir aluno
//-------------------------------------------
if(window.location.pathname === '/views/alunos/excluirAluno.html'){
    document.getElementById('alunoFormExcluir').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const id = data.id;

        try {
            const response = await fetch(`http://localhost:3000/api/alunos/${id}`, {
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
