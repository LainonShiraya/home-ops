import { useState } from "react";

import { notifications as initialNotifications } from "../../data/notifications";
import { useHouseholds } from "../HouseholdContext/useHouseholds";
import { NotificationContext } from "./NotificationContext";
import type { Notification } from "../../types/notification";
type NotificationProviderProps = {
  children: React.ReactNode;
};

function NotificationProvider({ children }: NotificationProviderProps) {
  const { activeHousehold } = useHouseholds();

  const [notifications, setNotifications] = useState(initialNotifications);

  const myNotifications = notifications.filter(
    (notification) => notification.userId === "user-1",
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

  const addNotification = (
    notification: Omit<Notification, "id" | "createdAt" | "read">,
  ) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        myNotifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
