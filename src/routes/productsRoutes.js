const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const {authenticateToken, authorizeRoles} = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, authorizeRoles('view', 'edit'), productsController.getAllProducts);
router.get('/:id', authenticateToken, authorizeRoles('view', 'edit'), productsController.getProductById);
router.post('/:id', authenticateToken, authorizeRoles('edit'), productsController.editProductById);
router.put('/', authenticateToken, authorizeRoles('edit'), productsController.addProduct);

module.exports = router;