import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Save,
  Slack,
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    slack: true,
    desktop: false,
    mentions: true,
    updates: true,
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    toast.success(`Switched to ${!isDarkMode ? "dark" : "light"} mode`);
  };

  const handleSavePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error("New passwords don't match");
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setPasswordData({ current: "", new: "", confirm: "" });
    toast.success("Password updated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Logo size="sm" />
        </div>
      </header>

      <main className="container py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isDarkMode ? (
                  <Moon className="h-5 w-5 text-primary" />
                ) : (
                  <Sun className="h-5 w-5 text-primary" />
                )}
                Appearance
              </CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={handleThemeToggle} />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Slack className="h-4 w-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label>Slack Mentions</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone tags you
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.slack}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, slack: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show browser notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.desktop}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, desktop: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>@Mentions</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when mentioned in comments
                  </p>
                </div>
                <Switch
                  checked={notifications.mentions}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, mentions: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sprint Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about sprint changes
                  </p>
                </div>
                <Switch
                  checked={notifications.updates}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, updates: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security
              </CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={passwordData.current}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, current: e.target.value })
                    }
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={passwordData.new}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, new: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={passwordData.confirm}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirm: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button
                onClick={handleSavePassword}
                disabled={
                  isSaving ||
                  !passwordData.current ||
                  !passwordData.new ||
                  !passwordData.confirm
                }
                className="w-full sm:w-auto"
              >
                {isSaving ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
