import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class UpdateTodoDTO{

    @IsNotEmpty()
    @ApiProperty()
    task: string;
  
    @IsNotEmpty()
    @IsIn([0, 1])
    @ApiProperty()
    isDone: number;

}