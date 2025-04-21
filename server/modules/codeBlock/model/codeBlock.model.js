import mongoose from 'mongoose';

const CodeBlockSchema = new mongoose.Schema({
    title:       { type: String, required: true },
    template:    { type: String, required: true },
    solution:    { type: String, required: true },
});

const CodeBlock = mongoose.model('CodeBlock', CodeBlockSchema);

export default CodeBlock;


