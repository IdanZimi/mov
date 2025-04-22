import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import CodeEditor from '../../components/CodeEditor/CodeEditor.jsx';
import { apiService } from "../../services/apiService.js";
import SOCKET_EVENTS from "../../socket/events.js";
import { Card, notification } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import useDebounce from '../../hooks/debounce.js';
import '../../styles/CodeBlock/CodeBlock.css';
import CodeBlockHeader from './components/CodeBlockHeader/CodeBlockHeader.jsx';
import { ROLES } from '../../constants/roles.js';
import Message from '../../components/Message/Message.jsx';

const DEBOUNCE_TIME = 500;
const SERVER = import.meta.env.VITE_API_URL;
const NOTIFICATION_DURATION = 3;
const SUCCESS_MESSAGE = '🎉 Congratulations! Your solution is correct! 🎉😊';

let socket;

export default function CodeBlock() {
    const { id } = useParams();
    const nav = useNavigate();
    const [role, setRole] = useState(null);
    const [students, setStudents] = useState(0);
    const { state } = useLocation();
    const [blockData, setBlockData] = useState(state?.block || null);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = ({ message, description, placement }) => {
        api.info({
            message,
            description,
            icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
            placement,
            duration: NOTIFICATION_DURATION,
            onClose: () => nav('/'),
        });
    };

    function getBlockData() {
        if (blockData) return;

        return apiService.getCodeBlockById(id);
    }

    useEffect(() => {
        if (!blockData) {
            getBlockData().then(b => setBlockData(b));
        }

        initSocket();

        return () => socket.disconnect();
    }, [id]);

    function initSocket() {
        socket = io(SERVER);
        socket.emit(SOCKET_EVENTS.JOIN, { blockId: id });
        socket.on(SOCKET_EVENTS.ROLE, setRole);
        socket.on(SOCKET_EVENTS.STUDENT_COUNT, setStudents);
        socket.on(SOCKET_EVENTS.REMOTE_CODE, (newCode) => setBlockData(prev => ({ ...prev, code: newCode })));
    }

    const endSession = useCallback(() => {
        if (role === ROLES.STUDENT) {
            const notificationConfig = {
                message: 'Session Ended',
                description: 'The mentor has left the session. You will be redirected to the lobby.',
                placement: 'top',
            }
            openNotification(notificationConfig);
            return;
        }
        nav('/');
    }, [role]);

    useEffect(() => {
        if (!socket) return;

        socket.on(SOCKET_EVENTS.END_SESSION, endSession);

        return () => socket.off(SOCKET_EVENTS.END_SESSION, endSession);
    }, [endSession])

    const handleCodeChange = useCallback((newCode) => {
        setBlockData(prev => ({ ...prev, code: newCode }));
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

    const solution = blockData?.solution;
    const code = blockData?.code;
    const hasLoaded = solution?.length > 0;
    const isCorrect = hasLoaded && code?.trim() === solution?.trim();;

    return (
        <>
            {contextHolder}
            <div className="code-block-container">
                <Card className="code-block-card">
                    <CodeBlockHeader role={role} students={students} handleLeave={handleLeave} title={blockData?.title} />
                    {isCorrect && <Message type={'success'} message = {SUCCESS_MESSAGE}/>}
                    <CodeEditor code={blockData?.code} onChange={role === ROLES.STUDENT ? handleCodeChange : null} readOnly={role === ROLES.MENTOR} />
                </Card>
            </div>
        </>
    );
}
