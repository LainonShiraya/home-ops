import { useState, type ReactNode } from "react";
import { TaskUIContext } from "./TaskUIContext";

type TaskUIProviderProps = {
  children: ReactNode;
};

export function TaskUIProvider({ children }: TaskUIProviderProps) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  return (
    <TaskUIContext.Provider
      value={{
        isTaskModalOpen,
        openTaskModal,
        closeTaskModal,
      }}
    >
      {children}
    </TaskUIContext.Provider>
  );
}
