import { Users, Store } from "lucide-react";
import { useHouseholds } from "../context/HouseholdContext/useHouseholds";
import HouseholdSwitcher from "../components/household/HouseholdSwitcher";
import HouseholdModal from "../components/household/HouseholdModal";
import { useState } from "react";
import JoinHouseholdModal from "../components/household/JoinHouseholdModal";
function HouseholdPage() {
  const { activeHousehold, createHousehold, joinHousehold } = useHouseholds();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  if (!activeHousehold) {
    return null;
  }

  return (
    <main className="px-6 pb-24 lg:pb-6">
      <h1 className="pb-4 text-2xl font-bold text-slate-900">Mieszkanie</h1>

      <HouseholdSwitcher />
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-2xl border border-dashed border-slate-300 bg-white p-4 font-medium text-indigo-600 cursor-pointer"
        >
          + Utwórz dom
        </button>
      </div>
      <div className="mt-2">
        <button
          type="button"
          onClick={() => setIsJoinOpen(true)}
          className="w-full cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-white p-4 font-medium text-indigo-600"
        >
          + Dołącz do domu
        </button>
      </div>
      <section className="mt-6 space-y-3">
        <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left">
          <Users size={20} />
          <span className="font-medium">Domownicy</span>
        </button>

        <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left">
          <Store size={20} />
          <span className="font-medium">Sklepik</span>
        </button>
      </section>
      <HouseholdModal
        isOpen={isModalOpen}
        onSubmit={(name) => {
          createHousehold(name);
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      />
      <JoinHouseholdModal
        isOpen={isJoinOpen}
        onSubmit={(householdId) => {
          joinHousehold(householdId);
          setIsJoinOpen(false);
        }}
        onClose={() => setIsJoinOpen(false)}
      />
    </main>
  );
}

export default HouseholdPage;
