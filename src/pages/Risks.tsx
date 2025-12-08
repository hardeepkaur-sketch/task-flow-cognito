import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  AlertCircle,
  Shield,
  Search,
  Filter,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const allRisks = [
  {
    id: 1,
    type: "stale",
    severity: "high",
    title: "PR #887 stale for 5 days",
    description: "No activity on auth refactor PR. Waiting on code review from senior developers.",
    assignee: "Mike R.",
    project: "Project Alpha",
    createdAt: "5 days ago",
    status: "open",
  },
  {
    id: 2,
    type: "blocked",
    severity: "critical",
    title: "PROJ-142 blocked",
    description: "Waiting on external API access from third-party vendor. Escalation ticket created.",
    assignee: "Sarah M.",
    project: "Project Beta",
    createdAt: "3 days ago",
    status: "open",
  },
  {
    id: 3,
    type: "overdue",
    severity: "medium",
    title: "Sprint goal at risk",
    description: "3 tickets still in To Do with 2 days left. Consider scope adjustment or resource reallocation.",
    assignee: "Team",
    project: "Project Alpha",
    createdAt: "2 days ago",
    status: "open",
  },
  {
    id: 4,
    type: "inactive",
    severity: "high",
    title: "High priority inactive - PROJ-145",
    description: "No updates in 24h on critical authentication feature. Developer may need assistance.",
    assignee: "John D.",
    project: "Project Alpha",
    createdAt: "1 day ago",
    status: "open",
  },
  {
    id: 5,
    type: "blocked",
    severity: "medium",
    title: "Dependency conflict",
    description: "Package version conflict blocking deployment pipeline.",
    assignee: "Tom C.",
    project: "Project Gamma",
    createdAt: "4 hours ago",
    status: "open",
  },
  {
    id: 6,
    type: "stale",
    severity: "low",
    title: "Documentation PR pending",
    description: "Documentation updates waiting on approval for 7 days.",
    assignee: "Anna K.",
    project: "Project Beta",
    createdAt: "7 days ago",
    status: "resolved",
  },
];

const severityConfig = {
  critical: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    badge: "bg-destructive text-destructive-foreground",
    border: "border-l-destructive",
  },
  high: {
    bg: "bg-warning/10",
    text: "text-warning",
    badge: "bg-warning/10 text-warning",
    border: "border-l-warning",
  },
  medium: {
    bg: "bg-info/10",
    text: "text-info",
    badge: "bg-info/10 text-info",
    border: "border-l-info",
  },
  low: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    badge: "bg-muted text-muted-foreground",
    border: "border-l-muted-foreground",
  },
};

const typeIcons = {
  stale: <Clock className="h-5 w-5" />,
  blocked: <AlertCircle className="h-5 w-5" />,
  overdue: <AlertTriangle className="h-5 w-5" />,
  inactive: <Shield className="h-5 w-5" />,
};

export default function Risks() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("open");

  const filteredRisks = allRisks.filter((risk) => {
    const matchesSearch =
      risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      risk.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || risk.severity === severityFilter;
    const matchesStatus =
      statusFilter === "all" || risk.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleResolve = (id: number) => {
    toast.success("Risk marked as resolved");
  };

  const handleEscalate = (id: number) => {
    toast.success("Risk escalated to management");
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

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-warning" />
            Risk Detection
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage project risks across all teams
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search risks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { label: "Critical", count: allRisks.filter((r) => r.severity === "critical" && r.status === "open").length, color: "destructive" },
            { label: "High", count: allRisks.filter((r) => r.severity === "high" && r.status === "open").length, color: "warning" },
            { label: "Medium", count: allRisks.filter((r) => r.severity === "medium" && r.status === "open").length, color: "info" },
            { label: "Resolved", count: allRisks.filter((r) => r.status === "resolved").length, color: "success" },
          ].map((item) => (
            <Card key={item.label} variant="elevated">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-2xl font-bold">{item.count}</p>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center bg-${item.color}/10`}
                  >
                    {item.label === "Resolved" ? (
                      <CheckCircle className={`h-5 w-5 text-${item.color}`} />
                    ) : (
                      <AlertTriangle className={`h-5 w-5 text-${item.color}`} />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Risk List */}
        <div className="space-y-4">
          {filteredRisks.map((risk) => {
            const config = severityConfig[risk.severity as keyof typeof severityConfig];

            return (
              <Card
                key={risk.id}
                variant="elevated"
                className={`border-l-4 ${config.border} ${
                  risk.status === "resolved" ? "opacity-60" : ""
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${config.bg} ${config.text}`}>
                        {typeIcons[risk.type as keyof typeof typeIcons]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3 className="font-semibold">{risk.title}</h3>
                          <Badge className={config.badge}>{risk.severity}</Badge>
                          <Badge variant="muted">{risk.project}</Badge>
                          {risk.status === "resolved" && (
                            <Badge variant="success">Resolved</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {risk.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Assigned: {risk.assignee}</span>
                          <span>•</span>
                          <span>Created: {risk.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    {risk.status === "open" && (
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolve(risk.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                        {(risk.severity === "critical" || risk.severity === "high") && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleEscalate(risk.id)}
                          >
                            Escalate
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredRisks.length === 0 && (
            <Card variant="elevated">
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No risks found</h3>
                <p className="text-muted-foreground">
                  {statusFilter === "open"
                    ? "Great job! There are no open risks matching your filters."
                    : "No risks match your current filters."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
