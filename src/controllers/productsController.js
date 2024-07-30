const Products = require('../models/productsModel');

const productsController = {
    getAllProducts: (req, res) => {
        Products.getAll((result)=> {
            if (result.length === 0) return res.status(404).json({ message: 'Products not found' });
            return res.status(200).json({ message: 'Products loaded', product : {result} });
        });
    },
    getProductById: (req, res) => {
        Products.getProductById(req, (result)=> {
            if (result.length === 0) return res.status(404).json({ message: 'Products not found' });
            return res.status(200).json({ message: 'Products loaded', product : {result} });
        });
    },
    addProduct: (req, res) => {
        Products.addProduct(req, (result)=> {
            if (result.length === 0) return res.status(404).json({ message: 'Products not found' });
            return res.status(201).json({ message: 'Products created', product : {result} });
        });
    },
    editProductById: (req, res) => {
        Products.editProduct(req, (result)=> {
            if (result.length === 0) return res.status(404).json({ message: 'Products not found, Edit failed' });
            return res.status(202).json({ message: 'Products created', product : {result} });
        });
    }
};

module.exports = productsController;
