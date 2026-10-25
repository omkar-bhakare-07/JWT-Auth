import { app } from './app.js';
import { PORT } from './config/env.config.js';
import {connectDB} from './config/db.config.js';

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log('Server started on', PORT);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();