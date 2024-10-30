import { ENDPOINTS } from '../../scripts/config.js';


//-------------------------------------------
//./alunos/excluirAluno.html
//Rota DELETE /api/alunos/:id - Excluir aluno
//-------------------------------------------
export async function eventoDeletar(element) { 
    const id = element.id.replace('deletar-button-','');
    
    try {
        const response = await fetch(`${ENDPOINTS.ALUNOS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 204) {
            window.alert('Registro deletado com sucesso');
            window.location.reload();
        } else {
            const result = await response.json();
            window.alert(`${result.message}`);
        }

    } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
    }
}

