import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lobby from './pages/Lobby/Lobby';
import CodeBlock from './pages/CodeBlock/CodeBlock';
import './App.css';
import { CodeBlocksProvider } from './contexts/CodeBlocksContext';

export default function App() {
    return (
        <BrowserRouter>
            <CodeBlocksProvider>
                <Routes>
                    <Route path="/" element={<Lobby />} />
                    <Route path="/block/:id" element={<CodeBlock />} />
                </Routes>
            </CodeBlocksProvider>
        </BrowserRouter>

    );
}
