import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './entity/dto/create-todo.dto';
import { UpdateTodoDTO } from './entity/dto/update-todo.dto';

@Controller('api/v1/todos')
export class TodoController {
  
  constructor(private readonly todoSerice: TodoService) {}

  @Get()
  async index() {
    return await this.todoSerice.findAll();
  }

  @Post()
  async create(@Body() body: CreateTodoDTO) {
    return await this.todoSerice.create(body);
  }
  
  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoSerice.findOneOrFail(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDTO) {
    return await this.todoSerice.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoSerice.deleteById(id);
  }

}
