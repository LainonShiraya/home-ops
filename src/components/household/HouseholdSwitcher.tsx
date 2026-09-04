import { useState } from "react";
import { Check, Home, MoreVertical, Trash2, LogOut } from "lucide-react";

import { useHouseholds } from "../../context/HouseholdContext/useHouseholds";
import HouseholdActionModal from "./HouseholdActionModal";

function HouseholdSwitcher() {
  const {
    households,
    activeHousehold,
    selectHousehold,
    memberships,
    deleteHousehold,
    leaveHousehold,
  } = useHouseholds();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [action, setAction] = useState<{
    type: "delete" | "leave";
    householdId: string;
  } | null>(null);

  const selectedHousehold = households.find(
    (household) => household.id === action?.householdId,
  );

  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-slate-500">
        Twoje domostwa
      </h2>

      <div className="space-y-2">
        {households.map((household) => {
          const isActive = household.id === activeHousehold?.id;

          const membership = memberships.find(
            (membership) =>
              membership.householdId === household.id &&
              membership.userId === "user-1",
          );

          const isOwner = membership?.role === "owner";

          return (
            <div
              key={household.id}
              className={`flex items-center rounded-2xl border p-4 transition ${
                isActive
                  ? "border-indigo-200 bg-indigo-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  selectHousehold(household.id);
                  setOpenMenuId(null);
                }}
                className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
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
                  <p className="font-semibold text-slate-900">
                    {household.name}
                  </p>

                  <p className="text-sm text-slate-500">ID: {household.id}</p>
                </div>

                {isActive && (
                  <Check size={20} className="shrink-0 text-indigo-600" />
                )}
              </button>

              <div className="relative ml-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    setOpenMenuId((current) =>
                      current === household.id ? null : household.id,
                    );
                  }}
                  className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label={`Opcje domu ${household.name}`}
                >
                  <MoreVertical size={18} />
                </button>

                {openMenuId === household.id && (
                  <div className="absolute right-0 top-11 z-10 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                    {isOwner ? (
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenuId(null);
                          setAction({
                            type: "delete",
                            householdId: household.id,
                          });
                        }}
                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Usuń dom
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenuId(null);
                          setAction({
                            type: "leave",
                            householdId: household.id,
                          });
                        }}
                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <LogOut size={16} />
                        Opuść dom
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedHousehold && action && (
        <HouseholdActionModal
          isOpen
          householdName={selectedHousehold.name}
          action={action.type}
          onClose={() => setAction(null)}
          onConfirm={() => {
            if (action.type === "delete") {
              deleteHousehold(action.householdId);
            } else {
              leaveHousehold(action.householdId);
            }

            setAction(null);
          }}
        />
      )}
    </section>
  );
}

export default HouseholdSwitcher;
