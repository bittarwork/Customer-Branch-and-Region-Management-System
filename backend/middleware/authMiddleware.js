const jwt = require('jsonwebtoken');

// Middleware to protect routes by checking the JWT token
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the `Authorization` header is present and starts with 'Bearer '
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // If the token is valid, attach the decoded user data to `req.user` for use in other routes
            req.user = decoded;
            next();
        } catch (err) {
            // If the token is invalid, respond with a 401 status
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // If no token is found, respond with a 401 status
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to authorize access based on user roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            // If the user is not authenticated, respond with a 401 status
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            // If the user's role is not authorized, respond with a 403 status
            return res.status(403).json({ message: 'User role not authorized' });
        }

        next();
    };
};

module.exports = {
    protect,
    authorize,
};
