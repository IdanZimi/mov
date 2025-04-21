import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from "../services/apiService.js";
import { Card, Typography } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import Error from '../components/Error/Error';
import Loading from '../components/Loading/Loading';
import '../styles/Lobby.css';

const { Title } = Typography;

export default function Lobby() {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCodeBlocks();
    }, []);

    function fetchCodeBlocks() {
        apiService.getCodeBlocks()
            .then(setBlocks)
            .catch((error) => {
                setLoading(false);
                setError(error.message);

            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="lobby-container">
            <Title level={2} className="lobby-title" style={{ marginBottom: '40px' }}>
                <CodeOutlined /> Choose a Code Block
            </Title>
            {error && <Error message={error} />}
            {loading && <Loading />}
            {!error && !loading && (
                <div className="blocks-grid">
                    {blocks.map(b => (
                        <div key={b._id} className="block-card-wrapper">
                            <Link to={`/block/${b._id}`} state={{ block: b }} className="block-link">
                                <Card hoverable className="block-card" styles={{ header: { color: '#416b97' } }} title={b.title}>
                                    <p className="block-card-description">
                                        Click to join this coding session
                                    </p>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
