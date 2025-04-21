import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lobby     from './pages/Lobby';
import CodeBlock from './pages/CodeBlock';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Lobby />} />
                <Route path="/block/:id" element={<CodeBlock />} />
            </Routes>
        </BrowserRouter>
    );
}
