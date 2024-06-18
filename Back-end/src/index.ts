import express, { Express } from 'express'
import cors from 'cors';

import { db } from './shared/database';

import { errorHandler } from './middlewares/error.middleware';
import { restrictAccess } from './middlewares/access.middleware';

import { authRouter } from './modules/auth/auth.router';
import { taskRouter } from './modules/task/task.router';
import NotFoundError from './utils/errors/notFoundError';

const app: Express = express();

setupMiddleware();
setupRoutes();
setupErrorHandling();

const PORT = process.env.PORT || 3000;
startServer(PORT)

function setupMiddleware() {
    app.use(restrictAccess)
    app.use(cors());
    app.options('*', cors({
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json());
}

function setupRoutes() {
    app.use('/api/auth', authRouter);
    app.use('/api/task', taskRouter);
}

function setupErrorHandling() {
    app.all("*", (req, res) => {
        throw new NotFoundError()
    });

    app.use(errorHandler);
}

async function startServer(port: number | string) {
    try {
        await db.getConnection();

        console.log("Connected to database")

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error on database connection", error)
    }
}

