import { useState } from "react";
import { AuthGuard } from "~/features/auth/components";
import { NotificationsHeader } from "./_authenticated.notifications._index/components/NotificationsHeader";
import { NotificationsTabs } from "./_authenticated.notifications._index/components/NotificationsTabs";
import { useNotifications } from "./_authenticated.notifications._index/hooks/useNotifications";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const {
    unreadCount,
    isLoading,
    handleMarkAllAsRead,
    handleMarkAsRead,
    getFilteredNotifications,
  } = useNotifications();

  const filteredNotifications = getFilteredNotifications(activeTab);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="p-8 min-h-screen bg-bg-secondary">
          <div className="mx-auto max-w-4xl">
            <div className="h-64 animate-pulse rounded-xl bg-bg-card border border-border-light" />
          </div>
        </div>
      </AuthGuard>
    );
  }

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

