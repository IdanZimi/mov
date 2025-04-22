# Deployed App - Production

> #### Link to [App](https://mov-black.vercel.app/)

> **Note:** This server is running on Render.com’s free tier, so it spins down when idle. As a result, the very first request after a period of inactivity can take up to **50 seconds** to respond.

- Client deployed with [Vercel](https://vercel.com/)
- Server deployed with [Render](https://render.com/)

# Local Setup Guide

## Prerequisites
- Node.js (> 18)
- MongoDB (local or Atlas connection)
- Git

## Clone the Repository
```bash
git clone https://github.com/IdanZimi/mov.git
cd moveo
```

## Server Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following content:


   - MONGO_URI=<your-mongodb-connection-string> Atlas (cloud) or local
   - PORT=5000

4. Populate the database with initial code blocks:
```bash
npm run populateDB
```

5. Start the server in development mode:
```bash
npm run dev
```
The server should now be running on http://localhost:5000

## Client Setup
1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.development` file in the client directory with:
- VITE_API_URL=http://localhost:5000
- VITE_API_VERSION=v1

4. Start the development server:
```bash
npm run dev
```
The client should now be running on http://localhost:5173

## Testing the Application (manually)
1. Open your browser and navigate to http://localhost:5173
2. You should see the lobby with available code blocks
3. Click on a code block to enter the coding session
4. Open another browser window to test the real-time collaboration features

## Available Scripts

Server:
- `npm run dev`: Start server with hot reload
- `npm start`: Start server in production mode
- `npm run populateDB`: Populate database with initial code blocks

Client:
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build