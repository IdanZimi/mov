import express from 'express';
import {getCodeBlockById, getCodeBlocks} from '../controller/codeBlock.contoller.js';

const codeBlockRouter = express.Router();

codeBlockRouter.get('/', getCodeBlocks);
codeBlockRouter.get('/:id', getCodeBlockById);

export default codeBlockRouter;
