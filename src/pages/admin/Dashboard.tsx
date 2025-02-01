import { AdminLayout } from "@/components/layouts/AdminLayout";
import ApiKeysStatus from "@/components/dashboard/ApiKeysStatus";
import BlogPostSection from "@/components/dashboard/BlogPostSection";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [apiKeys, setApiKeys] = useState({
    deepseek: false,
    gemini: false,
    openai: false,
    huggingface: false,
  });

  const [aiMetrics, setAiMetrics] = useState({
    totalInteractions: 0,
    lastInteraction: null,
  });

  useEffect(() => {
    checkApiKeys();
    fetchAIMetrics();
  }, []);

  const checkApiKeys = async () => {
    try {
      const {
        data: { DEEPSEEK_API_KEY, GEMINI_API_KEY, OPENAI_API_KEY, HUGGINGFACE_API_KEY },
      } = await supabase.functions.invoke("check-api-keys");

      setApiKeys({
        deepseek: !!DEEPSEEK_API_KEY,
        gemini: !!GEMINI_API_KEY,
        openai: !!OPENAI_API_KEY,
        huggingface: !!HUGGINGFACE_API_KEY,
      });
    } catch (error) {
      console.error("Error checking API keys:", error);
      toast({
        title: "Error",
        description: "Failed to check API keys status",
        variant: "destructive",
      });
    }
  };

  const fetchAIMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_interactions')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      setAiMetrics({
        totalInteractions: data?.length || 0,
        lastInteraction: data?.[0]?.created_at || null,
      });
    } catch (error) {
      console.error("Error fetching AI metrics:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="grid gap-6">
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
          <ApiKeysStatus apiKeys={apiKeys} />
          <BlogPostSection />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;