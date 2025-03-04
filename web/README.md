[Back](../README.md)

# Pass.in Web Application

Pass.in is an application for **managing participants in face-to-face events**.

## Features

- User authentication and authorization
- Event management dashboard
- Registration for events
- Ticket generation with QR code
- Check-in functionality

## Technologies

- **React** - JavaScript library for building user interfaces
- **TypeScript** - Strongly typed programming language
- **Vite** - Build tool for modern web development
- **TailwindCSS** - Utility-first CSS framework
- **Headless UI** - Library of pre-styled components
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Library for managing forms
- **JWT authentication** - JSON Web Tokens for secure authentication

## Pages

- `/` - Login page
- `/dashboard` - Dashboard (authenticated users only)
- `/register/:eventId` - Event registration
- `/ticket/:ticketId` - View ticket with QR code
- `/get-ticket/:ticketHash` - Generate ticket from hash

## Authentication

The application uses JWT tokens for authentication. Tokens are stored in local storage and automatically included in API requests.

### Login

```http
POST /login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Protected Routes

The application includes a `<ProtectedRoute>` component that redirects unauthenticated users to the login page.

## Components

- `<Modal>` - Reusable modal component
- `<CreateEventModal>` - Modal for creating new events
- `<AttendeeList>` - Display and manage event attendees
- `<StyledInput>` - Styled form input
- `<StyledTextarea>` - Styled form textarea
- `<Header>` - Application header with navigation

## State Management

- Uses React hooks and context for state management
- Modal state is managed via the `useModalStore` atom

## Getting Started

### Node Version

Required Node version: v20.12.1

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:5173

### Build for Production

```bash
npm run build
```

## Access Credentials

- Admin: `admin@admin.com` / `12345678`
- User: `user@user.com` / `12345678`
