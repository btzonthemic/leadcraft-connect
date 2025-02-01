import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Code,
  FileCode,
  GitBranch,
  RefreshCw,
  Check,
  AlertTriangle,
  AlertOctagon,
  Info,
  Shield,
  Package,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

interface CodeAnalysis {
  type: string;
  message: string;
  severity: "info" | "warning" | "error";
  file?: string;
  line?: number;
}

export function CodeManagement() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis[]>([]);
  const { toast } = useToast();

  const analyzeCode = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { action: 'analyze' }
      });

      if (error) throw error;

      setCodeAnalysis(data.analysis || []);
      toast({
        title: "Code Analysis Complete",
        description: "Review the results below",
      });
    } catch (error: any) {
      console.error("Code analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze code",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: CodeAnalysis["severity"]) => {
    switch (severity) {
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getSeverityIcon = (severity: CodeAnalysis["severity"]) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Check className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Code Management</h2>
        <Button
          onClick={analyzeCode}
          disabled={isAnalyzing}
          className="flex items-center gap-2"
        >
          {isAnalyzing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Code className="h-4 w-4" />
          )}
          {isAnalyzing ? "Analyzing..." : "Analyze Code"}
        </Button>
      </div>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="mt-4">
          <div className="grid gap-4">
            {codeAnalysis.length > 0 ? (
              codeAnalysis.map((analysis, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(analysis.severity)}
                    <div className="flex-1">
                      <p className={`font-medium ${getSeverityColor(analysis.severity)}`}>
                        {analysis.type}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {analysis.message}
                      </p>
                      {analysis.file && (
                        <p className="text-xs text-muted-foreground mt-2">
                          File: {analysis.file}
                          {analysis.line && ` (Line: ${analysis.line})`}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                {isAnalyzing ? (
                  "Analyzing your code..."
                ) : (
                  "Click 'Analyze Code' to start code analysis"
                )}
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="mt-4">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Code optimization features coming soon
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
