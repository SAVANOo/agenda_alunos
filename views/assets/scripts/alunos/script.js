import { ENDPOINTS, VIEW_PATHS } from '../../scripts/config.js';


//-------------------------------------------
//./alunos/atualizarAluno.html
//Rota PUT /api/alunos/:id - Atualizar aluno
//-------------------------------------------
if (window.location.pathname === '/views/alunos/atualizarAluno.html') {
    document.getElementById('aluno-atualizar-form').addEventListener('submit', async (event) => {
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

            if (response.ok) {
                window.alert(`Registro atualizado com sucesso: \n${JSON.stringify(result).replaceAll(',', ',\n')}`);
                window.history.back(); // Isso retorna para a página anterior no histórico
            } else {
                switch (result.message) {
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
if (window.location.pathname === '/views/alunos/excluirAluno.html') {
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


            if (response.status === 204) {
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
