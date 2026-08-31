import { useState } from "react";
import type { CreateTaskInput, TaskPriority } from "../../types/task";

type TaskFormProps = {
  onSubmit: (input: CreateTaskInput) => void;
  onCancel: () => void;
};

function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Dom");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !dueDate) {
      return;
    }

    onSubmit({
      title: title.trim(),
      category,
      priority,
      dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Nazwa zadania
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Np. odkurzyć mieszkanie"
          className="
            w-full rounded-xl border border-slate-200
            bg-white px-4 py-3 text-sm
            outline-none transition
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
          "
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Kategoria
        </label>

        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="
            w-full rounded-xl border border-slate-200
            bg-white px-4 py-3 text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
          "
        >
          <option value="Dom">Dom</option>
          <option value="Sprzątanie">Sprzątanie</option>
          <option value="Zakupy">Zakupy</option>
          <option value="Pranie">Pranie</option>
        </select>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Priorytet</p>

        <div className="grid grid-cols-3 gap-2">
          {(
            [
              ["low", "Niski"],
              ["medium", "Średni"],
              ["high", "Wysoki"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setPriority(value)}
              className={`
                rounded-xl border px-3 py-3 text-sm font-medium transition
                ${
                  priority === value
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="dueDate"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Termin
        </label>

        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="
            w-full rounded-xl border border-slate-200
            bg-white px-4 py-3 text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
          "
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            flex-1 rounded-xl
            border border-slate-200
            px-4 py-3 text-sm font-medium
            text-slate-600
            transition hover:bg-slate-50
          "
        >
          Anuluj
        </button>

        <button
          type="submit"
          disabled={!title.trim() || !dueDate}
          className="
            flex-1 rounded-xl
            bg-blue-600 px-4 py-3
            text-sm font-medium text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Dodaj zadanie
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
