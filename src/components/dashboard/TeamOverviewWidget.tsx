import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, ChevronRight, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Engineering Manager",
    status: "online",
    tasksCompleted: 12,
    totalTasks: 15,
    avatar: "JD",
    color: "from-primary to-info",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Senior Developer",
    status: "online",
    tasksCompleted: 8,
    totalTasks: 10,
    avatar: "SM",
    color: "from-info to-primary",
  },
  {
    id: 3,
    name: "Mike Roberts",
    role: "Developer",
    status: "away",
    tasksCompleted: 5,
    totalTasks: 8,
    avatar: "MR",
    color: "from-success to-info",
  },
  {
    id: 4,
    name: "Anna Kim",
    role: "Developer",
    status: "online",
    tasksCompleted: 7,
    totalTasks: 9,
    avatar: "AK",
    color: "from-warning to-primary",
  },
  {
    id: 5,
    name: "Tom Chen",
    role: "Junior Developer",
    status: "offline",
    tasksCompleted: 4,
    totalTasks: 6,
    avatar: "TC",
    color: "from-purple-500 to-info",
  },
];

const statusColors = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
};

export const TeamOverviewWidget = () => {
  const navigate = useNavigate();

  return (
    <Card variant="elevated">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Team Overview
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => {
            const progress = (member.tasksCompleted / member.totalTasks) * 100;

            return (
              <div
                key={member.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
              >
                {/* Avatar */}
                <div className="relative">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-sm font-semibold text-white`}
                  >
                    {member.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                      statusColors[member.status as keyof typeof statusColors]
                    }`}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {member.name}
                    </h4>
                    <Badge variant="muted" className="text-[10px] shrink-0">
                      {member.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Progress value={progress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground shrink-0">
                      {member.tasksCompleted}/{member.totalTasks}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-around pt-4 mt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Circle className="h-2 w-2 fill-success text-success" />
              <span className="text-lg font-bold">3</span>
            </div>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Circle className="h-2 w-2 fill-warning text-warning" />
              <span className="text-lg font-bold">1</span>
            </div>
            <span className="text-xs text-muted-foreground">Away</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Circle className="h-2 w-2 fill-muted-foreground text-muted-foreground" />
              <span className="text-lg font-bold">1</span>
            </div>
            <span className="text-xs text-muted-foreground">Offline</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
