import { createContext } from "react";

import type { Task, TaskInput } from "../../types/task";

export type TaskContextValue = {
  tasks: Task[];

  createTask: (input: TaskInput) => void;
  updateTask: (taskId: string, input: TaskInput) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
};

export const TaskContext =
  createContext<TaskContextValue | undefined>(undefined);