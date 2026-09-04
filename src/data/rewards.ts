import type { Reward } from "../types/reward";

export const rewards: Reward[] = [
  {
    id: "reward-1",
    householdId: "home-001",
    title: "Ugotuję Ci obiad",
    description: "Ty wybierasz, co dzisiaj jemy ❤️",
    cost: 50,
    createdBy: "user-1",
  },
  {
    id: "reward-2",
    householdId: "home-001",
    title: "Wieczór filmowy",
    description: "Film, przekąski i zero obowiązków.",
    cost: 30,
    createdBy: "user-2",
  },
  {
    id: "reward-3",
    householdId: "home-001",
    title: "Randka",
    description: "Wybierasz miejsce, ja organizuję.",
    cost: 100,
    createdBy: "user-2",
  },
  {
    id: "reward-4",
    householdId: "home-002",
    title: "Zapraszam do kina",
    description: "Bilet + popcorn.",
    cost: 80,
    createdBy: "user-1",
  },
];