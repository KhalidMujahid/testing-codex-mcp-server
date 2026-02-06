# Express REST API

A simple REST API built with Express.js.

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

The server runs on `http://localhost:3000` by default.

## Endpoints

- `GET /health` - health check
- `GET /api/users` - list users
- `GET /api/users/:id` - get user by ID
- `POST /api/users` - create user (`name`, `email`)
- `PUT /api/users/:id` - replace user (`name`, `email`)
- `DELETE /api/users/:id` - delete user

## Test

```bash
npm test
```
