const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Authenticated user:', req.user);
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({
            status: false,
            error: "Unauthorized"
        });
    }
}

const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user && req.user.role_id === requiredRole) {
            next();
        } else {
            res.status(403).json({
                status: false,
                error: "Forbidden"
            });
        }
    }
}

module.exports = {
    authenticateToken,
    isAdmin: authorizeRole(1)
}