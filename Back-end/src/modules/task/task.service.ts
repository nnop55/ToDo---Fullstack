import { db } from "../../shared/database";

export const getAllTask = async () => {
    const [result] = await db.query(
        `SELECT * FROM tasks`);

    return result;
}

export const getTaskById = async (
    taskId: number
) => {
    const [result] = await db.query(
        `SELECT * FROM tasks 
            WHERE id = ?`,
        [taskId]);

    return (result as Array<any>)[0];
}

export const insertTask = async (
    title: string,
    description: string,
    status: number,
    userId: number
) => {
    const [result] = await db.query(
        `INSERT INTO tasks 
                (title, description, status, user_id) 
            VALUES (?, ?, ?, ?)`,
        [title, description, status, userId]);

    return result;
}

export const updateTask = async (
    title: string,
    description: string,
    status: number,
    taskId: number
) => {
    const [result] = await db.query(
        `UPDATE tasks SET title = ?, 
                description = ?, 
                status = ? 
        WHERE id = ?`,
        [title, description, status, taskId]);

    return (result as any).affectedRows > 0;
}

export const deleteTask = async (
    id: number
) => {
    const [result] = await db.query(
        `DELETE FROM tasks 
            WHERE id = ?`,
        [id]);
    console.log(result)
    return result;
}