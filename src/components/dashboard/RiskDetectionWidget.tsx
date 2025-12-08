import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, GitPullRequest, AlertCircle, ChevronRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const risks = [
  {
    id: 1,
    type: "stale",
    severity: "high",
    title: "PR #887 stale for 5 days",
    description: "No activity on auth refactor PR",
    assignee: "Mike R.",
    action: "Review needed",
  },
  {
    id: 2,
    type: "blocked",
    severity: "critical",
    title: "PROJ-142 blocked",
    description: "Waiting on external API access",
    assignee: "Sarah M.",
    action: "Escalate",
  },
  {
    id: 3,
    type: "overdue",
    severity: "medium",
    title: "Sprint goal at risk",
    description: "3 tickets still in To Do with 2 days left",
    assignee: "Team",
    action: "Reassign",
  },
  {
    id: 4,
    type: "inactive",
    severity: "high",
    title: "High priority inactive",
    description: "PROJ-145 no updates in 24h",
    assignee: "John D.",
    action: "Check in",
  },
];

const severityConfig = {
  critical: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    badge: "bg-destructive text-destructive-foreground",
  },
  high: {
    bg: "bg-warning/10",
    text: "text-warning",
    badge: "bg-warning/10 text-warning",
  },
  medium: {
    bg: "bg-info/10",
    text: "text-info",
    badge: "bg-info/10 text-info",
  },
};

const typeIcons = {
  stale: <Clock className="h-4 w-4" />,
  blocked: <AlertCircle className="h-4 w-4" />,
  overdue: <AlertTriangle className="h-4 w-4" />,
  inactive: <Shield className="h-4 w-4" />,
};

export const RiskDetectionWidget = () => {
  const navigate = useNavigate();

  return (
    <Card variant="elevated" className="border-l-4 border-l-warning">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Risk Detection
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={() => navigate("/risks")}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {risks.map((risk) => {
          const config = severityConfig[risk.severity as keyof typeof severityConfig];

          return (
            <div
              key={risk.id}
              className={`p-3 rounded-lg ${config.bg} border border-transparent hover:border-border/50 transition-colors cursor-pointer group`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-background ${config.text}`}>
                    {typeIcons[risk.type as keyof typeof typeIcons]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium">{risk.title}</h4>
                      <Badge className={config.badge}>{risk.severity}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {risk.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Assigned: {risk.assignee}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {risk.action}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
