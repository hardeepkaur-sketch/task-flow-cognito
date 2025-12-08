import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, GitCommit, GitPullRequest, TicketIcon, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "commit",
    user: "Sarah Miller",
    action: "pushed 3 commits to",
    target: "feature/auth",
    time: "10 min ago",
    avatar: "SM",
  },
  {
    id: 2,
    type: "pr",
    user: "Mike Roberts",
    action: "opened PR",
    target: "#892 - OAuth integration",
    time: "25 min ago",
    avatar: "MR",
  },
  {
    id: 3,
    type: "jira",
    user: "Anna Kim",
    action: "moved",
    target: "PROJ-145 to In Progress",
    time: "1 hour ago",
    avatar: "AK",
  },
  {
    id: 4,
    type: "commit",
    user: "John Doe",
    action: "pushed 1 commit to",
    target: "main",
    time: "2 hours ago",
    avatar: "JD",
  },
  {
    id: 5,
    type: "pr",
    user: "Tom Chen",
    action: "merged PR",
    target: "#889 - Notifications",
    time: "3 hours ago",
    avatar: "TC",
  },
  {
    id: 6,
    type: "jira",
    user: "Sarah Miller",
    action: "completed",
    target: "PROJ-140",
    time: "4 hours ago",
    avatar: "SM",
  },
];

const typeIcons = {
  commit: <GitCommit className="h-4 w-4" />,
  pr: <GitPullRequest className="h-4 w-4" />,
  jira: <TicketIcon className="h-4 w-4" />,
};

const typeColors = {
  commit: "bg-success/10 text-success",
  pr: "bg-info/10 text-info",
  jira: "bg-primary/10 text-primary",
};

export const RecentActivityWidget = () => {
  const filterActivities = (type?: string) => {
    if (!type || type === "all") return activities;
    return activities.filter((a) => a.type === type);
  };

  return (
    <Card variant="elevated">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="commit" className="gap-1">
              <GitCommit className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Commits</span>
            </TabsTrigger>
            <TabsTrigger value="pr" className="gap-1">
              <GitPullRequest className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">PRs</span>
            </TabsTrigger>
            <TabsTrigger value="jira" className="gap-1">
              <TicketIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Jira</span>
            </TabsTrigger>
          </TabsList>

          {["all", "commit", "pr", "jira"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0 space-y-1">
              {filterActivities(tab).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/80 to-info/80 flex items-center justify-center text-[10px] font-semibold text-white shrink-0">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      <span className="font-medium text-primary">
                        {activity.target}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`p-1 rounded ${
                          typeColors[activity.type as keyof typeof typeColors]
                        }`}
                      >
                        {typeIcons[activity.type as keyof typeof typeIcons]}
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
