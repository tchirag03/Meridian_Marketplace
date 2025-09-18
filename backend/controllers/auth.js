import User from '../models/user.model.js';
import Store from '../models/store.model.js';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export async function signup(req, res) {
    const { name, email, password, role, storeName } = req.body;

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // 2. Hash the password
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        // 3. Create the new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // 4. If the user is a vendor, create a store for them
        if (role === 'vendor') {
            if (!storeName) {
                return res.status(400).json({ message: 'Store name is required for vendors.' });
            }
            const newStore = new Store({
                owner: user._id,
                storeName: storeName,
                description: `${storeName} - A new store on our platform!`, // Default description
            });
            await newStore.save();
            user.store = newStore._id; // Link the user to their new store
        }

        await user.save();

        // 5. Generate a JWT token for auto-login
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        const token = sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' }, // Token expires in 7 days
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



// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export async function login (req, res) {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 2. Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // 3. If credentials are correct, generate and return a JWT
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