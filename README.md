# Express REST API (Mongoose) + React Frontend

A full-stack app with an Express.js REST API, MongoDB via Mongoose ORM, and a React.js frontend that consumes the API.

## Setup

```bash
npm install
```

## Environment

Set `MONGO_URI` (optional). If omitted, it defaults to:

`mongodb://127.0.0.1:27017/express_api`

## Run

```bash
npm start
```

The server runs on `http://localhost:3000` by default.

## Frontend

Open `http://localhost:3000` to use the React UI.

The React app allows you to:
- View users
- Create users
- Delete users

## API Endpoints

- `GET /health` - health check with DB connection status
- `GET /api/users` - list users
- `GET /api/users/:id` - get user by ID
- `POST /api/users` - create user (`name`, `email`)
- `PUT /api/users/:id` - replace user (`name`, `email`)
- `DELETE /api/users/:id` - delete user

## Notes

- Users are persisted in MongoDB.
- `email` is unique.
- Invalid MongoDB IDs return `400`.
