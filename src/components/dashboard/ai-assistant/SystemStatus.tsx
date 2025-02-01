import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export function SystemStatus() {
  const systems = [
    { name: "Database Connection", status: true },
    { name: "API Integration", status: true },
    { name: "Security Protocols", status: true },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">System Status</h2>
      <div className="grid gap-4">
        {systems.map((system) => (
          <Card key={system.name} className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{system.name}</span>
              {system.status ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}