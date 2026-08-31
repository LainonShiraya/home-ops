import { useState, type ReactNode } from "react";
import { TaskUIContext } from "./TaskUIContext";

type TaskUIProviderProps = {
  children: ReactNode;
};

export function TaskUIProvider({ children }: TaskUIProviderProps) {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const openCreateTask = () => {
    setIsCreateTaskOpen(true);
  };

  const closeCreateTask = () => {
    setIsCreateTaskOpen(false);
  };

  return (
    <TaskUIContext.Provider
      value={{
        isCreateTaskOpen,
        openCreateTask,
        closeCreateTask,
      }}
    >
      {children}
    </TaskUIContext.Provider>
  );
}
