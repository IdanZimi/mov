import dotenv from 'dotenv';

dotenv.config();

export const environementConfig = {
    PORT: process.env.PORT || 5000,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
    MONGO_URI: process.env.MONGO_URI,
}


