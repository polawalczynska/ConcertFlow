import { useState, useEffect } from "react";
import { useLocation } from "@remix-run/react";
import { useUser } from "~/shared/hooks/domain";
import { useUnreadNotificationCount } from "~/features/notifications/hooks";
import { useLogout } from "~/features/auth/hooks";
import { NavbarLogo } from "./NavbarLogo";
import { DesktopMenu } from "./DesktopMenu";
import { DesktopUserInfo } from "./DesktopUserInfo";
import { NotificationButton } from "./NotificationButton";
import { LogoutButton } from "./LogoutButton";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileMenuOverlay } from "./MobileMenuOverlay";
import { MobileMenu } from "./MobileMenu";
import { getMenuItems, getHomePage, getConcertsLink } from "./navbarData";

export function Navbar() {
  const location = useLocation();
  const logout = useLogout();
  const { data: user, isLoading } = useUser();
  const { data: unreadCount = 0 } = useUnreadNotificationCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const concertsLink = getConcertsLink(user?.role);
  const menuItems = getMenuItems(concertsLink);
  const homePage = getHomePage(user?.role);

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border-light bg-bg-main">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <NavbarLogo homePage={homePage} />

            <DesktopMenu menuItems={menuItems} />

            <div className="hidden md:flex md:items-center md:gap-4">
              <DesktopUserInfo user={user} isLoading={isLoading} />
              <NotificationButton unreadCount={unreadCount} />
              <LogoutButton />
            </div>

            <div className="flex md:hidden items-center gap-2">
              <NotificationButton unreadCount={unreadCount} />
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </nav>

      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        menuItems={menuItems}
        user={user}
        isLoading={isLoading}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}

