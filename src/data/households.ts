import type { Household, HouseholdPoints } from "../types/household";

export const households: Household[] = [
  {
    id: "home-001",
    name: "Mieszkanie",
  },
  {
    id: "home-002",
    name: "Dom rodziców",
  },
];

export const householdPoints: HouseholdPoints[] = [
  {
    householdId: "home-001",
    userId: "user-1",
    points: 125,
  },
  {
    householdId: "home-001",
    userId: "user-2",
    points: 80,
  },
  {
    householdId: "home-002",
    userId: "user-1",
    points: 40,
  },
];