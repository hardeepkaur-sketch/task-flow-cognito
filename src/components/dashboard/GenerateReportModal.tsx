import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Send, Download } from "lucide-react";
import { toast } from "sonner";

const projects = [
  { id: "proj-1", name: "Project Alpha" },
  { id: "proj-2", name: "Project Beta" },
  { id: "proj-3", name: "Project Gamma" },
];

const developers = [
  { id: "dev-1", name: "John Doe" },
  { id: "dev-2", name: "Sarah Miller" },
  { id: "dev-3", name: "Mike Roberts" },
  { id: "dev-4", name: "Anna Kim" },
  { id: "dev-5", name: "Tom Chen" },
];

interface GenerateReportModalProps {
  children: React.ReactNode;
}

export const GenerateReportModal = ({ children }: GenerateReportModalProps) => {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    developer: "",
    recipientEmail: "",
    includeJira: true,
    includeGithub: true,
    includeRisks: true,
    includeSummary: true,
  });

  const handleGenerate = async (action: "send" | "download") => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (action === "send") {
      toast.success(`Report sent to ${formData.recipientEmail}`);
    } else {
      toast.success("Report downloaded successfully");
    }

    setIsGenerating(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Generate Report
          </DialogTitle>
          <DialogDescription>
            Create a detailed report for a developer or project to share with
            stakeholders.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Project Selection */}
          <div className="space-y-2">
            <Label>Project</Label>
            <Select
              value={formData.project}
              onValueChange={(value) =>
                setFormData({ ...formData, project: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Developer Selection */}
          <div className="space-y-2">
            <Label>Developer (optional)</Label>
            <Select
              value={formData.developer}
              onValueChange={(value) =>
                setFormData({ ...formData, developer: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All developers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All developers</SelectItem>
                {developers.map((dev) => (
                  <SelectItem key={dev.id} value={dev.id}>
                    {dev.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Email */}
          <div className="space-y-2">
            <Label>Recipient Email</Label>
            <Input
              type="email"
              placeholder="manager@company.com"
              value={formData.recipientEmail}
              onChange={(e) =>
                setFormData({ ...formData, recipientEmail: e.target.value })
              }
            />
          </div>

          {/* Include Options */}
          <div className="space-y-3">
            <Label>Include in Report</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "includeJira", label: "Jira Tickets" },
                { key: "includeGithub", label: "GitHub Activity" },
                { key: "includeRisks", label: "Risk Analysis" },
                { key: "includeSummary", label: "AI Summary" },
              ].map((option) => (
                <div
                  key={option.key}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={option.key}
                    checked={formData[option.key as keyof typeof formData] as boolean}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, [option.key]: checked })
                    }
                  />
                  <Label htmlFor={option.key} className="text-sm font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleGenerate("download")}
            disabled={isGenerating || !formData.project}
          >
            {isGenerating ? (
              <div className="h-4 w-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            )}
          </Button>
          <Button
            className="flex-1"
            onClick={() => handleGenerate("send")}
            disabled={
              isGenerating || !formData.project || !formData.recipientEmail
            }
          >
            {isGenerating ? (
              <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Report
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
