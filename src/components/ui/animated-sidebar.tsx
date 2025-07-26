"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Settings, Bell, Grid, Calendar, Clock, MapPin, History, Plus, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";

const AnimatedMenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => (
  <button
    onClick={toggle}
    aria-label="Toggle menu"
    className="focus:outline-none z-999"
  >
    <motion.div animate={{ y: isOpen ? 13 : 0 }} transition={{ duration: 0.3 }}>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
        className="text-foreground"
      >
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 2.5 L 22 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 12 L 22 12", opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 21.5 L 22 21.5" },
            open: { d: "M 3 2.5 L 17 16.5" },
          }}
        />
      </motion.svg>
    </motion.div>
  </button>
);

const CollapsibleSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full flex items-center justify-between py-2 px-4 rounded-xl hover:bg-accent"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-foreground">{title}</span>
        {open ? <XIcon /> : <MenuIcon />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuIcon = () => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.line x1="3" y1="12" x2="21" y2="12" />
  </motion.svg>
);

const XIcon = () => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <motion.line x1="18" y1="6" x2="6" y2="18" />
    <motion.line x1="6" y1="6" x2="18" y2="18" />
  </motion.svg>
);

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="flex items-center gap-2 w-full font-medium text-sm p-3 text-center rounded-xl hover:bg-accent transition-colors mt-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

const Logo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center relative">
      {/* Calendar Icon */}
      <div className="w-8 h-8 border-2 border-primary rounded-sm relative">
        {/* Calendar top bar */}
        <div className="absolute -top-1 left-0 right-0 h-1 bg-red-500 rounded-t-sm"></div>
        {/* Calendar hangers */}
        <div className="absolute -top-1 left-1 w-1 h-1 bg-primary rounded-full"></div>
        <div className="absolute -top-1 right-1 w-1 h-1 bg-primary rounded-full"></div>
        {/* Checkmark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 text-teal-500">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        </div>
        {/* Bar chart */}
        <div className="absolute bottom-1 right-1 flex items-end space-x-0.5">
          <div className="w-0.5 h-2 bg-primary"></div>
          <div className="w-0.5 h-3 bg-primary"></div>
          <div className="w-0.5 h-4 bg-orange-500"></div>
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      <p className="font-bold text-foreground text-sm">RESERVATION</p>
      <p className="font-semibold text-foreground text-xs">DASHBOARD</p>
    </div>
  </div>
);

const ReservationSidebar = ({ onNavigate, currentPage }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const mobileSidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "upcoming", label: "Upcoming", icon: Calendar },
    { id: "all", label: "All Reservations", icon: Grid },
    { id: "history", label: "History", icon: History },
    { id: "create", label: "New Reservation", icon: Plus },
  ];

  const NavButton = ({ item, isMobile = false }: { item: any; isMobile?: boolean }) => (
    <button
      onClick={() => {
        onNavigate(item.id);
        if (isMobile) setIsOpen(false);
      }}
      className={`flex gap-2 font-medium text-sm items-center w-full py-3 px-4 rounded-xl transition-all duration-200 ${
        currentPage === item.id
          ? "bg-primary text-primary-foreground shadow-md"
          : "hover:bg-accent text-foreground"
      }`}
    >
      <item.icon className="h-5 w-5" />
      {item.label}
    </button>
  );

  return (
    <div className="flex h-full">
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileSidebarVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-50 bg-background text-foreground"
          >
            <div className="flex flex-col h-full">
              {/* Profile Section */}
              <div className="p-4 border-b border-border">
                <Logo />
              </div>
              {/* Navigation Section */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <NavButton item={item} isMobile={true} />
                    </li>
                  ))}
                </ul>
                {/* Toggleable Sections */}
                <div className="mt-6">
                  <CollapsibleSection title="Quick Actions">
                    <ul className="space-y-1">
                      <li>
                        <button className="w-full font-medium text-sm text-left p-2 rounded-xl hover:bg-accent text-foreground">
                          Export Data
                        </button>
                      </li>
                      <li>
                        <button className="w-full font-medium text-sm text-left p-2 rounded-xl hover:bg-accent text-foreground">
                          Import Reservations
                        </button>
                      </li>
                    </ul>
                  </CollapsibleSection>
                  <CollapsibleSection title="Settings">
                    <ul className="space-y-1">
                      <li>
                        <button className="w-full font-medium text-sm text-left p-2 rounded-xl hover:bg-accent text-foreground">
                          Notifications
                        </button>
                      </li>
                      <li>
                        <button className="w-full font-medium text-sm text-left p-2 rounded-xl hover:bg-accent text-foreground">
                          Preferences
                        </button>
                      </li>
                    </ul>
                  </CollapsibleSection>
                </div>
              </nav>
              {/* Footer / Action Button */}
              <ThemeToggle />
              <div className="p-4 border-t border-border">
                <button
                  className="w-full font-medium text-sm p-3 text-center bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
                  onClick={() => {
                    onNavigate("analytics");
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                >
                  View Analytics
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-background text-foreground shadow-lg border-r border-border">
        {/* Profile Section */}
        <div className="p-4 border-b border-border">
          <Logo />
        </div>
        {/* Navigation Section */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <NavButton item={item} />
              </li>
            ))}
          </ul>
          {/* Toggleable Sections */}
          <div className="mt-6">
            <CollapsibleSection title="Quick Actions">
              <ul className="space-y-1">
                <li>
                  <button className="w-full font-medium text-sm text-left p-2 rounded-xl hover:bg-accent text-foreground">
                    Export Data
                  </button>
                </li>
                <li>
                  <button className="w-full font-medium text-sm text-left p-2 rounded-xl hover:bg-accent text-foreground">
                    Import Reservations
                  </button>
                </li>
              </ul>
            </CollapsibleSection>
            <CollapsibleSection title="Settings">
              <ul className="space-y-1">
                <li>
                  <button className="w-full font-medium text-sm text-left p-2 rounded-xl hover:bg-accent text-foreground">
                    Notifications
                  </button>
                </li>
                <li>
                  <button className="w-full font-medium text-sm text-left p-2 rounded-xl hover:bg-accent text-foreground">
                    Preferences
                  </button>
                </li>
              </ul>
            </CollapsibleSection>
          </div>
        </nav>
        {/* Footer / Action Button */}
        <ThemeToggle />
        <div className="p-4 border-t border-border">
          <button
            className="w-full font-medium text-sm p-3 text-center bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
            onClick={() => onNavigate("analytics")}
          >
            View Analytics
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300">
        {/* Top bar for mobile toggle */}
        <div className="p-4 bg-card border-b border-border md:hidden flex justify-between items-center">
          <h1 className="text-xl font-bold text-foreground">Reservations</h1>
          <AnimatedMenuToggle toggle={toggleSidebar} isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export { ReservationSidebar };