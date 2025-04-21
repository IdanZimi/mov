import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import CodeEditor from '../components/CodeEditor';
import { apiService } from "../services/apiService.js";
import SOCKET_EVENTS from "../socket/events.js";
import { Button, Typography, Space, Badge, Card, Tooltip } from 'antd';
import { CrownOutlined, TeamOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useDebounce from '../hooks/debounce.js';
import '../styles/CodeBlock.css';

const { Title, Text } = Typography;
const DEBOUNCE_TIME = 500;
const SERVER = import.meta.env.VITE_API_URL;
let socket;

const ROLES = Object.freeze({
    MENTOR: 'mentor',
    STUDENT: 'student'
})

export default function CodeBlock() {
    const { id } = useParams();
    const nav = useNavigate();
    const [title, setTitle] = useState('');
    const [solution, setSolution] = useState('');
    const [role, setRole] = useState(null);
    const [students, setStudents] = useState(0);
    const [code, setCode] = useState('');
    const { state } = useLocation();
    const [blockData, setBlockData] = useState(state?.block || null);

    function getBlockData() {
        if (blockData) return;
        
        console.log("getting from api with id ", id);
        return apiService.getCodeBlockById(id);
    }

    function initSocket() {
        socket = io(SERVER);
        socket.emit(SOCKET_EVENTS.JOIN, { blockId: id });
        socket.on(SOCKET_EVENTS.ROLE, setRole);
        socket.on(SOCKET_EVENTS.STUDENT_COUNT, setStudents);
        socket.on(SOCKET_EVENTS.REMOTE_CODE, incoming => {
            setCode(incoming);
        });
        socket.on(SOCKET_EVENTS.END_SESSION, () => nav('/'));
    }

    useEffect(() => {
        if (!blockData) {
            getBlockData().then(b => setBlockData(b));
        }
        console.log("useEffect number 1")
        initSocket()
        return () => socket.disconnect();
    }, [id]);

    useEffect(() => {
        console.log("useEffect number 2")
        if (!blockData) return;
        const { title, solution, template } = blockData;

        setTitle(title);
        setSolution(solution);
        setCode(template);

    }, [blockData]);

    const handleCodeChange = useCallback((newCode) => {
        setCode(newCode);
        debounedCodeChangeEmitter(newCode);
    }, [])

    const emitCodeChange = useCallback((newCode) => {
        socket.emit(SOCKET_EVENTS.CODE_CHANGE, newCode);
    }, []);

    const debounedCodeChangeEmitter = useDebounce(emitCodeChange, DEBOUNCE_TIME);

    const handleLeave = () => {
        socket.disconnect();
        nav('/');
    };

    const hasLoaded = solution?.length > 0;
    const isCorrect = hasLoaded && code.trim() === solution.trim();
    console.log("hasLoaded", hasLoaded);


    return (
        <div className="code-block-container">
            <Card className="code-block-card">
                <div className="header-section">
                    <Title level={2}>
                        <Tooltip title={role}>
                            {role === ROLES.MENTOR ?
                                <CrownOutlined style={{ color: '#faad14' }} /> :
                                <UserOutlined style={{ color: '#1890ff' }} />
                            }
                        </Tooltip> {title}
                    </Title>
                    <Space>
                        <Badge count={students} showZero>
                            <Button icon={<TeamOutlined />} type="primary"> Students </Button>
                        </Badge>
                        <Button icon={<LogoutOutlined />} danger onClick={handleLeave}> Leave </Button>
                    </Space>
                </div>

                {isCorrect && (
                    <div className="success-message">
                        <Text type="success" style={{ fontSize: '24px' }}> 🎉 Congratulations! Your solution is correct! 🎉😊</Text>
                    </div>
                )}

                <div className="editor-wrapper">
                    <CodeEditor
                        code={code}
                        onChange={role === ROLES.STUDENT ? handleCodeChange : null}
                        readOnly={role === ROLES.MENTOR}
                    />
                </div>
            </Card>
        </div>
    );
}
