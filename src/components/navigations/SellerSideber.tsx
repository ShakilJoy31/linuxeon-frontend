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
  Menu,
  ChevronsRight,
  Database,
  Globe,
  History,
} from "lucide-react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";
import homeLogo from '../../../public/The_Logo/linuxeon_logo.png';
import homeLogoDark from '../../../public/The_Logo/linuxeon_logo.png'; // Add dark mode logo if available
import avatar from "@/assets/About-Us/shakil.png";
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

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const menuItems = [
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

  // Improved isActive function
  const isActive = (href: string) => {
    if (!pathname || !href) return false;
    
    // For dashboard, exact match
    if (href === "/admin/dashboard") {
      return pathname === href;
    }
    
    // For other routes, check if current path starts with href
    // Also handle trailing slashes
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
    for (const item of menuItems) {
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
    return item.subItems.some((subItem: {href: string }) => isActive(subItem.href));
  };

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900"
      >
        <Menu size={24} className="text-gray-800 dark:text-gray-200" />
      </button>

      <motion.aside
        initial={{ width: 70 }}
        animate={{ width: isOpen ? 260 : 70 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col ${
          isOpen ? "w-[260px]" : "w-[70px]"
        }`}
      >
        {/* Logo and Toggle */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.2 }}
              className={`${!isOpen && "hidden"}`}
            >
              {mounted && (
                <Image
                  src={currentTheme === "dark" ? homeLogoDark : homeLogo}
                  alt="Logo"
                  width={130}
                  height={40}
                  className="dark:invert dark:brightness-200"
                />
              )}
            </motion.div>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <ChevronsRight
              className={`transition-transform duration-300 text-gray-700 dark:text-gray-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              size={22}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.key} className="px-1">
                {!item.subItems ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-3 gap-3 rounded-lg transition-all group",
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                      isActive(item.href) &&
                        "bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[20px] transition-colors",
                        isActive(item.href)
                          ? "text-white dark:text-white"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                      )}
                    >
                      {item.icon}
                    </span>
                    {isOpen && (
                      <span className="text-sm font-medium">{item.label}</span>
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
                          "text-[20px] transition-colors",
                          (activeSubmenu === item.key || isActiveSubmenu(item))
                            ? "text-gray-900 dark:text-gray-200"
                            : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                        )}
                      >
                        {item.icon}
                      </span>
                      {isOpen && (
                        <>
                          <span className="text-sm font-medium flex-1 text-left">
                            {item.label}
                          </span>
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform text-gray-500 dark:text-gray-400",
                              activeSubmenu === item.key ? "rotate-180" : ""
                            )}
                          />
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {(activeSubmenu === item.key || isActiveSubmenu(item)) &&
                        item.subItems &&
                        isOpen && (
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.1 }}
                              >
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    "flex items-center px-3 py-2.5 gap-2 text-sm rounded-lg transition-all group",
                                    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                                    isActive(subItem.href) &&
                                      "bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600"
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "text-[16px] transition-colors",
                                      isActive(subItem.href)
                                        ? "text-white dark:text-white"
                                        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                                    )}
                                  >
                                    {subItem.icon}
                                  </span>
                                  <span className="font-medium">
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
            <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
              <Avatar.Image
                src={avatar.src}
                alt="Admin"
                className="object-cover w-full h-full"
              />
              <Avatar.Fallback
                delayMs={600}
                className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center w-full h-full"
              >
                AD
              </Avatar.Fallback>
            </Avatar.Root>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                className="text-sm flex-1"
              >
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  shakil@gmail.com
                </p>
              </motion.div>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <MdLogout
                    size={18}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  />
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                    Logging out will end your current session.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Toggle Theme
                  </span>
                </div>
                <ThemeSwitcher></ThemeSwitcher>
               
              </button>

              <Link
                href="/admin/profile"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <UserCheck size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">Admin Profile</span>
                </div>
                <ExternalLink size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400" />
              </Link>

              <Link
                href="/admin/change-password"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                    <RiLockPasswordFill size={16} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium">Change Password</span>
                </div>
                <ExternalLink size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400" />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
};

export default AdminSidebar;