import { Router } from "express";
import { wrapAsync } from "../../middlewares/controllerWrapper.middleware";
import { inputValidationMiddleware } from "../../middlewares/inputValidation.middleware";
import TaskController from "./task.controller";
import { verifyToken } from "../../middlewares/token.middleware";
import { AddTaskDto } from "./dtos/addTask.dto";

export const taskRouter: Router = Router();

taskRouter.use(verifyToken)

taskRouter.get('/',
    wrapAsync(TaskController.getTasks)
);

taskRouter.get('/:taskId',
    wrapAsync(TaskController.getTask)
);

taskRouter.post('/add',
    inputValidationMiddleware(AddTaskDto),
    wrapAsync(TaskController.createTask)
);

taskRouter.put('/edit/:taskId',
    wrapAsync(TaskController.editTask)
);

taskRouter.delete('/delete/:taskId',
    wrapAsync(TaskController.removeTask)
);