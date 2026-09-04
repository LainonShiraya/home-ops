import { createContext } from "react";

import type { Notification } from "../../types/notification";

export type NotificationContextValue = {
  notifications: Notification[];
  myNotifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
};

export const NotificationContext =
  createContext<NotificationContextValue | undefined>(undefined);