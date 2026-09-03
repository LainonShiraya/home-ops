import type { HouseholdMember } from "../types/householdMembers";

export const householdMembers: HouseholdMember[] = [
  {
    id: "user-1",
    name: "Konrad",
  },
  {
    id: "user-2",
    name: "Anna",
  },
];

export const householdMemberships = [
  {
    householdId: "home-001",
    userId: "user-1",
  },
  {
    householdId: "home-001",
    userId: "user-2",
  },
  {
    householdId: "home-002",
    userId: "user-1",
  },
];