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
  Wrench,
  AlertTriangle,
  AlertOctagon,
  Info,
  Shield,
  Package,
  Users,
  Rocket,
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

interface OptimizationResult {
  type: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  progress: number;
}

export function CodeManagement() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis[]>([]);
  const [optimizations, setOptimizations] = useState<OptimizationResult[]>([]);
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

  const optimizeCode = async () => {
    setIsOptimizing(true);
    try {
      const { data, error } = await supabase.functions.invoke('optimize-code', {
        body: { action: 'optimize' }
      });

      if (error) throw error;

      setOptimizations(data.optimizations || []);
      toast({
        title: "Code Optimization Started",
        description: "Optimization tasks are now running",
      });
    } catch (error: any) {
      console.error("Code optimization error:", error);
      toast({
        title: "Optimization Failed",
        description: error.message || "Failed to start optimization",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const fixIssue = async (analysis: CodeAnalysis) => {
    try {
      const { data, error } = await supabase.functions.invoke('fix-code-issue', {
        body: { 
          type: analysis.type,
          file: analysis.file,
          line: analysis.line
        }
      });

      if (error) throw error;

      toast({
        title: "Issue Fixed",
        description: `Successfully fixed ${analysis.type} issue`,
      });

      // Refresh analysis
      analyzeCode();
    } catch (error: any) {
      console.error("Fix issue error:", error);
      toast({
        title: "Fix Failed",
        description: error.message || "Failed to fix the issue",
        variant: "destructive",
      });
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
        return <AlertOctagon className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Code Management</h2>
        <div className="flex gap-2">
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
          <Button
            onClick={optimizeCode}
            disabled={isOptimizing}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {isOptimizing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Rocket className="h-4 w-4" />
            )}
            {isOptimizing ? "Optimizing..." : "Optimize Code"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
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
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${getSeverityColor(analysis.severity)}`}>
                          {analysis.type}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => fixIssue(analysis)}
                          className="flex items-center gap-2"
                        >
                          <Wrench className="h-4 w-4" />
                          Fix It
                        </Button>
                      </div>
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
          <div className="grid gap-4">
            {optimizations.length > 0 ? (
              optimizations.map((optimization, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{optimization.type}</h3>
                      <span className="text-sm text-muted-foreground capitalize">
                        {optimization.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {optimization.description}
                    </p>
                    <Progress value={optimization.progress} className="h-2" />
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                {isOptimizing ? (
                  "Running code optimizations..."
                ) : (
                  "Click 'Optimize Code' to start code optimization"
                )}
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}