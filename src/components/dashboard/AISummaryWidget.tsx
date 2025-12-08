import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

const insights = [
  {
    type: "success",
    icon: <TrendingUp className="h-4 w-4" />,
    text: "Team velocity increased by 4% compared to last sprint",
  },
  {
    type: "success",
    icon: <CheckCircle className="h-4 w-4" />,
    text: "PR merge time improved to average 8 hours",
  },
  {
    type: "warning",
    icon: <AlertTriangle className="h-4 w-4" />,
    text: "Anna Kim workload is at 112% - consider redistributing",
  },
  {
    type: "warning",
    icon: <TrendingDown className="h-4 w-4" />,
    text: "3 high-priority tickets have no activity in 24h",
  },
];

const recommendations = [
  "Pair Mike with Anna on PROJ-145 to balance workload",
  "Schedule mid-sprint review to address blocked items",
  "Consider moving PROJ-133 to next sprint given current velocity",
];

export const AISummaryWidget = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <Card variant="gradient" className="overflow-hidden relative">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-info">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            AI Summary & Insights
          </CardTitle>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Insights */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Key Insights
          </h4>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  insight.type === "success"
                    ? "bg-success/5 text-success"
                    : "bg-warning/5 text-warning"
                }`}
              >
                <div className="shrink-0 mt-0.5">{insight.icon}</div>
                <p className="text-sm text-foreground">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Recommendations
          </h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Confidence Score */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50">
          <div className="flex items-center gap-2">
            <Badge variant="gradient" className="font-mono">
              AI
            </Badge>
            <span className="text-sm text-muted-foreground">
              Analysis confidence
            </span>
          </div>
          <span className="text-sm font-semibold text-primary">94%</span>
        </div>
      </CardContent>
    </Card>
  );
};
