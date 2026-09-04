import { useState } from "react";
import { EllipsisVertical, Gift } from "lucide-react";

import { useHouseholds } from "../../context/HouseholdContext/useHouseholds";
import { useRewards } from "../../hooks/useRewards";
import type { Reward } from "../../types/reward";
import { useHouseholdPoints } from "../../hooks/useHouseholdPoints";
import RewardActionModal from "./RewardActionModal";
import RewardModal from "./RewardModal";
import RewardRedeemModal from "./RewardRedeemModal";
import { useRewardRedemptions } from "../../hooks/useRewardRedemptions";
import RewardRedemptionHistory from "./RewardRedemptionHistory";
function ShopSection() {
  const { activeHousehold, members } = useHouseholds();

  const { rewards, createReward, updateReward, deleteReward } = useRewards();
  const { currentUserPoints, spendPoints } = useHouseholdPoints();
  const { addRedemption, householdRedemptions } = useRewardRedemptions();
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [rewardToEdit, setRewardToEdit] = useState<Reward | null>(null);

  const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null);

  const [rewardToRedeem, setRewardToRedeem] = useState<Reward | null>(null);
  if (!activeHousehold) {
    return null;
  }

  const householdRewards = rewards.filter(
    (reward) => reward.householdId === activeHousehold.id,
  );

  const handleAddReward = () => {
    setRewardToEdit(null);
    setIsRewardModalOpen(true);
  };

  const handleEditReward = (reward: Reward) => {
    setRewardToEdit(reward);
    setIsRewardModalOpen(true);
    setOpenMenuId(null);
  };

  const handleCloseRewardModal = () => {
    setIsRewardModalOpen(false);
    setRewardToEdit(null);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift size={20} />

          <h2 className="font-semibold text-slate-900">Sklepik</h2>

          <div className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
            {currentUserPoints?.points ?? 0} pkt
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddReward}
          className="cursor-pointer rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + Dodaj nagrodę
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {householdRewards.map((reward) => {
          const creator = members.find(
            (member) => member.id === reward.createdBy,
          );

          return (
            <div
              key={reward.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Gift size={20} />
                </div>

                {reward.createdBy === "user-1" && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((current) =>
                          current === reward.id ? null : reward.id,
                        )
                      }
                      className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      aria-label="Opcje nagrody"
                    >
                      <EllipsisVertical size={18} />
                    </button>

                    {openMenuId === reward.id && (
                      <div className="absolute right-0 top-10 z-10 w-32 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lg">
                        <button
                          type="button"
                          onClick={() => handleEditReward(reward)}
                          className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Edytuj
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRewardToDelete(reward);
                            setOpenMenuId(null);
                          }}
                          className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          Usuń
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <h3 className="mt-3 font-semibold text-slate-900">
                {reward.title}
              </h3>

              {reward.description && (
                <p className="mt-1 text-sm text-slate-500">
                  {reward.description}
                </p>
              )}

              <p className="mt-3 text-xs text-slate-400">
                Dodane przez{" "}
                <span className="font-medium text-slate-500">
                  {creator?.name ?? "Nieznany użytkownik"}
                </span>
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-indigo-600">
                  {reward.cost} pkt
                </span>

                <button
                  type="button"
                  onClick={() => setRewardToRedeem(reward)}
                  disabled={(currentUserPoints?.points ?? 0) < reward.cost}
                  className="cursor-pointer rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Wykorzystaj
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <RewardRedemptionHistory
        redemptions={householdRedemptions}
        rewards={rewards}
        members={members}
      />
      <RewardModal
        isOpen={isRewardModalOpen}
        initialValues={rewardToEdit ?? undefined}
        onClose={handleCloseRewardModal}
        onSubmit={(input) => {
          if (rewardToEdit) {
            updateReward(rewardToEdit.id, input);
          } else {
            createReward(input);
          }

          handleCloseRewardModal();
        }}
      />

      <RewardActionModal
        isOpen={Boolean(rewardToDelete)}
        rewardTitle={rewardToDelete?.title}
        onClose={() => setRewardToDelete(null)}
        onConfirm={() => {
          if (!rewardToDelete) {
            return;
          }

          deleteReward(rewardToDelete.id);
          setRewardToDelete(null);
        }}
      />
      <RewardRedeemModal
        isOpen={Boolean(rewardToRedeem)}
        reward={rewardToRedeem}
        currentPoints={currentUserPoints?.points ?? 0}
        onClose={() => setRewardToRedeem(null)}
        onConfirm={() => {
          if (!rewardToRedeem) {
            return;
          }

          const success = spendPoints(rewardToRedeem.cost);

          if (!success) {
            return;
          }

          addRedemption(rewardToRedeem.id, rewardToRedeem.cost, "user-1");

          setRewardToRedeem(null);
        }}
      />
    </section>
  );
}

export default ShopSection;
