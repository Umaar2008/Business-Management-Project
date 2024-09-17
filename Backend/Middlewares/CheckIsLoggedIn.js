const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('You must be logged in');
    }

    const token = authHeader.split(' ')[1]; // Extract token

    jwt.verify(token, 'umar123', (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        req.admin = decoded.admin; // Attach admin details to request
        next(); // Continue to the next middleware or route handler
    });
};

module.exports = isLoggedIn;
