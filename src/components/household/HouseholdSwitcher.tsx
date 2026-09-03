import { Check, Home } from "lucide-react";
import { useHouseholds } from "../../context/HouseholdContext/useHouseholds";

function HouseholdSwitcher() {
  const { households, activeHousehold, selectHousehold } = useHouseholds();

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-slate-500">
        Twoje domostwa
      </h2>

      <div className="space-y-2">
        {households.map((household) => {
          const isActive = household.id === activeHousehold?.id;

          return (
            <button
              key={household.id}
              type="button"
              onClick={() => selectHousehold(household.id)}
              className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
                isActive
                  ? "border-indigo-200 bg-indigo-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <Home size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{household.name}</p>

                <p className="text-sm text-slate-500">ID: {household.id}</p>
              </div>

              {isActive && (
                <Check size={20} className="shrink-0 text-indigo-600" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default HouseholdSwitcher;
