const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.role) { // role should be attached by auth
            return res.status(401).json({ error: "Not authenticated" });
        }

        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        next(); // role is allowed
    };
};

module.exports = { 
    authorize
}