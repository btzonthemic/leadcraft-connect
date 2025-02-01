import { Card } from "@/components/ui/card";
import { Grid, Settings, MessageSquare } from "lucide-react";

interface Functionality {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "coming-soon";
}

export function FunctionalitiesTab() {
  const functionalities: Functionality[] = [
    {
      title: "Chat Interface",
      description: "Real-time conversation with AI assistant using natural language",
      icon: <MessageSquare className="h-6 w-6" />,
      status: "active",
    },
    {
      title: "System Management",
      description: "Monitor and manage AI system performance and health",
      icon: <Grid className="h-6 w-6" />,
      status: "active",
    },
    {
      title: "Advanced Settings",
      description: "Configure AI behavior, preferences, and security settings",
      icon: <Settings className="h-6 w-6" />,
      status: "active",
    },
  ];

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">Available Functionalities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {functionalities.map((func, index) => (
          <Card key={index} className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {func.icon}
              </div>
              <div>
                <h3 className="font-semibold">{func.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  func.status === "active" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {func.status === "active" ? "Active" : "Coming Soon"}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{func.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}