import { useState, type ReactNode } from "react";
import { households as initialHouseholds } from "../../data/households";
import type { Household } from "../../types/household";
import { HouseholdContext } from "./HouseholdContext";
import {
  householdMemberships,
  householdMembers as initialMembers,
} from "../../data/householdMembers";
import type { HouseholdMember } from "../../types/householdMembers";

type HouseholdProviderProps = {
  children: ReactNode;
};

export function HouseholdProvider({ children }: HouseholdProviderProps) {
  const [households, setHouseholds] = useState<Household[]>(initialHouseholds);
  const [activeHouseholdId, setActiveHouseholdId] = useState(
    initialHouseholds[0]?.id ?? "",
  );

  const members = householdMemberships
    .filter((membership) => membership.householdId === activeHouseholdId)
    .map((membership) =>
      initialMembers.find((member) => member.id === membership.userId),
    )
    .filter((member): member is HouseholdMember => Boolean(member));

  const activeHousehold = households.find(
    (household) => household.id === activeHouseholdId,
  );

  const createHousehold = (name: string) => {
    const newHousehold: Household = {
      id: `home-${Date.now()}`,
      name,
    };

    setHouseholds((prev) => [...prev, newHousehold]);
    setActiveHouseholdId(newHousehold.id);
  };

  const joinHousehold = (householdId: string) => {
    const household = households.find(
      (household) => household.id === householdId,
    );

    if (!household) {
      return;
    }

    setActiveHouseholdId(household.id);
  };

  const selectHousehold = (householdId: string) => {
    setActiveHouseholdId(householdId);
  };

  return (
    <HouseholdContext.Provider
      value={{
        members,
        households,
        activeHousehold,
        createHousehold,
        joinHousehold,
        selectHousehold,
      }}
    >
      {children}
    </HouseholdContext.Provider>
  );
}
