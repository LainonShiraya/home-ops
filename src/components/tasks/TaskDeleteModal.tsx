import { useEffect, type MouseEvent } from "react";
import type { Task } from "../../types/task";

type TaskDeleteModalProps = {
  task: Task | null;
  onConfirm: () => void;
  onClose: () => void;
};

function TaskDeleteModal({ task, onConfirm, onClose }: TaskDeleteModalProps) {
  useEffect(() => {
    if (!task) {
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
  }, [task, onClose]);

  if (!task) {
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
      aria-labelledby="delete-task-title"
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
          w-full max-w-sm
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        <h2
          id="delete-task-title"
          className="text-lg font-semibold text-slate-900"
        >
          Usunąć zadanie?
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Czy na pewno chcesz usunąć{" "}
          <span className="font-medium text-slate-700">„{task.title}”</span>?
        </p>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 rounded-xl
              border border-slate-200
              px-4 py-3
              text-sm font-medium
              text-slate-600
              transition
              hover:bg-slate-50
            "
          >
            Anuluj
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1 rounded-xl
              bg-red-600
              px-4 py-3
              text-sm font-medium
              text-white
              transition
              hover:bg-red-700
            "
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDeleteModal;
