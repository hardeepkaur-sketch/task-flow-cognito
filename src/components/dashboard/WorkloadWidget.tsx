import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, Target } from "lucide-react";

const teamMembers = [
  { name: "John Doe", role: "Lead", tasks: 8, capacity: 10, color: "bg-primary" },
  { name: "Sarah Miller", role: "Senior Dev", tasks: 7, capacity: 8, color: "bg-info" },
  { name: "Mike Roberts", role: "Dev", tasks: 5, capacity: 8, color: "bg-success" },
  { name: "Anna Kim", role: "Dev", tasks: 9, capacity: 8, color: "bg-warning" },
  { name: "Tom Chen", role: "Junior", tasks: 4, capacity: 6, color: "bg-purple-500" },
];

const sprintData = {
  name: "Sprint 24",
  completed: 48,
  total: 62,
  daysLeft: 5,
  velocity: {
    current: 48,
    previous: 46,
  },
};

export const WorkloadWidget = () => {
  const progress = (sprintData.completed / sprintData.total) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Workload Distribution */}
      <Card variant="elevated">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-5 w-5 text-primary" />
            Workload Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => {
            const utilization = (member.tasks / member.capacity) * 100;
            const isOverloaded = utilization > 100;

            return (
              <div key={member.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded-full ${member.color} flex items-center justify-center text-[10px] font-semibold text-white`}
                    >
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm font-medium">{member.name}</span>
                    <Badge variant="muted" className="text-[10px]">
                      {member.role}
                    </Badge>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isOverloaded ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {member.tasks}/{member.capacity}
                  </span>
                </div>
                <Progress
                  value={Math.min(utilization, 100)}
                  className={`h-2 ${isOverloaded ? "[&>div]:bg-destructive" : ""}`}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Sprint Progress */}
      <Card variant="elevated">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-5 w-5 text-primary" />
            Sprint Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{sprintData.name}</span>
              <Badge variant="info">{sprintData.daysLeft} days left</Badge>
            </div>
            <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-info rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {sprintData.completed} SP completed
              </span>
              <span className="font-medium">{sprintData.total} SP total</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center p-3 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-primary">
                {sprintData.velocity.current}
              </p>
              <p className="text-xs text-muted-foreground">Current Velocity</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold">{sprintData.velocity.previous}</p>
              <p className="text-xs text-muted-foreground">Last Sprint</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-success font-medium">On Track</span>
            <span className="text-muted-foreground">
              - {Math.round(progress)}% complete
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
