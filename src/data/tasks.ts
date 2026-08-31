import type { Task } from "../types/task"

export const tasks: Task[] = [
  {
    id: "1",
    title: "Wynieś śmieci",
    category: "Dom",
    status: "todo",
    priority: "medium",
    assignee: "Konrad",
    dueDate: "Dzisiaj",
  },
  {
    id: "2",
    title: "Odkurzyć mieszkanie",
    category: "Sprzątanie",
    status: "in-progress",
    priority: "high",
    assignee: "Anna",
    dueDate: "Dzisiaj",
  },
  {
    id: "3",
    title: "Kupić mleko i chleb",
    category: "Zakupy",
    status: "completed",
    priority: "low",
    assignee: "Konrad",
    dueDate: "Dzisiaj",
  },
  {
    id: "4",
    title: "Podlać kwiaty",
    category: "Dom",
    status: "todo",
    priority: "low",
    assignee: "Anna",
    dueDate: "Jutro",
  },
]