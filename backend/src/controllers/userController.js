import * as userService from '../services/userService.js';

export const createUser = async (req, res) => {
    try {
        console.log("Received data in createUser controller:", req.body);
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginOrRegisterUser = async (req, res) => {
    try {
        const { walletAddress } = req.body;
        const user = await userService.findOrCreateUser({ walletAddress });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// **THE FIX IS HERE**: This function was missing before.
export const updateUserProfile = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const updatedUser = await userService.updateUserProfile(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};