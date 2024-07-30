const { pool } = require('../config/db');

exports.getAll = async (res) => {
  const result = await pool.query('SELECT * FROM products')
  res(result.rows);
};

exports.getProductById = async (req, res) => {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id])
  res(result.rows[0]);
};

exports.addProduct = async (req, res) => {
  const { name, price, description, quantity, image } = req.body;
  const result = await pool.query(
    'INSERT INTO products (name, price, description, quantity, image) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
    [name, price, description, quantity, image]
  );
  res(result.rows[0]);
};

exports.editProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, description, quantity, image } = req.body;
  const result = await pool.query(
    'UPDATE products SET name = $1, price = $2, description = $3, quantity = $4, image = $5 WHERE id = $6 RETURNING *',
    [name, price, description, quantity, image, id]
  );
  res(result.rows[0]);
};
