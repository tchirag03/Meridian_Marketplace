import jwt from 'jsonwebtoken';

/**
 * A flexible middleware to protect routes.
 * It first authenticates the user via JWT.
 * Then, if roles are provided, it authorizes based on the user's role.
 * @param {string[]} [roles=[]] - An array of roles (e.g., ['seller']) that are allowed to access the route.
 */
export const protect = (roles = []) => {
    // This is a higher-order function that returns the actual middleware.
    return (req, res, next) => {
        // 1. Get the token from the request header
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer TOKEN"
        console.log(token);
        
        // 2. Check if a token exists
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied.' });
        }

        try {
            // 3. Verify the token's authenticity
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Attach the user's payload to the request object
            req.user = decoded.user; // Now req.user = { id: '...', role: '...' }

            // 5. Check the user's role (Authorization)
            // If the route requires specific roles and the user's role isn't one of them...
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                // ...deny access.
                return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
            }
            
            // 6. If all checks pass, proceed to the next function (the controller)
            next();

        } catch (err) {
            // Handle cases where the token is invalid or expired
            console.log(err)
            res.status(401).json({ message: 'Token is not valid.' });
        }
    };
};