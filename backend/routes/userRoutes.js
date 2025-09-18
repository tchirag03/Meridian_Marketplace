import express from 'express';
import { getMyProfile, updateMyProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// Both routes are protected. A user must be logged in to access them.
// Note that we call protect() with no roles, so any authenticated user (buyer or seller) can access their own profile.

userRouter.get('/me', protect(), getMyProfile);
userRouter.patch('/me', protect(), updateMyProfile);

export default userRouter;