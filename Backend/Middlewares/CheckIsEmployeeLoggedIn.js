const jwt = require('jsonwebtoken');

const isEmployeeLoggedIn = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'You must be logged in' });
    }

    const token = authHeader.split(' ')[1]; // Extract token

    jwt.verify(token, 'umar123', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.employee = decoded.employee; // Attach employee details to request
        next(); // Continue to the next middleware or route handler
    });
};

module.exports = isEmployeeLoggedIn;
