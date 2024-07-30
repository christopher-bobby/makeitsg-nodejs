const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        req.user = user;
        next();
    });
};

// Middleware to authorize based on roles
function authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.sendStatus(403).json({ message: 'Forbidden' });
      }
      next();
    };
  }

module.exports = { authenticateToken, authorizeRoles };
