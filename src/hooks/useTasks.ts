import { useState } from "react";
import { tasks as initialTasks } from "../data/tasks";
import type { TaskInput, Task } from "../types/task";
import { toggleTask } from "../utils/taskUtils";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const createTask = (input: TaskInput) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...input,
      status: "todo",
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (taskId: string, input: TaskInput) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...input,
            }
          : task,
      ),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId),
    );
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? toggleTask(task) : task,
      ),
    );
  };

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };
}