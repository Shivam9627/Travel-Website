# Travel Website Server Documentation

## Overview

The Travel Website server is built using Node.js and Express, providing a robust backend for managing travel-related data, including user authentication, destinations, and bookings. This server communicates with the client-side application to deliver a seamless travel planning experience.

## Features

- **User Authentication**: Secure user registration, login, and profile management.
- **Destination Management**: CRUD operations for travel destinations.
- **Booking System**: Create, retrieve, and manage bookings for users.
- **Error Handling**: Middleware for centralized error handling.
- **Environment Configuration**: Easy configuration using environment variables.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the server directory:
   ```
   cd Travel-Website/server
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Server

To start the server, run the following command:
```
npm start
```

The server will start on the default port (usually 3000). You can change the port by modifying the `server.js` file.

### API Endpoints

- **Authentication**
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.
  - `GET /api/auth/profile`: Retrieve user profile information.

- **Destinations**
  - `GET /api/destinations`: Fetch all destinations.
  - `POST /api/destinations`: Add a new destination.
  - `GET /api/destinations/:id`: Get details of a specific destination.
  - `PUT /api/destinations/:id`: Update a destination.
  - `DELETE /api/destinations/:id`: Delete a destination.

- **Bookings**
  - `POST /api/bookings`: Create a new booking.
  - `GET /api/bookings/:userId`: Retrieve bookings for a specific user.

## Middleware

- **Authentication Middleware**: Protects routes that require user authentication.
- **Error Handling Middleware**: Catches and handles errors throughout the application.

## Environment Variables

Create a `.env` file in the server directory and add the following variables:

```
PORT=3000
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.