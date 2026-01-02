import { useState } from "react";
import { AuthGuard } from "~/components/AuthGuard";
import { NotificationsHeader } from "./_authenticated.notifications._index/components/NotificationsHeader";
import { NotificationsTabs } from "./_authenticated.notifications._index/components/NotificationsTabs";
import { useNotifications } from "./_authenticated.notifications._index/hooks/useNotifications";
import { mockNotifications } from "./_authenticated.notifications._index/data/mockNotifications";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const {
    notifications,
    unreadCount,
    handleMarkAllAsRead,
    handleMarkAsRead,
    getFilteredNotifications,
  } = useNotifications(mockNotifications);

  const filteredNotifications = getFilteredNotifications(activeTab);

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen bg-bg-secondary">
        <div className="mx-auto max-w-4xl">
          <NotificationsHeader
            unreadCount={unreadCount}
            onMarkAllAsRead={handleMarkAllAsRead}
          />

          <NotificationsTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            filteredNotifications={filteredNotifications}
            unreadCount={unreadCount}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
      </div>
    </AuthGuard>
  );
}

