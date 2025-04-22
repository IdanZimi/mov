import { Typography, Tooltip, Space, Badge, Button } from 'antd';
import { CrownOutlined, UserOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import '../../../../styles/CodeBlock/CodeBlockHeader.css';
import { ROLES } from '../../../../constants/roles';
const { Title, Text } = Typography;

export default function CodeBlockHeader({ role, students, handleLeave, title }) {
    
    return (
        <div className="header-section">
            <Title level={2}>
                <Tooltip title={role}>
                    {role && (role === ROLES.MENTOR ?
                        (<CrownOutlined className="mentor-icon" />) :
                        (<UserOutlined className="student-icon" />)
                    )}
                </Tooltip> {title} - <Text mark>{role}</Text>
            </Title>
           
            <Space>
                <Badge count={students} showZero>
                    <Button icon={<TeamOutlined />} type="primary"> Students </Button>
                </Badge>
                <Button icon={<LogoutOutlined />} danger onClick={handleLeave}> Leave </Button>
            </Space>
        </div>
    )
}

