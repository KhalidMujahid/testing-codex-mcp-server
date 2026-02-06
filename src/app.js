const express = require('express');

const app = express();
app.use(express.json());

let nextId = 3;
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }

  const user = { id: nextId++, name, email };
  users.push(user);
  return res.status(201).json(user);
});

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex((item) => item.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }

  const updatedUser = { id, name, email };
  users[userIndex] = updatedUser;

  return res.status(200).json(updatedUser);
});

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((item) => item.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  return res.status(204).send();
});

module.exports = app;
