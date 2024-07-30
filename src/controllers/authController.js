const Auth = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    login: (req, res) => {
        const { email, password } = req.body;
        Auth.getUserById({email}, (result)=> {
            if (result.length === 0) return res.status(401).json({ message: 'Authentication failed' });
            const user = result[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) return res.status(401).json({ message: 'Authentication failed' });

                const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
                res.status(200).json({ token, role: user.role });
            });
        });
    }
};

module.exports = authController;
