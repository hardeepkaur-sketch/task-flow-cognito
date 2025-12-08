import { useState, useRef } from "react";
import { Header } from "@/components/dashboard/Header";
import { AggregateCard } from "@/components/dashboard/AggregateCard";
import { WorkSnapshotWidget } from "@/components/dashboard/WorkSnapshotWidget";
import { WorkloadWidget } from "@/components/dashboard/WorkloadWidget";
import { RecentActivityWidget } from "@/components/dashboard/RecentActivityWidget";
import { RiskDetectionWidget } from "@/components/dashboard/RiskDetectionWidget";
import { AISummaryWidget } from "@/components/dashboard/AISummaryWidget";
import { TeamOverviewWidget } from "@/components/dashboard/TeamOverviewWidget";
import { AIAssistant } from "@/components/dashboard/AIAssistant";
import { GenerateReportModal } from "@/components/dashboard/GenerateReportModal";
import { CustomizeDashboard } from "@/components/dashboard/CustomizeDashboard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TicketIcon,
  GitBranch,
  AlertTriangle,
  AlertCircle,
  FileText,
  TrendingUp,
  FileDown,
  Filter,
} from "lucide-react";

const projects = [
  { id: "all", name: "All Projects" },
  { id: "proj-1", name: "Project Alpha" },
  { id: "proj-2", name: "Project Beta" },
  { id: "proj-3", name: "Project Gamma" },
];

const initialWidgets = [
  { id: "aggregates", name: "Aggregate Cards", enabled: true },
  { id: "workSnapshot", name: "Work Snapshot", enabled: true },
  { id: "workload", name: "Workload & Sprint", enabled: true },
  { id: "activity", name: "Recent Activity", enabled: true },
  { id: "risks", name: "Risk Detection", enabled: true },
  { id: "aiSummary", name: "AI Summary", enabled: true },
  { id: "team", name: "Team Overview", enabled: true },
];

export default function Dashboard() {
  const [isMyDashboard, setIsMyDashboard] = useState(false);
  const [selectedProject, setSelectedProject] = useState("all");
  const [widgets, setWidgets] = useState(initialWidgets);

  // Refs for scroll navigation
  const aggregatesRef = useRef<HTMLDivElement>(null);
  const workSnapshotRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);

  const scrollToWidget = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleToggleWidget = (id: string) => {
    setWidgets(
      widgets.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  const handleReorderWidgets = (newWidgets: typeof widgets) => {
    setWidgets(newWidgets);
  };

  const isWidgetEnabled = (id: string) =>
    widgets.find((w) => w.id === id)?.enabled ?? true;

  // Team vs My Dashboard data
  const aggregateData = isMyDashboard
    ? {
        jira: { total: 8, subtitle: "To Do: 2 • In Progress: 4 • Done: 2", trend: 12 },
        commits: { total: 24, subtitle: "Open PRs: 2 • Merged: 5", trend: 8 },
        inactive: { total: 1, subtitle: ">24hrs no activity", trend: -50 },
        incidents: { total: 2, subtitle: "0 critical • 2 high", trend: -25 },
        changes: { total: 2, subtitle: "pending requests", trend: 0 },
        velocity: { total: "12 SP", subtitle: "vs 10 last sprint", trend: 20 },
      }
    : {
        jira: { total: 42, subtitle: "To Do: 12 • In Progress: 18 • Done: 12", trend: 8 },
        commits: { total: 156, subtitle: "Open PRs: 8 • Merged: 23", trend: 15 },
        inactive: { total: 3, subtitle: ">24hrs no activity", trend: 50 },
        incidents: { total: 8, subtitle: "2 critical • 6 high", trend: -12 },
        changes: { total: 5, subtitle: "pending requests", trend: 25 },
        velocity: { total: "48 SP", subtitle: "vs 46 last sprint", trend: 4 },
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header isMyDashboard={isMyDashboard} onToggleDashboard={setIsMyDashboard} />

      <main className="container py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isMyDashboard ? "My Dashboard" : "Team Insights"}
            </h1>
            <p className="text-muted-foreground">
              {isMyDashboard
                ? "Track your personal productivity and tasks"
                : "Monitor team performance and identify risks"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Project Filter */}
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Generate Report */}
            <GenerateReportModal>
              <Button variant="outline" className="gap-2">
                <FileDown className="h-4 w-4" />
                Generate Report
              </Button>
            </GenerateReportModal>

            {/* Customize Dashboard */}
            <CustomizeDashboard
              widgets={widgets}
              onToggleWidget={handleToggleWidget}
              onReorderWidgets={handleReorderWidgets}
            />
          </div>
        </div>

        {/* Aggregate Cards */}
        {isWidgetEnabled("aggregates") && (
          <div ref={aggregatesRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <AggregateCard
              title={isMyDashboard ? "My Jira Tickets" : "Total Jira Tickets"}
              value={aggregateData.jira.total}
              subtitle={aggregateData.jira.subtitle}
              trend={{ value: aggregateData.jira.trend, label: "vs last sprint" }}
              icon={<TicketIcon className="h-5 w-5" />}
              color="primary"
              onClick={() => scrollToWidget(workSnapshotRef)}
            />
            <AggregateCard
              title={isMyDashboard ? "My Commits & PRs" : "Commits & PRs"}
              value={aggregateData.commits.total}
              subtitle={aggregateData.commits.subtitle}
              trend={{ value: aggregateData.commits.trend, label: "vs last sprint" }}
              icon={<GitBranch className="h-5 w-5" />}
              color="info"
              onClick={() => scrollToWidget(workSnapshotRef)}
            />
            <AggregateCard
              title="High Priority Inactive"
              value={aggregateData.inactive.total}
              subtitle={aggregateData.inactive.subtitle}
              trend={{ value: aggregateData.inactive.trend, label: "vs last sprint" }}
              icon={<AlertTriangle className="h-5 w-5" />}
              color="warning"
              onClick={() => scrollToWidget(riskRef)}
            />
            <AggregateCard
              title={isMyDashboard ? "My Incidents" : "Total Incidents"}
              value={aggregateData.incidents.total}
              subtitle={aggregateData.incidents.subtitle}
              trend={{ value: aggregateData.incidents.trend, label: "vs last sprint" }}
              icon={<AlertCircle className="h-5 w-5" />}
              color="destructive"
              onClick={() => scrollToWidget(riskRef)}
            />
            <AggregateCard
              title="Change Requests"
              value={aggregateData.changes.total}
              subtitle={aggregateData.changes.subtitle}
              trend={{ value: aggregateData.changes.trend, label: "vs last sprint" }}
              icon={<FileText className="h-5 w-5" />}
              color="info"
            />
            <AggregateCard
              title={isMyDashboard ? "My Velocity" : "Team Velocity"}
              value={aggregateData.velocity.total}
              subtitle={aggregateData.velocity.subtitle}
              trend={{ value: aggregateData.velocity.trend, label: "vs last sprint" }}
              icon={<TrendingUp className="h-5 w-5" />}
              color="success"
            />
          </div>
        )}

        {/* Work Snapshot */}
        {isWidgetEnabled("workSnapshot") && (
          <div ref={workSnapshotRef}>
            <WorkSnapshotWidget />
          </div>
        )}

        {/* Workload & Sprint Progress */}
        {isWidgetEnabled("workload") && <WorkloadWidget />}

        {/* Three Column Layout */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Recent Activity */}
          {isWidgetEnabled("activity") && <RecentActivityWidget />}

          {/* Risk Detection */}
          {isWidgetEnabled("risks") && (
            <div ref={riskRef}>
              <RiskDetectionWidget />
            </div>
          )}

          {/* AI Summary */}
          {isWidgetEnabled("aiSummary") && <AISummaryWidget />}
        </div>

        {/* Team Overview */}
        {isWidgetEnabled("team") && !isMyDashboard && (
          <div className="grid gap-4 lg:grid-cols-2">
            <TeamOverviewWidget />
            <div className="hidden lg:block" /> {/* Placeholder for balance */}
          </div>
        )}
      </main>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
