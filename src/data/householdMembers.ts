import type { HouseholdMember, HouseholdMembership } from "../types/householdMembers";

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

export const householdMemberships: HouseholdMembership[] = [
  {
    householdId: "home-001",
    userId: "user-1",
    role: "owner",
  },
  {
    householdId: "home-001",
    userId: "user-2",
    role: "member",
  },
  {
    householdId: "home-002",
    userId: "user-1",
    role: "owner",
  },
];