import { Gift } from "lucide-react";
import type { HouseholdMember } from "../../types/householdMembers";
import type { Reward } from "../../types/reward";
import type { RewardRedemption } from "../../types/rewardRedemption";
type RewardRedemptionHistoryProps = {
  redemptions: RewardRedemption[];
  rewards: Reward[];
  members: HouseholdMember[];
};
function RewardRedemptionHistory({
  redemptions,
  rewards,
  members,
}: RewardRedemptionHistoryProps) {
  if (redemptions.length === 0) {
    return (
      <div className="mt-6 border-t border-slate-100 pt-6">
        <h3 className="font-semibold text-slate-900">
          Historia wykorzystanych nagród
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Nie wykorzystano jeszcze żadnej nagrody.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <h3 className="font-semibold text-slate-900">
        Historia wykorzystanych nagród
      </h3>

      <div className="mt-3 space-y-2">
        {redemptions.map((redemption) => {
          const reward = rewards.find(
            (reward) => reward.id === redemption.rewardId,
          );

          const user = members.find(
            (member) => member.id === redemption.redeemedBy,
          );

          if (!reward) {
            return null;
          }

          return (
            <div
              key={redemption.id}
              className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Gift size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {reward.title}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Wykorzystał{" "}
                  <span className="font-medium">
                    {user?.name ?? "Nieznany użytkownik"}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-indigo-600">
                  -{redemption.cost} pkt
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {new Date(redemption.redeemedAt).toLocaleDateString("pl-PL")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RewardRedemptionHistory;
