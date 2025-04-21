import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        const msg = '❌ MongoDB connection error: '
        console.error(msg, error.message);
        throw new Error(`$❌ MongoDB connection error: ${error.message}`)
    }
};

export default connectDB;


