import { useState } from "react";

import { rewards as initialRewards } from "../data/rewards";
import type { Reward } from "../types/reward";
import { useHouseholds } from "../context/HouseholdContext/useHouseholds";

type RewardInput = {
  title: string;
  description: string;
  cost: number;
};

export function useRewards() {
  const { activeHousehold } = useHouseholds();

  const [rewards, setRewards] =
    useState<Reward[]>(initialRewards);

  const createReward = (input: RewardInput) => {
    if (!activeHousehold) {
      return;
    }

    const newReward: Reward = {
      id: Date.now().toString(),
      householdId: activeHousehold.id,
      createdBy: "user-1",
      ...input,
    };

    setRewards((prev) => [newReward, ...prev]);
  };
const updateReward = (
  rewardId: string,
  input: RewardInput,
) => {
  setRewards((prev) =>
    prev.map((reward) =>
      reward.id === rewardId
        ? {
            ...reward,
            ...input,
          }
        : reward,
    ),
  );
};
const deleteReward = (rewardId: string) => {
  setRewards((prev) =>
    prev.filter((reward) => reward.id !== rewardId),
  );
};
  return {
    rewards,
    createReward,
    updateReward,
    deleteReward
  };
}