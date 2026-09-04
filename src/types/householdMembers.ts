export type HouseholdMember = {
  id: string;
  name: string;
  avatar?: string;
};
export type HouseholdMembership = {
  householdId: string;
  userId: string;
  role: "owner" | "member";
};