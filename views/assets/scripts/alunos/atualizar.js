import { ENDPOINTS } from "../config.js";

//-------------------------------------------
//./alunos/atualizar.html
//Rota PUT /api/alunos/:id - Atualizar aluno
//-------------------------------------------
const urlParams = new URLSearchParams(window.location.search);
const aluno_id = urlParams.get('aluno_id');

const updateFormReference = document.getElementById('aluno-atualizar-form')

updateFormReference.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(`${ENDPOINTS.ALUNOS}/${aluno_id}`, {
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

