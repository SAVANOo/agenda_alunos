import { ENDPOINTS } from '../../scripts/config.js';

//-------------------------------------------
//./agenda/atualizar.html
//Rota PUT /api/agenda/:id - Atualizar agenda
//-------------------------------------------

const updateFormReference = document.getElementById('agenda-atualizar-form')

const urlParams = new URLSearchParams(window.location.search);
const agenda_id = urlParams.get('agenda_id');

const agendaReq = await fetch(`${ENDPOINTS.AGENDA}/${agenda_id}`);
const agendaResult = await agendaReq.json();

const aluno_id = agendaResult.aluno_id
const alunoReq = await fetch(`${ENDPOINTS.ALUNOS}/${aluno_id}`);
const alunoResult = await alunoReq.json();

updateFormReference.querySelector('input[name="nome"]').value = alunoResult.nome;

updateFormReference.addEventListener('submit', async (event) => {
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

            if (response.ok) {
                window.alert(`Registro atualizado com sucesso: \n${JSON.stringify(result).replaceAll(',', ',\n')}`);
                window.history.back(); // Isso retorna para a página anterior no histórico
            } else {
                switch (result.message) {
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
