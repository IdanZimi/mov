import { Link } from 'react-router-dom';
import { Card } from 'antd';
import '../../styles/CodeBlock/CodeBlockCard.css';

const CARD_PATH = '/block';

export default function CodeBlockCard({ block }) {
    return (
        <div key={block._id} className="block-card-wrapper">
            <Link to={`${CARD_PATH}/${block._id}`} state={{ block: block }} className="block-link">
                <Card hoverable className="block-card" styles={{ header: { color: '#416b97' } }} title={block.title}>
                    <p className="block-card-description">
                        Click to join this coding session
                    </p>
                </Card>
            </Link>
        </div>
    );
}
