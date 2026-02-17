"use client";

import * as Avatar from "@radix-ui/react-avatar";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Bell,
  MessageSquare,
  Send,
  Inbox,
  CreditCard,
  Shield,
  UserCheck,
  FileText,
  Calendar,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Database,
  Globe,
  History,
  Lock,
  X,
} from "lucide-react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";
import homeLogo from '../../../public/The_Logo/linuxeon_logo.png';
import homeLogoDark from '../../../public/The_Logo/linuxeon_logo.png';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { appConfiguration } from "@/utils/constant/appConfiguration";
import { CgTemplate } from "react-icons/cg";
import { useTheme } from "next-themes";
import ThemeSwitcher from "../common/ThemeSwitcher";
import { getUserInfo } from "@/utils/helper/userFromToken";
import { useGetClientByIdQuery } from "@/redux/api/authentication/authApi";

interface AdminSidebarProps {
  isOpen?: boolean;
  onToggleSidebar?: () => void;
  isMobile?: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen = true,
  onToggleSidebar,
  isMobile = false,
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      if (!userInfo) {
        router.push("/");
      } else {
        setUser(userInfo);
      }
    };
    fetchUser();
  }, [router]);

  const { data: userData } = useGetClientByIdQuery(user ? user.id : "", {
    skip: !user?.id,
  });

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync internal state with prop
  useEffect(() => {
    setInternalIsOpen(isOpen);
  }, [isOpen]);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const getMenuByRole = () => {
    const ClientmenuItems = [
      {
        key: "dashboard",
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/admin/dashboard",
      },
      {
        key: "sms",
        icon: <Send size={20} />,
        label: "SMS Management",
        subItems: [
          {
            key: "audience",
            icon: <MessageSquare size={16} />,
            label: "Audience",
            href: "/admin/sms/audience",
          },
          {
            key: "send-sms",
            icon: <Send size={16} />,
            label: "Send SMS",
            href: "/admin/sms/send-sms",
          },
          {
            key: "scheduled-sms",
            icon: <Calendar size={16} />,
            label: "Scheduled SMS",
            href: "/admin/sms/scheduled",
          },
          {
            key: "sms-history",
            icon: <History size={16} />,
            label: "SMS History",
            href: "/admin/sms/history",
          },
          {
            key: "sms-templates",
            icon: <CgTemplate size={16} />,
            label: "SMS Balance",
            href: "/admin/sms/sms-balance",
          },
          {
            key: "sms-inbox",
            icon: <Inbox size={16} />,
            label: "Inbox",
            href: "/admin/sms/inbox",
          },
        ],
      },
      {
        key: "users",
        icon: <Users size={20} />,
        label: "User Management",
        subItems: [
          {
            key: "user-groups",
            icon: <UserCheck size={16} />,
            label: "User Groups",
            href: "/admin/users/groups",
          },
          {
            key: "user-balance",
            icon: <CreditCard size={16} />,
            label: "Balance & Credits",
            href: "/admin/users/balance",
          },
          {
            key: "user-activity",
            icon: <BarChart3 size={16} />,
            label: "User Activity",
            href: "/admin/users/activity",
          },
        ],
      },
      {
        key: "reports",
        icon: <BarChart3 size={20} />,
        label: "Reports & Analytics",
        subItems: [
          {
            key: "sms-reports",
            icon: <FileText size={16} />,
            label: "SMS Reports",
            href: "/admin/reports/sms",
          },
          {
            key: "financial-reports",
            icon: <CreditCard size={16} />,
            label: "Financial Reports",
            href: "/admin/reports/financial",
          },
          {
            key: "delivery-reports",
            icon: <BarChart3 size={16} />,
            label: "Delivery Reports",
            href: "/admin/reports/delivery",
          },
          {
            key: "usage-analytics",
            icon: <Database size={16} />,
            label: "Usage Analytics",
            href: "/admin/reports/analytics",
          },
        ],
      },
      {
        key: "settings",
        icon: <Settings size={20} />,
        label: "System Settings",
        subItems: [
          {
            key: "sms-gateway",
            icon: <Globe size={16} />,
            label: "SMS Gateway",
            href: "/admin/settings/gateway",
          },
          {
            key: "api-settings",
            icon: <Settings size={16} />,
            label: "API Settings",
            href: "/admin/settings/api",
          },
          {
            key: "sms-rates",
            icon: <CreditCard size={16} />,
            label: "SMS Rates",
            href: "/admin/settings/rates",
          },
          {
            key: "notification-settings",
            icon: <Bell size={16} />,
            label: "Notifications",
            href: "/admin/settings/notifications",
          },
        ],
      },
      {
        key: "security",
        icon: <Shield size={20} />,
        label: "Security",
        href: "/admin/security",
      },
      {
        key: "notifications",
        icon: <Bell size={20} />,
        label: "Notifications",
        href: "/admin/notifications",
      },
      {
        key: "support",
        icon: <HelpCircle size={20} />,
        label: "Support",
        subItems: [
          {
            key: "help-center",
            icon: <HelpCircle size={16} />,
            label: "Help Center",
            href: "/admin/support/help",
          },
          {
            key: "tickets",
            icon: <Inbox size={16} />,
            label: "Support Tickets",
            href: "/admin/support/tickets",
          },
          {
            key: "documentation",
            icon: <FileText size={16} />,
            label: "Documentation",
            href: "/admin/support/docs",
          },
        ],
      },
    ];

    const adminMenuItems = [
      {
        key: "dashboard",
        icon: <Home size={20} />,
        label: "Dashboard",
        href: "/admin/dashboard",
      },
      {
        key: "sms",
        icon: <Send size={20} />,
        label: "SMS Management",
        subItems: [
          {
            key: "compose-sms",
            icon: <MessageSquare size={16} />,
            label: "Compose SMS",
            href: "/admin/sms/compose",
          },
          {
            key: "bulk-sms",
            icon: <Send size={16} />,
            label: "Bulk SMS",
            href: "/admin/sms/bulk",
          },
          {
            key: "scheduled-sms",
            icon: <Calendar size={16} />,
            label: "Scheduled SMS",
            href: "/admin/sms/scheduled",
          },
          {
            key: "sms-history",
            icon: <History size={16} />,
            label: "SMS History",
            href: "/admin/sms/history",
          },
          {
            key: "sms-templates",
            icon: <CgTemplate size={16} />,
            label: "Templates",
            href: "/admin/sms/templates",
          },
          {
            key: "sms-inbox",
            icon: <Inbox size={16} />,
            label: "Inbox",
            href: "/admin/sms/inbox",
          },
        ],
      },
      {
        key: "users",
        icon: <Users size={20} />,
        label: "User Management",
        subItems: [
          {
            key: "all-users",
            icon: <Users size={16} />,
            label: "All Users",
            href: "/admin/all-users",
          },
          {
            key: "user-groups",
            icon: <UserCheck size={16} />,
            label: "User Groups",
            href: "/admin/users/groups",
          },
          {
            key: "user-balance",
            icon: <CreditCard size={16} />,
            label: "Balance & Credits",
            href: "/admin/users/balance",
          },
          {
            key: "user-activity",
            icon: <BarChart3 size={16} />,
            label: "User Activity",
            href: "/admin/users/activity",
          },
        ],
      },
      {
        key: "reports",
        icon: <BarChart3 size={20} />,
        label: "Reports & Analytics",
        subItems: [
          {
            key: "sms-reports",
            icon: <FileText size={16} />,
            label: "SMS Reports",
            href: "/admin/reports/sms",
          },
          {
            key: "financial-reports",
            icon: <CreditCard size={16} />,
            label: "Financial Reports",
            href: "/admin/reports/financial",
          },
          {
            key: "delivery-reports",
            icon: <BarChart3 size={16} />,
            label: "Delivery Reports",
            href: "/admin/reports/delivery",
          },
          {
            key: "usage-analytics",
            icon: <Database size={16} />,
            label: "Usage Analytics",
            href: "/admin/reports/analytics",
          },
        ],
      },
      {
        key: "settings",
        icon: <Settings size={20} />,
        label: "System Settings",
        subItems: [
          {
            key: "sms-gateway",
            icon: <Globe size={16} />,
            label: "SMS Gateway",
            href: "/admin/settings/gateway",
          },
          {
            key: "api-settings",
            icon: <Settings size={16} />,
            label: "API Settings",
            href: "/admin/settings/api",
          },
          {
            key: "sms-rates",
            icon: <CreditCard size={16} />,
            label: "SMS Rates",
            href: "/admin/settings/rates",
          },
          {
            key: "notification-settings",
            icon: <Bell size={16} />,
            label: "Notifications",
            href: "/admin/settings/notifications",
          },
        ],
      },
      {
        key: "security",
        icon: <Shield size={20} />,
        label: "Security",
        href: "/admin/security",
      },
      {
        key: "notifications",
        icon: <Bell size={20} />,
        label: "Notifications",
        href: "/admin/notifications",
      },
      {
        key: "support",
        icon: <HelpCircle size={20} />,
        label: "Support",
        subItems: [
          {
            key: "help-center",
            icon: <HelpCircle size={16} />,
            label: "Help Center",
            href: "/admin/support/help",
          },
          {
            key: "tickets",
            icon: <Inbox size={16} />,
            label: "Support Tickets",
            href: "/admin/support/tickets",
          },
          {
            key: "documentation",
            icon: <FileText size={16} />,
            label: "Documentation",
            href: "/admin/support/docs",
          },
        ],
      },
    ];

    if (user && user?.role === 'client') {
      return ClientmenuItems;
    } else if (user && user?.role === 'admin') {
      return adminMenuItems;
    } else {
      return [];
    }
  };

  // Improved isActive function
  const isActive = (href: string) => {
    if (!pathname || !href) return false;

    // For dashboard, exact match
    if (href === "/admin/dashboard") {
      return pathname === href;
    }

    // For other routes, check if current path starts with href
    const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;

    return normalizedPathname === normalizedHref || normalizedPathname.startsWith(normalizedHref + '/');
  };

  const handleLogout = () => {
    shareWithCookies("remove", `${appConfiguration.appCode}token`);
    router.push("/");
    router.refresh();
  };

  // Auto-open submenu based on current route
  useEffect(() => {
    if (!pathname) return;

    // Check each menu item for subitems that match current path
    for (const item of getMenuByRole()) {
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (isActive(subItem.href)) {
            setActiveSubmenu(item.key);
            return;
          }
        }
      }
    }

    // If no subitem matches, close all submenus
    setActiveSubmenu(null);
  }, [pathname]);

  // Helper function to check if any subitem is active
  const isActiveSubmenu = (item): boolean => {
    if (!item.subItems) return false;
    return item.subItems.some((subItem: { href: string }) => isActive(subItem.href));
  };

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  // Mobile close handler
  const handleMobileClose = () => {
    if (isMobile && onToggleSidebar) {
      onToggleSidebar();
    }
  };

  const displayIsOpen = isMobile ? isOpen : internalIsOpen;

  return (
    <motion.aside
      initial={false}
      animate={{
        width: displayIsOpen ? (isMobile ? "100%" : 260) : 70,
        x: isMobile ? (isOpen ? 0 : -100) : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden shadow-xl ${isMobile ? "max-w-xl" : "sticky top-0"
        }`}
    >
      {/* Logo and Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <Link href="/" onClick={handleMobileClose}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: displayIsOpen ? 1 : 0, x: displayIsOpen ? 0 : -20 }}
            transition={{ duration: 0.2 }}
            className={`${!displayIsOpen && "hidden"}`}
          >
            {mounted && (
              <Image
                src={currentTheme === "dark" ? homeLogoDark : homeLogo}
                alt="Logo"
                width={130}
                height={40}
                className="dark:invert dark:brightness-200"
                priority
              />
            )}
          </motion.div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile close button */}
          {isMobile && (
            <button
              onClick={() => onToggleSidebar && onToggleSidebar()}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
              aria-label="Close menu"
            >
              <X size={22} className="text-gray-700 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {getMenuByRole().map((item) => (
            <li key={item.key} className="px-1">
              {!item.subItems ? (
                <Link
                  href={item.href}
                  onClick={handleMobileClose}
                  className={cn(
                    "flex items-center px-3 py-3 gap-3 rounded-lg transition-all group",
                    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive(item.href) &&
                    "bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600"
                  )}
                >
                  <span
                    className={cn(
                      "text-[20px] transition-colors flex-shrink-0",
                      isActive(item.href)
                        ? "text-white dark:text-white"
                        : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                    )}
                  >
                    {item.icon}
                  </span>
                  {displayIsOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-medium truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() =>
                      setActiveSubmenu(
                        activeSubmenu === item.key ? null : item.key
                      )
                    }
                    className={cn(
                      "flex items-center px-3 py-3 gap-3 w-full rounded-lg transition-all group",
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                      (activeSubmenu === item.key || isActiveSubmenu(item)) &&
                      "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[20px] transition-colors flex-shrink-0",
                        (activeSubmenu === item.key || isActiveSubmenu(item))
                          ? "text-gray-900 dark:text-gray-200"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                      )}
                    >
                      {item.icon}
                    </span>
                    {displayIsOpen && (
                      <>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm font-medium flex-1 text-left truncate"
                        >
                          {item.label}
                        </motion.span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform text-gray-500 dark:text-gray-400 flex-shrink-0",
                            activeSubmenu === item.key ? "rotate-180" : ""
                          )}
                        />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {(activeSubmenu === item.key || isActiveSubmenu(item)) &&
                      item.subItems &&
                      displayIsOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-8 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((subItem) => (
                            <motion.li
                              key={subItem.key}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.1 }}
                            >
                              <Link
                                href={subItem.href}
                                onClick={handleMobileClose}
                                className={cn(
                                  "flex items-center px-3 py-2.5 gap-2 text-sm rounded-lg transition-all group",
                                  "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                                  isActive(subItem.href) &&
                                  "bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600"
                                )}
                              >
                                <span
                                  className={cn(
                                    "text-[16px] transition-colors flex-shrink-0",
                                    isActive(subItem.href)
                                      ? "text-white dark:text-white"
                                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                                  )}
                                >
                                  {subItem.icon}
                                </span>
                                <span className="font-medium truncate">
                                  {subItem.label}
                                </span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                  </AnimatePresence>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section and Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700 flex-shrink-0">
            <Avatar.Image
              src={userData?.data?.photo || ""}
              alt="Admin"
              className="object-cover w-full h-full"
            />
            <Avatar.Fallback
              delayMs={600}
              className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center w-full h-full"
            >
              {userData?.data?.fullName?.charAt(0) || "U"}
            </Avatar.Fallback>
          </Avatar.Root>

          {displayIsOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: displayIsOpen ? 1 : 0, x: displayIsOpen ? 0 : -20 }}
              transition={{ duration: 0.2 }}
              className="text-sm flex-1 min-w-0"
            >
              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                {userData?.data?.fullName || "Loading..."}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {userData?.data?.email || "Loading..."}
              </p>
            </motion.div>
          )}

          {displayIsOpen && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="p-1.5 rounded-md hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0">
                  <MdLogout
                    size={18}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  />
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 max-w-[95vw] md:max-w-md mx-auto">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                    Logging out will end your current session.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                  <AlertDialogCancel className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 order-2 sm:order-1">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 order-1 sm:order-2"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {displayIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: displayIsOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {/* Theme Toggle */}
            <div
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleTheme();
                  e.preventDefault();
                }
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                  Toggle Theme
                </span>
              </div>
              <ThemeSwitcher />
            </div>

            <Link
              href="/admin/profile"
              onClick={handleMobileClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors flex-shrink-0">
                  <UserCheck size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium truncate">Admin Profile</span>
              </div>
              <ExternalLink size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 flex-shrink-0" />
            </Link>

            <Link
              href="/admin/change-password"
              onClick={handleMobileClose}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-gray-700 dark:text-gray-300 transition-colors group ${pathname === '/admin/change-password'
                  ? 'bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600'
                  : 'border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors flex-shrink-0">
                  <RiLockPasswordFill size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-medium truncate">Change Password</span>
              </div>
              <Lock size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 flex-shrink-0" />
            </Link>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;