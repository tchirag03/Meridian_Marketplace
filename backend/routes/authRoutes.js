import { Router } from 'express';
const authRouter = Router();
import { signup, login } from '../controllers/authController';
import authMiddleware, { protect } from '../middleware/authMiddleware.js';
import { findById } from '../models/user.model';

authRouter.post('/signup', signup);

authRouter.post('/login', login);

authRouter.post('/me', protect(['seller' , 'buyer']), async (req, res) => { 
    try {
        const user = await findById(req.user.id).select('-password');
        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default authRouter;