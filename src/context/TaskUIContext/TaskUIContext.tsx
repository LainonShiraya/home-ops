import { createContext } from "react";

export type TaskUIContextValue = {
  isCreateTaskOpen: boolean;
  openCreateTask: () => void;
  closeCreateTask: () => void;
};

export const TaskUIContext = createContext<TaskUIContextValue | null>(null);
