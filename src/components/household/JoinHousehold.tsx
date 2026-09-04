import { useActionState } from "react";

type JoinHouseholdProps = {
  onSubmit: (householdId: string) => void;
  onCancel: () => void;
};

type JoinHouseholdState = {
  error?: string;
};

const initialState: JoinHouseholdState = {};

function JoinHousehold({ onSubmit, onCancel }: JoinHouseholdProps) {
  const [state, formAction, isPending] = useActionState(
    async (
      _previousState: JoinHouseholdState,
      formData: FormData,
    ): Promise<JoinHouseholdState> => {
      const householdId = String(formData.get("householdId") ?? "").trim();

      if (!householdId) {
        return {
          error: "Podaj ID domu.",
        };
      }

      onSubmit(householdId);

      return {};
    },
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="household-id"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          ID domu
        </label>

        <input
          id="household-id"
          name="householdId"
          placeholder="np. home-001"
          autoFocus
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {state.error && (
          <p className="mt-2 text-sm text-red-600">{state.error}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 min-[500px]:flex-row">
        <button
          type="button"
          onClick={onCancel}
          className="w-full cursor-pointer rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700"
        >
          Anuluj
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Dołączanie..." : "Dołącz do domu"}
        </button>
      </div>
    </form>
  );
}

export default JoinHousehold;
