import { createContext } from "react";
import type { Household } from "../../types/household";

export type HouseholdContextValue = {
  households: Household[];
  activeHousehold: Household | undefined;
  createHousehold: (name: string) => void;
  joinHousehold: (householdId: string) => void;
  selectHousehold: (householdId: string) => void;
};

export const HouseholdContext = createContext<HouseholdContextValue | null>(
  null,
);
