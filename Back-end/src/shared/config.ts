import { config } from 'dotenv'
import * as path from 'path';

function initializeConfig() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    const parentDir = path.resolve(__dirname, '..', '..');
    const envFile = path.resolve(parentDir, process.env.NODE_ENV === 'production' ? '.env' : 'dev.env');
    config({ path: envFile });
}

initializeConfig();

export const dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

export const accessUrl = process.env.ACCESS_WEB
export const JWTSecretKey = process.env.JWT_SECRET_KEY
export const JWTRefreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY
export const redisUrl = process.env.REDIS_URL