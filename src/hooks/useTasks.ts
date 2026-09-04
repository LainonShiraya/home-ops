import { useState } from "react";
import { tasks as initialTasks } from "../data/tasks";
import type { TaskInput, Task } from "../types/task";
import { toggleTask } from "../utils/taskUtils";
import { useHouseholds } from "../context/HouseholdContext/useHouseholds";

export function useTasks() {
    const { activeHousehold } = useHouseholds();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

const createTask = (input: TaskInput) => {
  if (!activeHousehold) {
    return;
  }

  const newTask: Task = {
    id: Date.now().toString(),
    householdId: activeHousehold.id,
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