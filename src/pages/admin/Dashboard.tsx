import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import ApiKeysStatus from "@/components/dashboard/ApiKeysStatus";
import BlogPostSection from "@/components/dashboard/BlogPostSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState({
    deepseek: false,
    gemini: false,
    openai: false,
    huggingface: false,
  });

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        navigate("/");
      }
    };

    checkAdmin();
    checkApiKeys();
  }, [navigate]);

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
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
          <ApiKeysStatus apiKeys={apiKeys} />
          <BlogPostSection />
        </div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;