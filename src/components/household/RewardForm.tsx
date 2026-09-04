import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import type { Reward } from "../../types/reward";

type RewardInput = {
  title: string;
  description: string;
  cost: number;
};

type RewardFormProps = {
  onSubmit: (input: RewardInput) => void;
  onCancel: () => void;
  initialValues?: Partial<Reward>;
};

type RewardFormState = {
  error?: string;
};

const initialState: RewardFormState = {};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 cursor-pointer rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending
        ? "Zapisywanie..."
        : isEditing
          ? "Zapisz zmiany"
          : "Dodaj nagrodę"}
    </button>
  );
}

function RewardForm({ onSubmit, onCancel, initialValues }: RewardFormProps) {
  const isEditing = Boolean(initialValues?.id);

  const [state, formAction] = useActionState(
    async (
      _previousState: RewardFormState,
      formData: FormData,
    ): Promise<RewardFormState> => {
      const title = String(formData.get("title") ?? "").trim();
      const description = String(formData.get("description") ?? "").trim();
      const cost = Number(formData.get("cost"));

      if (!title) {
        return {
          error: "Podaj nazwę nagrody.",
        };
      }

      if (!Number.isFinite(cost) || cost <= 0) {
        return {
          error: "Koszt musi być większy od 0.",
        };
      }

      onSubmit({
        title,
        description,
        cost,
      });

      return {};
    },
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Nazwa nagrody
        </label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialValues?.title ?? ""}
          placeholder="np. Ugotuję Ci obiad"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Opis
        </label>

        <textarea
          id="description"
          name="description"
          defaultValue={initialValues?.description ?? ""}
          placeholder="Opisz krótko, na czym polega nagroda"
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label
          htmlFor="cost"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Koszt w punktach
        </label>

        <input
          id="cost"
          name="cost"
          type="number"
          min="1"
          step="1"
          defaultValue={initialValues?.cost ?? ""}
          placeholder="np. 50"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {state.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 cursor-pointer rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
        >
          Anuluj
        </button>

        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  );
}

export default RewardForm;
