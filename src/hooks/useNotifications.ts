import { useState } from "react";

import { notifications as initialNotifications } from "../data/notifications";
import { useHouseholds } from "../context/HouseholdContext/useHouseholds";
import type { Notification } from "../types/notification";

export function useNotifications() {
  const { activeHousehold } = useHouseholds();

  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const myNotifications = notifications.filter(
    (notification) =>
      notification.householdId === activeHousehold?.id &&
      notification.userId === "user-1",
  );

  const unreadCount = myNotifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.householdId === activeHousehold?.id &&
        notification.userId === "user-1"
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  };

  return {
    notifications,
    myNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}