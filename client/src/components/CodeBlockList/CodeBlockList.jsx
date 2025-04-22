import CodeBlockCard from '../CodeBlockCard/CodeBlockCard.jsx';
import '../../styles/CodeBlock/CodeBlockList.css';

export default function CodeBlockList({ blocks }) {
    return (
        <div className="blocks-grid">
            {blocks?.map(block => (
                <CodeBlockCard key={block._id} block={block} />
            ))}
        </div>
    );
}
