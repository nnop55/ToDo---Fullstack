import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from '../../../utils/enum';

export class AddTaskDto {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsEnum(Status)
    status!: number;
}