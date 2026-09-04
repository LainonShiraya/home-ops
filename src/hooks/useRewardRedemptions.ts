import { useState } from "react";

import { rewardRedemptions as initialRedemptions } from "../data/rewardRedemptions";
import { useHouseholds } from "../context/HouseholdContext/useHouseholds";
import type { RewardRedemption } from "../types/rewardRedemption";

export function useRewardRedemptions() {
  const { activeHousehold } = useHouseholds();

  const [redemptions, setRedemptions] =
    useState<RewardRedemption[]>(initialRedemptions);

  const householdRedemptions = redemptions.filter(
    (redemption) =>
      redemption.householdId === activeHousehold?.id,
  );

  const addRedemption = (
    rewardId: string,
    cost: number,
    redeemedBy: string,
  ) => {
    if (!activeHousehold) {
      return;
    }

    const newRedemption: RewardRedemption = {
      id: Date.now().toString(),
      rewardId,
      householdId: activeHousehold.id,
      redeemedBy,
      cost,
      redeemedAt: new Date().toISOString(),
    };

    setRedemptions((prev) => [
      newRedemption,
      ...prev,
    ]);
  };

  return {
    redemptions,
    householdRedemptions,
    addRedemption,
  };
}