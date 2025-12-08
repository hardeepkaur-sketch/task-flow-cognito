import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketIcon, GitBranch, GitPullRequest, Clock, AlertCircle } from "lucide-react";

const jiraTickets = [
  { id: "PROJ-145", title: "Implement user authentication", status: "in-progress", priority: "high", assignee: "JD" },
  { id: "PROJ-142", title: "Fix payment gateway timeout", status: "in-progress", priority: "critical", assignee: "SM" },
  { id: "PROJ-138", title: "Update dashboard charts", status: "todo", priority: "medium", assignee: "AK" },
  { id: "PROJ-136", title: "Optimize database queries", status: "dev-done", priority: "high", assignee: "MR" },
  { id: "PROJ-133", title: "Add export functionality", status: "todo", priority: "low", assignee: "JD" },
];

const prData = [
  { id: "#892", title: "feat: add OAuth integration", status: "open", author: "sarah.m", reviewers: 2, updated: "2h ago" },
  { id: "#891", title: "fix: memory leak in worker", status: "merged", author: "mike.r", reviewers: 3, updated: "5h ago" },
  { id: "#890", title: "chore: update dependencies", status: "open", author: "john.d", reviewers: 1, updated: "1d ago" },
  { id: "#889", title: "feat: real-time notifications", status: "merged", author: "anna.k", reviewers: 2, updated: "1d ago" },
];

const statusColors: Record<string, string> = {
  "todo": "bg-muted text-muted-foreground",
  "in-progress": "bg-info/10 text-info",
  "dev-done": "bg-success/10 text-success",
  "open": "bg-warning/10 text-warning",
  "merged": "bg-success/10 text-success",
};

const priorityColors: Record<string, string> = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-warning/10 text-warning",
  medium: "bg-info/10 text-info",
  low: "bg-muted text-muted-foreground",
};

export const WorkSnapshotWidget = () => {
  return (
    <Card variant="elevated" className="col-span-full lg:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Current Work Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="jira" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="jira" className="gap-2">
              <TicketIcon className="h-4 w-4" />
              Jira Tickets
            </TabsTrigger>
            <TabsTrigger value="github" className="gap-2">
              <GitBranch className="h-4 w-4" />
              GitHub / PRs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jira" className="space-y-3 mt-0">
            {jiraTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-card flex items-center justify-center text-xs font-semibold border">
                    {ticket.assignee}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono">
                        {ticket.id}
                      </span>
                      <Badge
                        className={`text-[10px] px-1.5 py-0 ${priorityColors[ticket.priority]}`}
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {ticket.title}
                    </p>
                  </div>
                </div>
                <Badge className={`${statusColors[ticket.status]} shrink-0`}>
                  {ticket.status.replace("-", " ")}
                </Badge>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="github" className="space-y-3 mt-0">
            {prData.map((pr) => (
              <div
                key={pr.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center border">
                    <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono">
                        {pr.id}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        by {pr.author}
                      </span>
                    </div>
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {pr.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {pr.updated}
                  </span>
                  <Badge className={statusColors[pr.status]}>{pr.status}</Badge>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
