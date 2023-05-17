import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task: string;

  @Column({ name: 'is_done', type: 'tinyint', width: 1 })
  isDone: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @CreateDateColumn({ name: 'updated_at' })
  updateAt: string;

  @CreateDateColumn({ name: 'deleted_at' })
  deleteAt: string;
}
