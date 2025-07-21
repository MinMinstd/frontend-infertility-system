import React, { createContext, useContext, useState } from "react";

export interface NotificationItem {
  id: number;
  avatar: string;
  name: string;
  message: string;
  time: string;
  isRead?: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, "id" | "isRead">) => void;
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (notification: Omit<NotificationItem, "id" | "isRead">) => {
    setNotifications((prev) => [
      {
        ...notification,
        id: Date.now(),
        isRead: false,
      },
      ...prev,
    ]);
  };

  const markAllAsRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const markAsRead = (id: number) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllAsRead, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}; 