import { useEffect, type MouseEvent } from "react";
import { X } from "lucide-react";

import TaskForm from "./TaskForm";
import type { TaskInput, Task } from "../../types/task";

type TaskModalProps = {
  isOpen: boolean;
  onSubmit: (input: TaskInput) => void;
  onClose: () => void;
  initialValues?: Task;
};

function TaskModal({
  isOpen,
  onSubmit,
  onClose,
  initialValues,
}: TaskModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-task-title"
      onMouseDown={handleOverlayClick}
      className="
  fixed inset-0 z-50
  flex items-center justify-center
  bg-slate-900/40
  p-4
  backdrop-blur-sm
"
    >
      <div
        className="
          w-full
          rounded-t-3xl
          bg-white
          p-6
          shadow-2xl

          sm:max-w-lg
          sm:rounded-3xl
        "
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="create-task-title"
            className="text-xl font-semibold text-slate-900"
          >
            Nowe zadanie
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="
              flex size-9 items-center justify-center
              rounded-full
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={20} />
          </button>
        </div>

        <TaskForm
          onSubmit={onSubmit}
          onCancel={onClose}
          mode={initialValues ? "edit" : "create"}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
}

export default TaskModal;
