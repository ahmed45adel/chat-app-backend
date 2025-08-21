# Chat App

Node.js backend for a real-time chat application with authentication and WebSocket support

## Features
- REST API endpoints for user authentication/messaging
- WebSocket integration for real-time messaging
- MongoDB data storage
- JWT authentication
- Online users tracking
- Message persistence

## Tech Stack
-  Node.js & Express.js
-  MongoDB (with Mongoose ODM)
-  JSON Web Tokens (JWT) for authentication
-  Axios for TMDB API integration
-  Cookie-parser
-  Dotenv
-  Bcryptjs

**Core Dependencies:**
- Express.js - Web framework
- Mongoose - MongoDB
- JSON Web Tokens - Authentication
- Ably - Real-time communication
- Bcrypt - Password hashing
- Dotenv - Environment management

## Environment Variables

Create a `.env` file with following variables:
```env
ABLY_API_KEY
NODE_ENV
CLIENT_URL
JWT_SECRET
MONGO_DB_URI
PORT
```

## Acknowledgements
- [Ably Docs](https://ably.com/docs/chat/getting-started/react)
- [Avatar Placeholder](https://avatar-placeholder.iran.liara.run)
- [Frontend Code](https://github.com/ahmed45adel/chat-app-frontend)

## Deployment
- <a href="https://chat-app-frontend-three-theta.vercel.app" target="_blank">Deployed Project Here</a>
