import { useEffect, useState } from 'react';
import { apiService } from "../../services/apiService.js";
import { Typography } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import Error from '../../components/Error/Error.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import '../../styles/Lobby.css';
import CodeBlockList from '../../components/CodeBlockList/CodeBlockList.jsx';
import { useCodeBlocks } from '../../contexts/CodeBlocksContext.jsx';

const { Title } = Typography;

export default function Lobby() {
    const { blocks, loading, error } = useCodeBlocks();

    return (
        <div className="lobby-container">
            <Title level={2} className="lobby-title" style={{ marginBottom: '40px' }}>
                <CodeOutlined /> Choose a Code Block
            </Title>
            {error && <Error message={`Error: ${error}`} />}
            {loading && <Loading />}
            {!error && !loading && <CodeBlockList blocks={blocks} />}
        </div>
    );
}
