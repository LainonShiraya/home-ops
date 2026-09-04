import { useState } from "react";
import { X } from "lucide-react";

type HouseholdModalProps = {
  isOpen: boolean;
  onSubmit: (name: string) => void;
  onClose: () => void;
};

function HouseholdModal({ isOpen, onSubmit, onClose }: HouseholdModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSubmit(trimmedName);
    setName("");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-household-title"
      className="fixed inset-0 z-50 flex items-end bg-slate-900/40 sm:items-center sm:justify-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full rounded-t-3xl bg-white p-6 sm:max-w-md sm:rounded-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="create-household-title"
            className="text-xl font-bold text-slate-900"
          >
            Utwórz dom
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="household-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Nazwa domu
            </label>

            <input
              id="household-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="np. Mieszkanie"
              autoFocus
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex flex-col gap-2 min-[500px]:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700"
            >
              Anuluj
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Utwórz dom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HouseholdModal;
