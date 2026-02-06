const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

test('GET /health returns status and db state', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
  assert.ok(['connected', 'disconnected'].includes(response.body.database));
});

test('POST /api/users creates a user through mongoose model', async () => {
  const originalCreate = User.create;
  User.create = async ({ name, email }) => ({
    _id: new mongoose.Types.ObjectId().toString(),
    name,
    email
  });

  const payload = { name: 'Charlie', email: 'charlie@example.com' };
  const response = await request(app).post('/api/users').send(payload);

  assert.equal(response.status, 201);
  assert.equal(response.body.name, payload.name);
  assert.equal(response.body.email, payload.email);

  User.create = originalCreate;
});

test('GET /api/users/:id returns 404 when user is missing', async () => {
  const originalFindById = User.findById;
  User.findById = async () => null;

  const response = await request(app).get('/api/users/507f1f77bcf86cd799439011');

  assert.equal(response.status, 404);
  assert.equal(response.body.message, 'User not found');

  User.findById = originalFindById;
});
