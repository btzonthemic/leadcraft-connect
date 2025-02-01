import { Progress } from "@/components/ui/progress";

interface TableHealthProps {
  health: number;
  lastAnalyzed: string;
}

export function TableHealthIndicator({ health, lastAnalyzed }: TableHealthProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Health</span>
        <span>{health}%</span>
      </div>
      <Progress value={health} className="h-2" />
      <p className="text-xs text-muted-foreground">
        Last analyzed: {new Date(lastAnalyzed).toLocaleString()}
      </p>
    </div>
  );
}