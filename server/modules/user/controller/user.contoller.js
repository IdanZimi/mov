import { createUser, fetchAllUsers, deleteUserById } from '../service/user.service.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await fetchAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const postUser = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

export const removeUser = async (req, res, next) => {
    try {
        const deleted = await deleteUserById(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        next(err);
    }
};
