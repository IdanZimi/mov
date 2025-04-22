const API_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION
const ENDPOINT = 'codeblock'
const API = 'api'

export const apiService = {
    getAllCodeBlocks: () => {
        return getCodeBlocks();
    },
    getCodeBlockById: (id) => {
        return getCodeBlocks(id);
    },
}

function getCodeBlocks(id) {
    return fetch(`${API_URL}/${API}/${API_VERSION}/${ENDPOINT}${id ? '/' + id : ''}`)
        .then(r => r.json());
}
