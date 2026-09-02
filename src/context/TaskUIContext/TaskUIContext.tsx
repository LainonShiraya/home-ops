import { createContext } from "react";

export type TaskUIContextValue = {
  isTaskModalOpen: boolean;
  openTaskModal: () => void;
  closeTaskModal: () => void;
};

export const TaskUIContext = createContext<TaskUIContextValue | null>(null);
