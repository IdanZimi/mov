import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { Server } from 'socket.io';
import http from 'http';
import RoomManager from "./socket/roomManager.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();

        const server = http.createServer(app);
        const io = new Server(server, {
            cors: { origin: process.env.CLIENT_ORIGIN || '*' }
        });
        new RoomManager(io);

        server.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Server failed to start:', error.message);
        process.exit(1);
    }
}

startServer();