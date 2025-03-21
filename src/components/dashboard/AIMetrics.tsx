import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Bot, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export const AIMetrics = () => {
  const [aiMetrics, setAiMetrics] = useState({
    totalInteractions: 0,
    lastInteraction: null as string | null,
  });
  const { toast } = useToast();

  const fetchAIMetrics = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No active session");
      }

      const { count: totalCount, error: countError } = await supabase
        .from('ai_interactions')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      const { data: latestData, error: latestError } = await supabase
        .from('ai_interactions')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1);

      if (latestError) throw latestError;

      setAiMetrics({
        totalInteractions: totalCount || 0,
        lastInteraction: latestData?.[0]?.created_at || null,
      });
    } catch (error: any) {
      console.error("Error fetching AI metrics:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch AI interaction metrics",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAIMetrics();
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <h2 className="text-xl font-semibold">AI Assistant Status</h2>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={fetchAIMetrics}
          className="h-8 w-8"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Interactions</p>
          <p className="text-2xl font-bold">{aiMetrics.totalInteractions}</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">Last Interaction</p>
          <p className="text-2xl font-bold">
            {aiMetrics.lastInteraction 
              ? new Date(aiMetrics.lastInteraction).toLocaleDateString()
              : 'Never'}
          </p>
        </div>
      </div>
    </Card>
  );
};