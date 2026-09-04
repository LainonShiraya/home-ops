import { useState } from "react";
import { MoreVertical, Trash2, Users } from "lucide-react";

import { useHouseholds } from "../../context/HouseholdContext/useHouseholds";
import HouseholdActionModal from "./HouseholdActionModal";

function HouseholdMembers() {
  const { activeHousehold, members, getMemberRole, removeMember } =
    useHouseholds();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [memberToRemove, setMemberToRemove] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const isCurrentUserOwner = getMemberRole("user-1") === "owner";

  if (!activeHousehold) {
    return null;
  }

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
          <Users size={20} />
          Domownicy
        </h2>

        <div className="space-y-3">
          {members.map((member) => {
            const role = getMemberRole(member.id);
            const isOwner = role === "owner";

            const canRemove = isCurrentUserOwner && !isOwner;

            return (
              <div key={member.id} className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                  {member.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{member.name}</p>
                </div>

                <div className="flex items-center gap-2">
                  {role && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {role === "owner" ? "Właściciel" : "Członek"}
                    </span>
                  )}

                  {canRemove && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenuId((current) =>
                            current === member.id ? null : member.id,
                          );
                        }}
                        className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        aria-label={`Opcje użytkownika ${member.name}`}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId === member.id && (
                        <div className="absolute right-0 top-10 z-10 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              setMemberToRemove({
                                id: member.id,
                                name: member.name,
                              });
                            }}
                            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Usuń z domu
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {memberToRemove && (
        <HouseholdActionModal
          isOpen
          action="remove-member"
          householdName={activeHousehold.name}
          memberName={memberToRemove.name}
          onClose={() => setMemberToRemove(null)}
          onConfirm={() => {
            removeMember(activeHousehold.id, memberToRemove.id);

            setMemberToRemove(null);
          }}
        />
      )}
    </>
  );
}

export default HouseholdMembers;
