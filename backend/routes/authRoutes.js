import { Router } from 'express';
const authRouter = Router();
import { signup, login } from '../controllers/auth.js';
import  { protect } from '../middleware/authMiddleware.js';
import User from '../models/user.model.js';

authRouter.post('/signup', signup);

authRouter.post('/login', login);

authRouter.post('/me', protect(['seller' , 'buyer']), async (req, res) => { 
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default authRouter;