const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

test('GET /health returns healthy status', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok' });
});

test('POST /api/users creates a user', async () => {
  const payload = { name: 'Charlie', email: 'charlie@example.com' };
  const response = await request(app).post('/api/users').send(payload);

  assert.equal(response.status, 201);
  assert.equal(response.body.name, payload.name);
  assert.equal(response.body.email, payload.email);
  assert.ok(response.body.id);
});

test('GET /api/users/:id returns 404 when user is missing', async () => {
  const response = await request(app).get('/api/users/9999');

  assert.equal(response.status, 404);
  assert.equal(response.body.message, 'User not found');
});
