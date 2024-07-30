const request = require('supertest');
const express = require('express');
const productsController = require('../productsController');
const Products = require('../../models/productsModel');

const app = express();
app.use(express.json());

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);
app.post('/products', productsController.addProduct);
app.put('/products/:id', productsController.editProductById);

jest.mock('../../models/productsModel');

describe('Products Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return 404 if no products found', async () => {
      Products.getAll.mockImplementation((cb) => cb([]));
      const res = await request(app).get('/products');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Products not found');
    });

    it('should return 200 and products if found', async () => {
      const mockProducts = [{ id: 1, name: 'Test Product' }];
      Products.getAll.mockImplementation((cb) => cb(mockProducts));
      const res = await request(app).get('/products');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Products loaded');
      expect(res.body.product.result).toEqual(mockProducts);
    });
  });

  describe('getProductById', () => {
    it('should return 404 if product not found', async () => {
      Products.getProductById.mockImplementation((req, cb) => cb([]));
      const res = await request(app).get('/products/1');
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Products not found');
    });

    it('should return 200 and product if found', async () => {
      const mockProduct = { id: 1, name: 'Test Product' };
      Products.getProductById.mockImplementation((req, cb) => cb([mockProduct]));
      const res = await request(app).get('/products/1');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Products loaded');
      expect(res.body.product.result).toEqual([mockProduct]);
    });
  });

  describe('addProduct', () => {
    it('should return 404 if product not created', async () => {
      Products.addProduct.mockImplementation((req, cb) => cb([]));
      const res = await request(app).post('/products').send({ name: 'New Product' });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Products not found');
    });

    it('should return 201 and product if created', async () => {
      const mockProduct = { id: 1, name: 'New Product' };
      Products.addProduct.mockImplementation((req, cb) => cb([mockProduct]));
      const res = await request(app).post('/products').send({ name: 'New Product' });
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Products created');
      expect(res.body.product.result).toEqual([mockProduct]);
    });
  });

  describe('editProductById', () => {
    it('should return 404 if product not edited', async () => {
      Products.editProduct.mockImplementation((req, cb) => cb([]));
      const res = await request(app).put('/products/1').send({ name: 'Edited Product' });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Products not found, Edit failed');
    });

    it('should return 202 and product if edited', async () => {
      const mockProduct = { id: 1, name: 'Edited Product' };
      Products.editProduct.mockImplementation((req, cb) => cb([mockProduct]));
      const res = await request(app).put('/products/1').send({ name: 'Edited Product' });
      expect(res.status).toBe(202);
      expect(res.body.message).toBe('Products created');
      expect(res.body.product.result).toEqual([mockProduct]);
    });
  });
});
