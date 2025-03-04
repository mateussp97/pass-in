[Back](../README.md)

# Pass.in API

Pass.in is an application for **managing participants in face-to-face events**.

## Technologies

- **TypeScript** - Strongly typed programming language
- **Fastify** - Fast and low overhead web framework
- **Prisma** - Next-generation ORM for Node.js and TypeScript
- **JWT** - JSON Web Tokens for authentication
- **Zod** - TypeScript-first schema validation
- **SQLite** - Self-contained, serverless SQL database engine (for development)

## Features

- Event management (creation, viewing)
- Participant registration and check-in
- QR code-based attendance verification
- Role-based authorization (ADMIN and VIEWER roles)
- JWT-based authentication
- Protected routes

## Authentication System

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based authorization (ADMIN and VIEWER roles)
- Protected routes

### Authentication Routes

- `POST /users` - Create a new user
- `POST /login` - Authenticate and get JWT token
- `GET /users` - Get all users (admin only)

### Creating a User

```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "ADMIN" // or "VIEWER" (default is "VIEWER")
}
```

### Authentication

```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

### Accessing Protected Routes

Add the JWT token to the Authorization header:

```http
GET /users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...
```

## API Routes

- `POST /events` - Create a new event
- `GET /events` - List all events
- `GET /events/:eventId` - Get event details
- `POST /events/:eventId/attendees` - Register for an event
- `GET /events/:eventId/check-in` - Check-in to an event
- `GET /events/:eventId/attendees` - Get list of attendees for an event

## Business Rules

- Participants can only register for an event once
- Participants can only register for events with available spots
- Participants can only check-in to an event once
- Check-in is performed using a QR code

## API Documentation

API documentation is available via Swagger at: http://localhost:3333/docs

## Database

This application uses a relational database (SQL). For development, we use SQLite for ease of setup.

### Environment Variables

- `JWT_SECRET` - Secret key for JWT signing (set in .env file)
- Other environment variables can be found in the `.env.example` file

## Getting Started

### Node Version

Required Node version: v20.12.1

### Installation

```bash
npm install
```

### Database Setup

```bash
npx prisma migrate dev
npx prisma db seed
```

### Start Development Server

```bash
npm run dev
```

### Start Prisma Studio

```bash
npx prisma studio
```

## Access

- Admin: `admin@admin.com` / `12345678`
- User: `user@user.com` / `12345678`
