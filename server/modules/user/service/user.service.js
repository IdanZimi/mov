import User from '../model/user.model.js';

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

export const fetchAllUsers = async () => {
    return await User.find();
};

export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};
