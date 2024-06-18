import { db } from "../../shared/database"

export const insertUser = async (
    email: string,
    nickname: string,
    hashedPassword: string
) => {
    const [result] = await db.query(
        `INSERT INTO users 
            (email, nickname, password) 
        VALUES (?, ?, ?)`,
        [email, nickname, hashedPassword]);

    return result;
}

export const updateUserToken = async (
    email: string,
    accessToken:string | null
) => {
    const [result] = await db.query(
        `UPDATE users 
            SET access_token = ?
        WHERE email = ?`,
        [accessToken, email]);

        return (result as any).affectedRows > 0;
}

export const getUserByColumn = async (
    column: string,
    value:string
) => {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE ${column} = ?`,
        [value]);

    return (rows as Array<any>)[0];
}