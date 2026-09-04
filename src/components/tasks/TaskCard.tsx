import { CalendarDays, CircleCheck, Circle } from "lucide-react";
import type { Task } from "../../types/task";
import { formatDate } from "../../utils/date";
import { repetitionLabels } from "../../utils/taskUtils";
import { useHouseholds } from "../../context/HouseholdContext/useHouseholds";

type TaskCardProps = {
  task: Task;
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const isCompleted = task.status === "completed";
  const formattedDueDate = formatDate(task.dueDate);
  const { members } = useHouseholds();
  const assignee = members.find((member) => member.id === task.assigneeId);
  const currentUserId = "user-1";
  const canComplete = task.assigneeId === currentUserId;

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
        disabled={!canComplete}
        onClick={() => onToggle(task.id)}
        aria-label={
          isCompleted
            ? `Oznacz "${task.title}" jako niewykonane`
            : `Oznacz "${task.title}" jako wykonane`
        }
        title={
          canComplete
            ? isCompleted
              ? "Oznacz jako niewykonane"
              : "Oznacz jako wykonane"
            : `Tylko ${assignee?.name ?? "przypisana osoba"} może ukończyć to zadanie`
        }
        className={`
    mt-0.5 shrink-0 transition
    ${
      canComplete
        ? "cursor-pointer text-slate-400 hover:text-blue-600"
        : "cursor-not-allowed text-slate-300 opacity-60"
    }
  `}
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
            {formattedDueDate}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>🔁 {repetitionLabels[task.repetition]}</span>
        </div>
      </div>

      <div className="ml-4 flex shrink-0 flex-col items-end gap-1">
        <span
          className={`
          shrink-0 rounded-full px-2.5 py-1 text-xs font-medium px-4 py-1 
          flex-1 min-w-[60px]
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
        <p className="text-sm text-slate-500 flex-1 min-w-[70px]">
          👤 {assignee?.name ?? "Nieprzypisane"}
        </p>
        <div className="flex flex-col gap-1 min-[500px]:flex-row">
          <button
            className="text-sm text-slate-500 rounded-full bg-blue-600 text-white
    shadow-lg transition
    hover:bg-blue-700
    active:scale-95 px-4 py-1
    flex-1 min-w-[60px]"
            type="button"
            onClick={() => onEdit(task)}
          >
            Edytuj
          </button>
          <button
            className="text-sm text-slate-500 rounded-full bg-red-600 text-white
    shadow-lg transition
    hover:bg-red-700
    active:scale-95 px-4 py-1
    flex-1 min-w-[60px]"
            type="button"
            onClick={() => onDelete(task)}
          >
            Usuń
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
