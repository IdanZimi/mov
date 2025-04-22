import { Typography } from 'antd';
import '../../styles/Message/Message.css';

const { Text } = Typography;

export default function Message({ message, type }) {
    return (
        <div className="success-message">
            <Text type= {type} style={{ fontSize: '24px' }}> {message}</Text>
        </div>
    )
}
