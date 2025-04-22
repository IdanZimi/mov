import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { Server } from 'socket.io';
import { startRoomManager } from "./socket/roomManager.js";
import { environementConfig } from './config/env.js';
dotenv.config();

async function startServer() {
    try {
        await connectDB();

        const server = app.listen(environementConfig.PORT, () => {
            console.log(`✅ Server running on port ${environementConfig.PORT}`);
        });

        const io = new Server(server, {
            cors: { origin: environementConfig.CLIENT_ORIGIN }
        });

        startRoomManager(io);

        

    } catch (error) {
        console.error('❌ Server failed to start:', error.message);
        process.exit(1);
    }
}

startServer();