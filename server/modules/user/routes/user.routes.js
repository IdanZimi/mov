import express from 'express';
import { getUsers, postUser, removeUser } from '../controller/user.contoller.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', postUser);
userRouter.delete('/:id', removeUser);

export default userRouter;
