import { useState, type ReactNode } from "react";
import { households as initialHouseholds } from "../../data/households";
import type { Household } from "../../types/household";
import { HouseholdContext } from "./HouseholdContext";
import {
  householdMemberships as initialMemberships,
  householdMembers as initialMembers,
} from "../../data/householdMembers";
import type {
  HouseholdMember,
  HouseholdMembership,
} from "../../types/householdMembers";

type HouseholdProviderProps = {
  children: ReactNode;
};

export function HouseholdProvider({ children }: HouseholdProviderProps) {
  const [memberships, setMemberships] =
    useState<HouseholdMembership[]>(initialMemberships);
  const [households, setHouseholds] = useState<Household[]>(initialHouseholds);
  const [activeHouseholdId, setActiveHouseholdId] = useState(
    initialHouseholds[0]?.id ?? "",
  );

  const members = memberships
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

    setMemberships((prev) => [
      ...prev,
      {
        householdId: newHousehold.id,
        userId: "user-1",
        role: "owner",
      },
    ]);

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

  const getMemberRole = (userId: string) => {
    return memberships.find(
      (membership) =>
        membership.householdId === activeHouseholdId &&
        membership.userId === userId,
    )?.role;
  };
  const deleteHousehold = (householdId: string) => {
    const membership = memberships.find(
      (membership) =>
        membership.householdId === householdId &&
        membership.userId === "user-1",
    );

    if (membership?.role !== "owner") {
      return;
    }

    setHouseholds((prev) =>
      prev.filter((household) => household.id !== householdId),
    );

    setMemberships((prev) =>
      prev.filter((membership) => membership.householdId !== householdId),
    );

    if (activeHouseholdId === householdId) {
      const nextHousehold = households.find(
        (household) => household.id !== householdId,
      );

      setActiveHouseholdId(nextHousehold?.id ?? "");
    }
  };
  const leaveHousehold = (householdId: string) => {
    const membership = memberships.find(
      (membership) =>
        membership.householdId === householdId &&
        membership.userId === "user-1",
    );

    if (!membership || membership.role === "owner") {
      return;
    }

    setMemberships((prev) =>
      prev.filter(
        (membership) =>
          !(
            membership.householdId === householdId &&
            membership.userId === "user-1"
          ),
      ),
    );

    if (activeHouseholdId === householdId) {
      const nextHousehold = households.find(
        (household) => household.id !== householdId,
      );

      setActiveHouseholdId(nextHousehold?.id ?? "");
    }
  };
  const removeMember = (householdId: string, userId: string) => {
    const ownerMembership = memberships.find(
      (membership) =>
        membership.householdId === householdId &&
        membership.userId === "user-1",
    );

    if (ownerMembership?.role !== "owner") {
      return;
    }

    if (userId === "user-1") {
      return;
    }

    setMemberships((prev) =>
      prev.filter(
        (membership) =>
          !(
            membership.householdId === householdId &&
            membership.userId === userId
          ),
      ),
    );
  };
  return (
    <HouseholdContext.Provider
      value={{
        members,
        households,
        activeHousehold,
        memberships,
        createHousehold,
        joinHousehold,
        selectHousehold,
        getMemberRole,
        deleteHousehold,
        leaveHousehold,
        removeMember,
      }}
    >
      {children}
    </HouseholdContext.Provider>
  );
}
