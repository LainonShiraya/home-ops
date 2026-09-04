import { useState } from "react";

import { useHouseholds } from "../context/HouseholdContext/useHouseholds";
import { householdPoints as initialHouseholdPoints } from "../data/households";
import type { HouseholdPoints } from "../types/household";

export function useHouseholdPoints() {
  const { activeHousehold } = useHouseholds();

  const [points, setPoints] =
    useState<HouseholdPoints[]>(initialHouseholdPoints);

  const currentUserPoints = points.find(
    (entry) =>
      entry.householdId === activeHousehold?.id &&
      entry.userId === "user-1",
  );

  const spendPoints = (amount: number) => {
    if (!activeHousehold || !currentUserPoints) {
      return false;
    }

    if (currentUserPoints.points < amount) {
      return false;
    }

    setPoints((prev) =>
      prev.map((entry) =>
        entry.householdId === activeHousehold.id &&
        entry.userId === "user-1"
          ? {
              ...entry,
              points: entry.points - amount,
            }
          : entry,
      ),
    );

    return true;
  };
const addPoints = (userId: string, amount: number) => {
  if (!activeHousehold || amount <= 0) {
    return;
  }

  setPoints((prev) =>
    prev.map((entry) =>
      entry.householdId === activeHousehold.id &&
      entry.userId === userId
        ? {
            ...entry,
            points: entry.points + amount,
          }
        : entry,
    ),
  );
};
  return {
    points,
    currentUserPoints,
    spendPoints,
    addPoints,
  };
}