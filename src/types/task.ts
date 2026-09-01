export type TaskStatus = "todo" | "in-progress" | "completed"

export type TaskPriority = "low" | "medium" | "high"

export type TaskRepetition =
  | "none"
  | "daily"
  | "weekly"
  | "monthly";

export const priorityWeight: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}
export type Task = {
  id: string
  title: string
  category: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  dueDate: string
  repetition: TaskRepetition;
}

export type CreateTaskInput = {
  title: string
  category: string
  priority: TaskPriority
  dueDate: string
  repetition: TaskRepetition
  assigneeId: string
}

