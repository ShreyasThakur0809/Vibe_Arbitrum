import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Route for the frontend to sync/login a user via their wallet
router.post('/sync', userController.loginOrRegisterUser);

// Route for Postman to create users with full data (for testing)
router.post('/', userController.createUser);

// Route to get all users for the swipe deck
router.get('/', userController.getAllUsers);

// Route to update a user's profile (from the settings page)
router.put('/:id', userController.updateUserProfile);

export default router;