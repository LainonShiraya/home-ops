import { X } from "lucide-react";

type RewardActionModalProps = {
  isOpen: boolean;
  rewardTitle?: string;
  onConfirm: () => void;
  onClose: () => void;
};

function RewardActionModal({
  isOpen,
  rewardTitle,
  onConfirm,
  onClose,
}: RewardActionModalProps) {
  if (!isOpen) return null;

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
          <h2 className="text-xl font-bold text-slate-900">Usuń nagrodę</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            aria-label="Zamknij"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Czy na pewno chcesz usunąć nagrodę{" "}
          <span className="font-semibold text-slate-700">„{rewardTitle}”</span>?
          Tej operacji nie można cofnąć.
        </p>

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
            className="flex-1 cursor-pointer rounded-xl bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700"
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardActionModal;
