const request = require('supertest');
const express = require('express');
const authController = require('../authController');
const Auth = require('../../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.post('/login', authController.login);

jest.mock('../../models/authModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return 401 if user not found', async () => {
      Auth.getUserById.mockImplementation((_, cb) => cb([]));
      const res = await request(app).post('/login').send({ email: 'test@example.com', password: 'password' });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Authentication failed');
    });

    it('should return 401 if password does not match', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword', role: 'user' };
      Auth.getUserById.mockImplementation((_, cb) => cb([mockUser]));
      bcrypt.compare.mockImplementation((_, __, cb) => cb(null, false));

      const res = await request(app).post('/login').send({ email: 'test@example.com', password: 'wrongpassword' });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Authentication failed');
    });

    it('should return 200 and a token if authentication is successful', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword', role: 'user' };
      const mockToken = 'mocktoken';

      Auth.getUserById.mockImplementation((_, cb) => cb([mockUser]));
      bcrypt.compare.mockImplementation((_, __, cb) => cb(null, true));
      jwt.sign.mockImplementation(() => mockToken);

      const res = await request(app).post('/login').send({ email: 'test@example.com', password: 'password' });
      expect(res.status).toBe(200);
      expect(res.body.token).toBe(mockToken);
      expect(res.body.role).toBe(mockUser.role);
    });
  });
});
