import CodeBlock from "../model/codeBlock.model.js";

export const fetchAllCodeBlocks = () => {
    return CodeBlock.find();
};

export const fetchCodeBlockById = (id) => {
    return CodeBlock.findById(id);
};
