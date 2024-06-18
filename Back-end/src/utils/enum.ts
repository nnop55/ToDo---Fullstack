import { LoginUserDto } from "../modules/auth/dtos/loginUser.dto";
import { RegisterUserDto } from "../modules/auth/dtos/registerUser.dto";
import { AddTaskDto } from "../modules/task/dtos/addTask.dto";

export type DtoTypes =
    typeof LoginUserDto |
    typeof RegisterUserDto |
    typeof AddTaskDto

export enum Status {
    Todo,
    InProgress,
    Completed,
    Canceled
}
