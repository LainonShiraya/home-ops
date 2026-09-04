import { useState } from "react";
import { tasks as initialTasks } from "../data/tasks";
import type { TaskInput, Task } from "../types/task";
import { getTaskPoints, toggleTask } from "../utils/taskUtils";
import { useHouseholds } from "../context/HouseholdContext/useHouseholds";

export function useTasks() {
  const { activeHousehold,addPoints } = useHouseholds();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

const createTask = (input: TaskInput) => {
  if (!activeHousehold) {
    return;
  }

  const newTask: Task = {
    createdBy: 'user-1',
    id: Date.now().toString(),
    householdId: activeHousehold.id,
    ...input,
    status: "todo",
    pointsAwarded: 0
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
    prev.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      const updatedTask = toggleTask(task);

      if (
        task.status !== "completed" &&
        updatedTask.status === "completed"
      ) {
        addPoints(
          task.assigneeId,
          getTaskPoints(task.priority),
        );
      }

      return updatedTask;
    }),
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