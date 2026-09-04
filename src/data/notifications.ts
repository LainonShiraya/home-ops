import type { Notification } from "../types/notification";

export const notifications: Notification[] = [
  {
    id: "notification-1",
    householdId: "home-001",
    userId: "user-1",
    type: "reward-redeemed-by-me",
    title: "Wykorzystano nagrodę",
    message:
      'Wykorzystałeś „Wieczór filmowy” za 30 pkt.',
    createdAt: "2026-09-04T12:30:00",
    read: false,
  },
  {
    id: "notification-2",
    householdId: "home-001",
    userId: "user-1",
    type: "reward-redeemed",
    title: "Twoja nagroda została wykorzystana",
    message:
      'Ola wykorzystała „Randka” za 100 pkt.',
    createdAt: "2026-09-03T18:15:00",
    read: true,
  },
];