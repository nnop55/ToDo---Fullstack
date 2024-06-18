import mysql from 'mysql2';
import { dbParams } from './config';

export const pool: mysql.Pool =
    mysql.createPool(dbParams as mysql.PoolOptions);


export const db = pool.promise();