const prefixPath = "http://localhost:3000/api/agenda/"

//-------------------------------------------
//./alunos/incluirAluno.html
//Rota POST /api/alunos - Incluir novo aluno
//-------------------------------------------
const formReference = document.getElementById('agenda-form-incluir')

formReference.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(prefixPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.error) throw new Error(result.error);

        window.alert(`Registro inserido com sucesso: \n${JSON.stringify(result).replaceAll(',', ',\n')}`);
        window.history.back(); // Isso retorna para a página anterior no histórico
    } catch (error) {
        console.error(error.message, error);
        window.alert(`Erro ao enviar o formulário: ${error.message}`);
        window.alert(`Registro inserido com sucesso: \n${JSON.stringify(result).replaceAll(',', ',\n')}`);
    }
});

