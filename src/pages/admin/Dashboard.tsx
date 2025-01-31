import { AdminLayout } from "@/components/layouts/AdminLayout";
import ApiKeysStatus from "@/components/dashboard/ApiKeysStatus";
import BlogPostSection from "@/components/dashboard/BlogPostSection";
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

  useEffect(() => {
    checkApiKeys();
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="grid gap-6">
          <ApiKeysStatus apiKeys={apiKeys} />
          <BlogPostSection />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;