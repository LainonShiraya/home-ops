import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.db.orm.public.Task.all();
  }
  
create(createTaskDto: CreateTaskDto) {
  return this.prisma.db.orm.public.Task.create({
    ...createTaskDto,
    id: crypto.randomUUID(),
  });
}
update(id: string, updateTaskDto: CreateTaskDto) {
  return this.prisma.db.orm.public.Task
    .where({ id })
    .update(updateTaskDto);
}
remove(id: string) {
  return this.prisma.db.orm.public.Task
    .where({ id })
    .delete();
}
}