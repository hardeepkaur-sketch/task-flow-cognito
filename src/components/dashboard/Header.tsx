import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Bell, Settings, LogOut, User, ChevronDown, Slack, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isMyDashboard: boolean;
  onToggleDashboard: (value: boolean) => void;
}

const notifications = [
  {
    id: 1,
    type: "slack",
    message: "Sarah mentioned you in #dev-team",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "jira",
    message: "PROJ-123 assigned to you",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    type: "pr",
    message: "Your PR was approved",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 4,
    type: "slack",
    message: "Mike tagged you in a thread",
    time: "3 hours ago",
    unread: false,
  },
];

export const Header = ({ isMyDashboard, onToggleDashboard }: HeaderProps) => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Logo size="md" />

        {/* Center - Dashboard Toggle */}
        <div className="flex items-center gap-4 bg-secondary/50 rounded-full px-4 py-2">
          <span
            className={`text-sm font-medium transition-colors ${
              !isMyDashboard ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Team Insights
          </span>
          <Switch
            checked={isMyDashboard}
            onCheckedChange={onToggleDashboard}
            className="data-[state=checked]:bg-primary"
          />
          <span
            className={`text-sm font-medium transition-colors ${
              isMyDashboard ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            My Dashboard
          </span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center animate-pulse-soft">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h4 className="font-semibold">Notifications</h4>
                <Button variant="ghost" size="sm" className="text-xs text-primary">
                  Mark all read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-accent/50 cursor-pointer transition-colors ${
                      notification.unread ? "bg-accent/30" : ""
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        notification.type === "slack"
                          ? "bg-purple-100 text-purple-600"
                          : notification.type === "jira"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {notification.type === "slack" ? (
                        <Slack className="h-4 w-4" />
                      ) : (
                        <MessageSquare className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {notification.unread && (
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t px-4 py-3">
                <Button variant="ghost" className="w-full text-sm text-primary">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  JD
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Engineering Manager</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/auth")}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
