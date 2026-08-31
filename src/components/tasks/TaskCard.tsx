import { CalendarDays, CircleCheck, Circle } from "lucide-react";
import type { Task } from "../../types/task";

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const isCompleted = task.status === "completed";

  return (
    <article
      className="
        flex items-start gap-3
        rounded-2xl
        border border-slate-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <button
        type="button"
        aria-label={
          isCompleted
            ? `Oznacz "${task.title}" jako niewykonane`
            : `Oznacz "${task.title}" jako wykonane`
        }
        className="mt-0.5 shrink-0 text-slate-400 transition hover:text-blue-600"
      >
        {isCompleted ? (
          <CircleCheck className="text-blue-600" size={22} />
        ) : (
          <Circle size={22} />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h2
          className={`
            text-sm font-semibold
            ${isCompleted ? "text-slate-400 line-through" : "text-slate-900"}
          `}
        >
          {task.title}
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>{task.category}</span>

          <span>•</span>

          <span className="flex items-center gap-1">
            <CalendarDays size={13} />
            {task.dueDate}
          </span>
        </div>
      </div>

      <span
        className={`
          shrink-0 rounded-full px-2.5 py-1 text-xs font-medium
          ${
            task.priority === "high"
              ? "bg-red-50 text-red-600"
              : task.priority === "medium"
                ? "bg-amber-50 text-amber-600"
                : "bg-slate-100 text-slate-500"
          }
        `}
      >
        {task.priority === "high"
          ? "Wysoki"
          : task.priority === "medium"
            ? "Średni"
            : "Niski"}
      </span>
    </article>
  );
}

export default TaskCard;
