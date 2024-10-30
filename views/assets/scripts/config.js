const API_BASE_URL = "http://localhost:3000/api";
const VIEW_PATH_BASE_URL = "http://localhost:5500/views";

export const ENDPOINTS = {
    ALUNOS: `${API_BASE_URL}/alunos`,
    AGENDA: `${API_BASE_URL}/agenda`,
};

export const VIEW_PATHS = {
    ALUNOS: {
        INCLUIR: `${VIEW_PATH_BASE_URL}/alunos/incluir.html`,
        ATUALIZAR: `${VIEW_PATH_BASE_URL}/alunos/atualizar.html`,
    },
    AGENDA: {
        INCLUIR: `${VIEW_PATH_BASE_URL}/agenda/incluir.html`,
        ATUALIZAR: `${VIEW_PATH_BASE_URL}/agenda/atualizar.html`,
    },
};
