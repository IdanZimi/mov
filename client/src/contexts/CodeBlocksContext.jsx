import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService.js';

const CodeBlocksContext = createContext();


export function CodeBlocksProvider({ children }) {
    const [blocks, setBlocks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        apiService.getAllCodeBlocks()
            .then(data => setBlocks(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);


    const getBlockById = async (id) => {
        if (blocks) {
            const found = blocks.find(b => b._id === id);
            if (found) return found;
        }

        return apiService.getCodeBlockById(id);
    };

    return (
        <CodeBlocksContext.Provider value={{ blocks, loading, error, getBlockById }}>
            {children}
        </CodeBlocksContext.Provider>
    );
}

export function useCodeBlocks() {
    const codeBlocksContext = useContext(CodeBlocksContext);

    if (!codeBlocksContext) {
        throw new Error('useCodeBlocks must be used within a CodeBlocksProvider');
    }

    return codeBlocksContext;
}
