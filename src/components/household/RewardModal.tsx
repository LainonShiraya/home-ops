import { X } from "lucide-react";

import type { Reward } from "../../types/reward";
import RewardForm from "./RewardForm";

type RewardModalProps = {
  isOpen: boolean;
  onSubmit: (input: {
    title: string;
    description: string;
    cost: number;
  }) => void;
  onClose: () => void;
  initialValues?: Partial<Reward>;
};

function RewardModal({
  isOpen,
  onSubmit,
  onClose,
  initialValues,
}: RewardModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-900/40 sm:items-center sm:justify-center"
      onMouseDown={onClose}
    >
      <div
        className="w-full rounded-t-3xl bg-white p-6 sm:max-w-md sm:rounded-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {initialValues ? "Edytuj nagrodę" : "Dodaj nagrodę"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Zamknij"
          >
            <X size={20} />
          </button>
        </div>

        <RewardForm
          onSubmit={onSubmit}
          onCancel={onClose}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
}

export default RewardModal;
