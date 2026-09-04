import { createContext } from "react";
import type { Household, HouseholdPoints } from "../../types/household";
import type {
  HouseholdMember,
  HouseholdMembership,
} from "../../types/householdMembers";

export type HouseholdContextValue = {
  households: Household[];
  members: HouseholdMember[];
  activeHousehold: Household | undefined;
  memberships: HouseholdMembership[];
  createHousehold: (name: string) => void;
  joinHousehold: (householdId: string) => void;
  selectHousehold: (householdId: string) => void;
  getMemberRole: (userId: string) => "owner" | "member" | undefined;
  deleteHousehold: (householdId: string) => void;
  leaveHousehold: (householdId: string) => void;
  removeMember: (householdId: string, userId: string) => void;
  points: HouseholdPoints[];
  currentUserPoints: HouseholdPoints | undefined;
  addPoints: (userId: string, amount: number) => void;
  spendPoints: (amount: number) => boolean;
};

export const HouseholdContext = createContext<HouseholdContextValue | null>(
  null,
);
