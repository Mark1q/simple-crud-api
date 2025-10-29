const jwt = require('jsonwebtoken')
const config = require('./../config.js')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.userId = decoded.userId; // attach user ID for controllers to use
        next();
    });
}

module.exports = { auth }