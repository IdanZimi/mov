const API_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION
const ENDPOINT = 'codeblock'
const API = 'api'

export const  apiService = {
    getCodeBlocks : () => {
        return fetch(`${API_URL}/${API}/${API_VERSION}/${ENDPOINT}`)
            .then(r => r.json());
    },
    getCodeBlockById: (id) =>{
        return fetch(`${API_URL}/${API}/${API_VERSION}/${ENDPOINT}/${id}`)
            .then(r => r.json());
    }
}