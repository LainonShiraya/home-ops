export type NotificationType =
  | "reward-redeemed"
  | "reward-redeemed-by-me"
  | "task-completed";

export type Notification = {
  id: string;
  householdId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};