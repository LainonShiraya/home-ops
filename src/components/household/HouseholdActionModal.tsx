import { AlertTriangle } from "lucide-react";

type HouseholdAction = "delete" | "leave" | "remove-member";

type HouseholdActionModalProps = {
  isOpen: boolean;
  householdName: string;
  action: HouseholdAction;
  memberName?: string;
  onConfirm: () => void;
  onClose: () => void;
};

function HouseholdActionModal({
  isOpen,
  householdName,
  action,
  memberName,
  onConfirm,
  onClose,
}: HouseholdActionModalProps) {
  if (!isOpen) {
    return null;
  }

  const isDelete = action === "delete";
  const isRemoveMember = action === "remove-member";

  const title = isDelete
    ? "Usuń dom"
    : isRemoveMember
      ? "Usuń domownika"
      : "Opuść dom";

  const description = isDelete
    ? `Czy na pewno chcesz usunąć dom „${householdName}”? Wszystkie dane tego domu zostaną usunięte.`
    : isRemoveMember
      ? `Czy na pewno chcesz usunąć ${memberName} z domu „${householdName}”?`
      : `Czy na pewno chcesz opuścić dom „${householdName}”?`;

  const confirmLabel = isDelete
    ? "Usuń dom"
    : isRemoveMember
      ? "Usuń domownika"
      : "Opuść dom";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-slate-900/40 sm:items-center sm:justify-center"
      onMouseDown={onClose}
    >
      <div
        className="w-full rounded-t-3xl bg-white p-6 sm:max-w-md sm:rounded-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={24} />
        </div>

        <h2 className="text-xl font-bold text-slate-900">{title}</h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

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
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HouseholdActionModal;
