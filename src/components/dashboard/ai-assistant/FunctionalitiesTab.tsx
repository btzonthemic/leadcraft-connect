import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Grid, 
  Settings, 
  MessageSquare, 
  Database, 
  Bot, 
  LineChart,
  Shield,
  Users,
  Megaphone,
  Brain,
  Code,
  GitBranch,
  Bug,
  Search,
  Mail,
  TrendingUp,
  BarChart,
  Zap,
  Target,
  Plus,
  Rocket,
  Wrench
} from "lucide-react";

interface Functionality {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "coming-soon" | "in-development";
  category: "core" | "management" | "marketing" | "chatbot" | "growth";
}

export function FunctionalitiesTab() {
  const { toast } = useToast();
  const functionalities: Functionality[] = [
    // Core System Features
    {
      title: "Database Management",
      description: "Autonomous CRUD operations and schema management with Supabase",
      icon: <Database className="h-6 w-6" />,
      status: "active",
      category: "core"
    },
    {
      title: "System Monitoring",
      description: "Real-time performance tracking and error detection",
      icon: <Shield className="h-6 w-6" />,
      status: "active",
      category: "core"
    },
    {
      title: "Chat Interface",
      description: "Real-time conversation with AI assistant using natural language",
      icon: <MessageSquare className="h-6 w-6" />,
      status: "active",
      category: "core"
    },
    {
      title: "Code Management",
      description: "Automated code optimization and deployment",
      icon: <Code className="h-6 w-6" />,
      status: "in-development",
      category: "core"
    },
    {
      title: "CI/CD Integration",
      description: "GitHub integration for automated deployments",
      icon: <GitBranch className="h-6 w-6" />,
      status: "coming-soon",
      category: "core"
    },
    {
      title: "Bug Detection",
      description: "Automated error detection and resolution",
      icon: <Bug className="h-6 w-6" />,
      status: "in-development",
      category: "core"
    },
    // Lead & Contractor Management
    {
      title: "Lead Distribution",
      description: "AI-powered lead matching and distribution system",
      icon: <Users className="h-6 w-6" />,
      status: "coming-soon",
      category: "management"
    },
    {
      title: "Revenue Analytics",
      description: "Track and optimize revenue streams with AI insights",
      icon: <LineChart className="h-6 w-6" />,
      status: "coming-soon",
      category: "management"
    },
    {
      title: "Contractor Engagement",
      description: "Analyze and optimize contractor activity and engagement",
      icon: <Target className="h-6 w-6" />,
      status: "in-development",
      category: "management"
    },
    {
      title: "Dynamic Pricing",
      description: "AI-driven pricing optimization for leads",
      icon: <TrendingUp className="h-6 w-6" />,
      status: "coming-soon",
      category: "management"
    },
    // Marketing & SEO
    {
      title: "Content Generation",
      description: "AI-powered SEO content and marketing material creation",
      icon: <Megaphone className="h-6 w-6" />,
      status: "in-development",
      category: "marketing"
    },
    {
      title: "SEO Optimization",
      description: "Automated keyword research and content optimization",
      icon: <Search className="h-6 w-6" />,
      status: "coming-soon",
      category: "marketing"
    },
    {
      title: "Email Automation",
      description: "Automated email campaigns and notifications",
      icon: <Mail className="h-6 w-6" />,
      status: "coming-soon",
      category: "marketing"
    },
    {
      title: "Performance Analytics",
      description: "Marketing campaign performance tracking and optimization",
      icon: <BarChart className="h-6 w-6" />,
      status: "in-development",
      category: "marketing"
    },
    // AI Chatbot
    {
      title: "Support Chatbot",
      description: "24/7 AI chatbot for homeowners and contractors",
      icon: <Bot className="h-6 w-6" />,
      status: "in-development",
      category: "chatbot"
    },
    {
      title: "Smart Responses",
      description: "Natural Language Understanding for complex queries",
      icon: <Brain className="h-6 w-6" />,
      status: "coming-soon",
      category: "chatbot"
    },
    // Business Growth
    {
      title: "Growth Analytics",
      description: "AI-driven business insights and growth recommendations",
      icon: <TrendingUp className="h-6 w-6" />,
      status: "coming-soon",
      category: "growth"
    },
    {
      title: "Performance Optimization",
      description: "System-wide performance monitoring and optimization",
      icon: <Zap className="h-6 w-6" />,
      status: "in-development",
      category: "growth"
    }
  ];

  const handleAction = async (functionality: Functionality, action: "create" | "enhance" | "fix") => {
    try {
      const { data, error } = await supabase.functions.invoke('handle-functionality', {
        body: { 
          functionality: functionality.title,
          action
        }
      });

      if (error) throw error;

      toast({
        title: "Action Started",
        description: `${action} operation started for ${functionality.title}`,
      });
    } catch (error: any) {
      console.error(`${action} error:`, error);
      toast({
        title: "Action Failed",
        description: error.message || `Failed to ${action} functionality`,
        variant: "destructive",
      });
    }
  };

  const getActionButtons = (functionality: Functionality) => {
    const buttons = [];
    
    if (functionality.status === "coming-soon") {
      buttons.push(
        <Button
          key="create"
          size="sm"
          onClick={() => handleAction(functionality, "create")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create
        </Button>
      );
    }
    
    if (functionality.status === "in-development" || functionality.status === "active") {
      buttons.push(
        <Button
          key="enhance"
          size="sm"
          variant="secondary"
          onClick={() => handleAction(functionality, "enhance")}
          className="flex items-center gap-2"
        >
          <Rocket className="h-4 w-4" />
          Enhance
        </Button>
      );
    }
    
    if (functionality.status === "active") {
      buttons.push(
        <Button
          key="fix"
          size="sm"
          variant="outline"
          onClick={() => handleAction(functionality, "fix")}
          className="flex items-center gap-2"
        >
          <Wrench className="h-4 w-4" />
          Fix Bugs
        </Button>
      );
    }
    
    return buttons;
  };

  const getStatusColor = (status: Functionality["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "coming-soon":
        return "bg-yellow-100 text-yellow-700";
      case "in-development":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const categories = ["core", "management", "marketing", "chatbot", "growth"] as const;

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categoryFunctions = functionalities.filter(f => f.category === category);
        if (categoryFunctions.length === 0) return null;

        return (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-bold capitalize">{category} Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryFunctions.map((func, index) => (
                <Card key={index} className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {func.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{func.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(func.status)}`}>
                        {func.status.split("-").map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(" ")}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{func.description}</p>
                  <div className="flex gap-2 mt-auto">
                    {getActionButtons(func)}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
