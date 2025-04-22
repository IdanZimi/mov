import CodeBlockCard from '../CodeBlockCard/CodeBlockCard.jsx';
import '../../styles/CodeBlock/CodeBlockList.css';
import { Typography } from 'antd';

const { Text } = Typography;

export default function CodeBlockList({ blocks }) {
    if (!blocks) return 

    if (!blocks.length) {
        return <Text strong keyboard>NO CODE BLOCKS FOUND AT THE MOMENT</Text>
    }

    return (
        <div className="blocks-grid">
            {blocks?.map(block => (
                <CodeBlockCard key={block._id} block={block} />
            ))}
        </div>
    );

}
