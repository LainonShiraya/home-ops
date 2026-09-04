import { useEffect, type MouseEvent } from "react";
import { X } from "lucide-react";

import JoinHousehold from "./JoinHousehold";

type JoinHouseholdModalProps = {
  isOpen: boolean;
  onSubmit: (householdId: string) => void;
  onClose: () => void;
};

function JoinHouseholdModal({
  isOpen,
  onSubmit,
  onClose,
}: JoinHouseholdModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-household-title"
      onMouseDown={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-end bg-slate-900/40 sm:items-center sm:justify-center"
    >
      <div className="w-full rounded-t-3xl bg-white p-6 sm:max-w-md sm:rounded-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="join-household-title"
            className="text-xl font-bold text-slate-900"
          >
            Dołącz do domu
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <JoinHousehold onSubmit={onSubmit} onCancel={onClose} />
      </div>
    </div>
  );
}

export default JoinHouseholdModal;
