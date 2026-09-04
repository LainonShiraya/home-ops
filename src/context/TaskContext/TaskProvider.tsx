import { useState, type ReactNode } from "react";

import { tasks as initialTasks } from "../../data/tasks";
import type { Task, TaskInput } from "../../types/task";
import { getTaskPoints, toggleTask } from "../../utils/taskUtils";

import { useHouseholds } from "../HouseholdContext/useHouseholds";
import { TaskContext } from "./TaskContext";
import { useNotifications } from "../NotificationContext/useNotifications";

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
  const { activeHousehold, addPoints } = useHouseholds();
  const { addNotification } = useNotifications();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const currentUserId = "user-1";

  const createTask = (input: TaskInput) => {
    if (!activeHousehold) {
      return;
    }

    const newTask: Task = {
      createdBy: "user-1",
      id: Date.now().toString(),
      householdId: activeHousehold.id,
      pointsAwarded: 0,
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
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);

    if (!task || task.assigneeId !== currentUserId) {
      return;
    }

    const updatedTask = toggleTask(task);

    if (task.status !== "completed" && updatedTask.status === "completed") {
      const points = getTaskPoints(task.priority);

      addPoints(task.assigneeId, points);

      if (task.createdBy !== task.assigneeId) {
        addNotification({
          householdId: task.householdId,
          userId: task.createdBy,
          type: "task-completed",
          title: "Zadanie ukończone",
          message: `Ukończono „${task.title}”.`,
        });
      }

      setTasks((prev) =>
        prev.map((currentTask) =>
          currentTask.id === taskId
            ? {
                ...updatedTask,
                pointsAwarded: points,
                pointsAwardedTo: task.assigneeId,
              }
            : currentTask,
        ),
      );

      return;
    }

    if (task.status === "completed" && updatedTask.status !== "completed") {
      if (task.pointsAwarded > 0 && task.pointsAwardedTo) {
        addPoints(task.pointsAwardedTo, -task.pointsAwarded);
      }

      setTasks((prev) =>
        prev.map((currentTask) =>
          currentTask.id === taskId
            ? {
                ...updatedTask,
                pointsAwarded: 0,
                pointsAwardedTo: undefined,
              }
            : currentTask,
        ),
      );

      return;
    }

    setTasks((prev) =>
      prev.map((currentTask) =>
        currentTask.id === taskId ? updatedTask : currentTask,
      ),
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
