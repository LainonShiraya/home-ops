import type { Task } from "../types/task"

export function toggleTask(task: Task): Task {
  return {
    ...task,
    status:
      task.status === "completed"
        ? "todo"
        : "completed",
  }
}