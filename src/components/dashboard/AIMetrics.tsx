import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const AIMetrics = () => {
  const [aiMetrics, setAiMetrics] = useState({
    totalInteractions: 0,
    lastInteraction: null as string | null,
  });

  const fetchAIMetrics = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching AI metrics:", error);
      toast({
        title: "Error",
        description: "Failed to fetch AI interaction metrics",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAIMetrics();
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-6 w-6" />
        <h2 className="text-xl font-semibold">AI Assistant Status</h2>
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