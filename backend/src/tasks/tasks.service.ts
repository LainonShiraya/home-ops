import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll() {
    return [
      {
        id: '1',
        title: 'Umyć łazienkę',
        status: 'todo',
      },
      {
        id: '2',
        title: 'Wynieść kartony',
        status: 'completed',
      },
    ];
  }
}