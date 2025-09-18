import User from '../models/user.model.js';
import Store from '../models/store.model.js';
import bcrypt ,{ genSalt, hash } from 'bcryptjs';
import  jwt  from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export async function signup(req, res) {
    const { name, email, password, role, storeName } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        if (role === 'vendor') {
            if (!storeName) {
                return res.status(400).json({ message: 'Store name is required for vendors.' });
            }
            const newStore = new Store({
                owner: user._id,
                storeName: storeName,
                description: `${storeName} - A new store on our platform!`, 
            });
            await newStore.save();
            user.store = newStore._id;
        }

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.cookie
                res.status(201).json({ token, message: 'User registered successfully!' });
            }
        );


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}



export async function login (req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, message: 'Logged in successfully!' });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};