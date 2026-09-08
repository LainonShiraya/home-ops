import { Body, Controller, Get, Post, Patch, Param,Delete } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(":id")
update(
  @Param("id") id: string,
  @Body() updateTaskDto: CreateTaskDto,
) {
  return this.tasksService.update(id, updateTaskDto);
}
@Delete(":id")
remove(@Param("id") id: string) {
  return this.tasksService.remove(id);
}
}