import { priorityWeight, type Task } from "../types/task"

export function toggleTask(task: Task): Task {
  return {
    ...task,
    status:
      task.status === "completed"
        ? "todo"
        : "completed",
  }
}
export function sortTasksByPriority(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    // Completed tasks always go to the end
    if (a.status === "completed" && b.status !== "completed") {
      return 1;
    }

    if (a.status !== "completed" && b.status === "completed") {
      return -1;
    }

    // Then sort by priority
    return priorityWeight[a.priority] - priorityWeight[b.priority];
  });
}