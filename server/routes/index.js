import express from 'express';
import v1Router from "./v1/index.js";


const router = express.Router();

router.use('/v1', v1Router)

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Server is healthy 🚀',
        timestamp: new Date(),
    });
});

export default router;