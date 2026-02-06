const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.status(200).json({ status: 'ok', database: isConnected ? 'connected' : 'disconnected' });
});

app.get('/api/users', async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json(users);
});

app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }

  const user = await User.create({ name, email });
  return res.status(201).json(user);
});

app.put('/api/users/:id', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required' });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
});

app.delete('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(204).send();
});

app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: error.message });
  }

  if (error && error.code === 11000) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  return next(error);
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: 'Internal server error' });
  next();
});

module.exports = app;
