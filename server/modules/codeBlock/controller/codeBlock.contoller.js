import {fetchAllCodeBlocks, fetchCodeBlockById} from '../service/codeBlock.service.js';

export const getCodeBlocks = async (req, res, next) => {
    try {
        const codeBlocks = await fetchAllCodeBlocks();
        res.json(codeBlocks);
    } catch (err) {
        next(err);
    }
};

export const getCodeBlockById = async (req,res,next) => {
    try {
        const { id } = req.params;
        const codeBlock = await fetchCodeBlockById(id);
        res.json(codeBlock);
    } catch (err) {
        next(err);
    }
};
