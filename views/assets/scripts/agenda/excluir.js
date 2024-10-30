import { ENDPOINTS } from "../config.js";

//-------------------------------------------
//./agenda_aluno/excluirAluno.html
//Rota DELETE /api/agenda/:id - Excluir agenda
//-------------------------------------------
export async function eventoDeletar(event){
    console.log(event);
    const id = event.id;

    try {
        const response = await fetch(`${ENDPOINTS.AGENDA}/${id}`, {
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

