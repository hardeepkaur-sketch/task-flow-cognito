import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings2, GripVertical } from "lucide-react";

interface Widget {
  id: string;
  name: string;
  enabled: boolean;
}

interface CustomizeDashboardProps {
  widgets: Widget[];
  onToggleWidget: (id: string) => void;
  onReorderWidgets: (widgets: Widget[]) => void;
}

export const CustomizeDashboard = ({
  widgets,
  onToggleWidget,
  onReorderWidgets,
}: CustomizeDashboardProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const newWidgets = [...widgets];
    const draggedIndex = widgets.findIndex((w) => w.id === draggedItem);
    const targetIndex = widgets.findIndex((w) => w.id === targetId);

    const [removed] = newWidgets.splice(draggedIndex, 1);
    newWidgets.splice(targetIndex, 0, removed);

    onReorderWidgets(newWidgets);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Customize
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize Dashboard</SheetTitle>
          <SheetDescription>
            Toggle widgets on/off and drag to reorder them.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              draggable
              onDragStart={() => handleDragStart(widget.id)}
              onDragOver={(e) => handleDragOver(e, widget.id)}
              onDragEnd={handleDragEnd}
              className={`flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-move ${
                draggedItem === widget.id ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor={widget.id} className="cursor-pointer">
                  {widget.name}
                </Label>
              </div>
              <Switch
                id={widget.id}
                checked={widget.enabled}
                onCheckedChange={() => onToggleWidget(widget.id)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-secondary/50 border">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Drag widgets to change their order on the
            dashboard. Disabled widgets won't appear on your dashboard.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
