export type TaskStatus = "todo" | "in-progress" | "completed"

export type TaskPriority = "low" | "medium" | "high"

export type Task = {
  id: string
  title: string
  category: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  dueDate: string
}