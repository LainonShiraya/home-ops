import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import type {
  TaskInput,
  Task,
  TaskPriority,
  TaskRepetition,
} from "../../types/task";
import { useHouseholds } from "../../context/HouseholdContext/useHouseholds";
type TaskFormProps = {
  onSubmit: (input: TaskInput) => void;
  onCancel: () => void;
  initialValues?: Task;
};

type TaskFormState = {
  errors: {
    title?: string;
    dueDate?: string;
  };
};

const initialState: TaskFormState = {
  errors: {},
};

function SubmitButton({ isEditButton }: { isEditButton: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
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
      {pending
        ? "Zapisywanie..."
        : isEditButton
          ? "Zapisz zmiany"
          : "Dodaj zadanie"}
    </button>
  );
}

function TaskForm({ onSubmit, onCancel, initialValues }: TaskFormProps) {
  const { members } = useHouseholds();

  const [priority, setPriority] = useState<TaskPriority>(
    initialValues?.priority ?? "medium",
  );

  const [formState, formAction] = useActionState(
    async (
      _previousState: TaskFormState,
      formData: FormData,
    ): Promise<TaskFormState> => {
      const title = String(formData.get("title") ?? "").trim();
      const dueDate = String(formData.get("dueDate") ?? "");

      const errors: TaskFormState["errors"] = {};

      if (!title) {
        errors.title = "Nazwa zadania jest wymagana";
      }

      if (!dueDate) {
        errors.dueDate = "Termin jest wymagany";
      }

      if (Object.keys(errors).length > 0) {
        return { errors };
      }

      const taskInput: TaskInput = {
        title,
        category: String(formData.get("category") ?? "Dom"),
        priority,
        dueDate,
        assigneeId: String(formData.get("assigneeId") ?? "user-1"),
        repetition: formData.get("repetition") as TaskRepetition,
      };

      onSubmit(taskInput);

      return {
        errors: {},
      };
    },
    initialState,
  );

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const minDate = initialValues?.dueDate
    ? initialValues.dueDate < todayString
      ? initialValues.dueDate
      : todayString
    : todayString;

  return (
    <form action={formAction} className="space-y-5">
      {/* Title */}

      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Nazwa zadania
        </label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialValues?.title ?? ""}
          placeholder="Np. odkurzyć mieszkanie"
          className="
            w-full rounded-xl border border-slate-200
            bg-white px-4 py-3 text-sm
            outline-none transition
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
          "
        />

        {formState.errors.title && (
          <p className="mt-1 text-sm text-red-600">{formState.errors.title}</p>
        )}
      </div>

      {/* Category */}

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Kategoria
        </label>

        <select
          id="category"
          name="category"
          defaultValue={initialValues?.category ?? "Dom"}
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

      {/* Priority */}

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Priorytet</p>

        <input type="hidden" name="priority" value={priority} />

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

      {/* Assignee */}

      <div>
        <label
          htmlFor="assigneeId"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Przypisz do
        </label>

        <select
          id="assigneeId"
          name="assigneeId"
          defaultValue={initialValues?.assigneeId ?? "user-1"}
          className="
            w-full rounded-xl border border-slate-200
            bg-white px-4 py-3 text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
          "
        >
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {/* Due date */}

      <div>
        <label
          htmlFor="dueDate"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Termin
        </label>

        <input
          id="dueDate"
          name="dueDate"
          type="date"
          min={minDate}
          defaultValue={initialValues?.dueDate?.split("T")[0] ?? ""}
          className="
            w-full rounded-xl border border-slate-200
            bg-white px-4 py-3 text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
          "
        />

        {formState.errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">
            {formState.errors.dueDate}
          </p>
        )}
      </div>

      {/* Repetition */}

      <div>
        <label
          htmlFor="repetition"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Powtarzanie
        </label>

        <select
          id="repetition"
          name="repetition"
          defaultValue={initialValues?.repetition ?? "none"}
          className="
            w-full rounded-xl border border-slate-200
            bg-white px-4 py-3 text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
          "
        >
          <option value="none">Nie powtarza się</option>
          <option value="daily">Codziennie</option>
          <option value="weekly">Co tydzień</option>
          <option value="monthly">Co miesiąc</option>
        </select>
      </div>

      {/* Actions */}

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

        <SubmitButton isEditButton={!!initialValues} />
      </div>
    </form>
  );
}

export default TaskForm;
