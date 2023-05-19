import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDTO } from './entity/dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      const options: FindOneOptions = {
        where: { id },
      };
      return await this.todoRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data) {
    return await this.todoRepository.save(this.todoRepository.create(data));
  }

  async update(id: string, data: UpdateTodoDTO) {
    const todo = await this.findOneOrFail(id);
    this.todoRepository.merge(todo, data);
    return await this.todoRepository.save(todo);
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.todoRepository.softDelete(id);
  }
}
