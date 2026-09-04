import { Gift, X } from "lucide-react";

import type { Reward } from "../../types/reward";

type RewardRedeemModalProps = {
  isOpen: boolean;
  reward: Reward | null;
  currentPoints: number;
  onConfirm: () => void;
  onClose: () => void;
};

function RewardRedeemModal({
  isOpen,
  reward,
  currentPoints,
  onConfirm,
  onClose,
}: RewardRedeemModalProps) {
  if (!isOpen || !reward) {
    return null;
  }

  const remainingPoints = currentPoints - reward.cost;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-900/40 sm:items-center sm:justify-center"
      onMouseDown={onClose}
    >
      <div
        className="w-full rounded-t-3xl bg-white p-6 sm:max-w-md sm:rounded-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Wykorzystać nagrodę?
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            aria-label="Zamknij"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Gift size={24} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{reward.title}</h3>

            {reward.description && (
              <p className="mt-1 text-sm text-slate-500">
                {reward.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Twój stan</span>

            <span className="font-semibold text-slate-900">
              {currentPoints} pkt
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Koszt nagrody</span>

            <span className="font-semibold text-indigo-600">
              -{reward.cost} pkt
            </span>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Po wykorzystaniu
              </span>

              <span className="font-bold text-slate-900">
                {remainingPoints} pkt
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50"
          >
            Anuluj
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Wykorzystaj
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardRedeemModal;
