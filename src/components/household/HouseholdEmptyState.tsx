import { Home, Plus, UserPlus } from "lucide-react";
import { useState } from "react";

import { useHouseholds } from "../../context/HouseholdContext/useHouseholds";
import HouseholdModal from "./HouseholdModal";
import JoinHouseholdModal from "./JoinHouseholdModal";

function HouseholdEmptyState() {
  const { createHousehold, joinHousehold } = useHouseholds();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <Home size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Nie masz jeszcze domu
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Utwórz własny dom lub dołącz do istniejącego, aby korzystać z zadań,
            wydatków i pozostałych funkcji.
          </p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Utwórz dom
            </button>

            <button
              type="button"
              onClick={() => setIsJoinOpen(true)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <UserPlus size={18} />
              Dołącz do domu
            </button>
          </div>
        </div>
      </div>

      <HouseholdModal
        isOpen={isCreateOpen}
        onSubmit={(name) => {
          createHousehold(name);
          setIsCreateOpen(false);
        }}
        onClose={() => setIsCreateOpen(false)}
      />

      <JoinHouseholdModal
        isOpen={isJoinOpen}
        onSubmit={(householdId) => {
          joinHousehold(householdId);
          setIsJoinOpen(false);
        }}
        onClose={() => setIsJoinOpen(false)}
      />
    </>
  );
}

export default HouseholdEmptyState;
