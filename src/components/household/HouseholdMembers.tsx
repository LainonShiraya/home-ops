import { Users } from "lucide-react";
import { useHouseholds } from "../../context/HouseholdContext/useHouseholds";

function HouseholdMembers() {
  const { members } = useHouseholds();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
        <Users size={20} />
        Domownicy
      </h2>
      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              {member.name.charAt(0)}
            </div>

            <span className="font-medium text-slate-900">{member.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HouseholdMembers;
