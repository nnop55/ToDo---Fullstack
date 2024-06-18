import { Request, Response } from 'express';
import { deleteTask, getAllTask, getTaskById, insertTask, updateTask } from './task.service';
import NotFoundError from '../../utils/errors/notFoundError';
import { Status } from '../../utils/enum';

class TaskController {
    public async getTasks(req: Request, res: Response) {
        const data = await getAllTask();
        res.status(200).json({ code: 1, data })
    }

    public async getTask(req: Request, res: Response) {
        const taskId = parseInt(req.params.taskId);
        const task = await getTaskById(taskId);

        if (!task) {
            throw new NotFoundError("Task with this ID not found")
        }
        res.status(200).json({ code: 1, data: task })
    }

    public async createTask(req: Request, res: Response) {
        const { title, description, status } = req.body;
        const { id } = (req as any).user;
        await insertTask(title, description, status, id)
        res.status(201).json({ code: 1, data: { title, description, status } })
    }

    public async editTask(req: Request, res: Response) {
        const taskId = parseInt(req.params.taskId);
        const { title, description, status } = req.body;
        const task = await getTaskById(taskId);

        if (!task) {
            throw new NotFoundError("Task with this ID not found")
        }

        const payload = {
            title: title ?? task.title,
            description: description ?? task.description,
            status: status ?? task.status,
            taskId: taskId ?? task.taskId,
        }

        await updateTask(
            payload.title,
            payload.description,
            payload.status,
            payload.taskId
        )

        res.status(202).json({ code: 1, data: payload })
    }

    public async removeTask(req: Request, res: Response) {
        const taskId = parseInt(req.params.taskId);
        const task = await deleteTask(taskId)
        if (!task) {
            throw new NotFoundError('Task not found')
        }
        res.status(200).json({ code: 1, data: { taskId } })
    }
}

export default new TaskController()