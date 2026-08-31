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
  return [...tasks].sort(
    (a, b) =>
      priorityWeight[a.priority] -
      priorityWeight[b.priority],
  )
}