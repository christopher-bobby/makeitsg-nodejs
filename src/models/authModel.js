const { pool } = require('../config/db');

exports.getUserById = async (req, res) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [req.email])
    res(result.rows);
};