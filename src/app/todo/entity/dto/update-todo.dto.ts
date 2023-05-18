import { IsNotEmpty } from "class-validator";

export class UpdateTodoDTO{

    @IsNotEmpty()
    task: string;
    
    @IsNotEmpty()
    isDone: number;

}