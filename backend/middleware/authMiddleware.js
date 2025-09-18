import { verify } from 'jsonwebtoken';
import User from '../models/user.model';

export default function (req, res, next) {
    // 1. Get token from the header
    const token = req.header('Authorization')?.split(' ')[1]; // Format: "Bearer TOKEN"

    // 2. Check if no token is present
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    // 3. Verify the token
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Add the user payload (id, role) to the request object
        next(); // Move on to the next middleware or the route handler
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};