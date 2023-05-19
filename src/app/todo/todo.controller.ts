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
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './entity/dto/create-todo.dto';
import { UpdateTodoDTO } from './entity/dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import IndexTodoSwagger from './swagger/index-todo.swagger';
import ShowTodoSwagger from './swagger/show-todo.swagger';
import UpdateTodoSwagger from './swagger/update-todo.swagger';
import BadrequestSwagger from 'src/helpers/swagger/bad-request.swagger';
import NotfoundSwagger from 'src/helpers/swagger/not-found.swagger';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  
  constructor(private readonly todoSerice: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas'})
  @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso', type: IndexTodoSwagger, isArray: true })
  async index() {
    return await this.todoSerice.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova tarefa'})
  @ApiResponse({ status: 201, description: 'Nova tarefa criada com sucesso', type: IndexTodoSwagger})
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos', type: BadrequestSwagger})
  async create(@Body() body: CreateTodoDTO) {
    return await this.todoSerice.create(body);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de uma tarefa'})
  @ApiResponse({ status: 200, description: 'Dados de uma tarefa retornado com sucesso', type: ShowTodoSwagger})
  @ApiResponse({ status: 404, description: 'Task não foi encontrada', type: NotfoundSwagger})
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoSerice.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma tarefa'})
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso', type: UpdateTodoSwagger})
  @ApiResponse({ status: 400, description: 'Dados inválidos', type: BadrequestSwagger})
  @ApiResponse({ status: 404, description: 'Task não foi encontrada', type: NotfoundSwagger})
  async update(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() body: UpdateTodoDTO
    ) {
    return await this.todoSerice.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma tarefa'})
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Tarefa removida com sucesso'})
  @ApiResponse({ status: 404, description: 'Task não foi encontrada', type: NotfoundSwagger})
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoSerice.deleteById(id);
  }

}
