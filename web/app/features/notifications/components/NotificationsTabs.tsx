import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/Tabs";
import { Badge } from "~/components/ui/Badge";
import { NotificationCard } from "./NotificationCard";
import { NotificationsEmptyState } from "./NotificationsEmptyState";
import type { Notification } from "../types";

interface NotificationsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredNotifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: number) => void;
}

export function NotificationsTabs({
  activeTab,
  onTabChange,
  filteredNotifications,
  unreadCount,
  onMarkAsRead,
}: NotificationsTabsProps) {
  const tabValues = ["all", "unread", "concerts", "team"];

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList>
        <TabsTrigger value="all">
          All
          {unreadCount > 0 && (
            <Badge className="ml-2 h-5 min-w-5 rounded-full px-1.5 bg-blue-main text-white">
              {unreadCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
        <TabsTrigger value="concerts">Concerts</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>

      {tabValues.map((tabValue) => (
        <TabsContent key={tabValue} value={tabValue} className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <NotificationsEmptyState tabValue={tabValue} />
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
              />
            ))
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

