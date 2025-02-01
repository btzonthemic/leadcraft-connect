import { useState, useEffect } from "react";
import ApiKeysStatus from "./ApiKeysStatus";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ApiKeysManager = () => {
  const [apiKeys, setApiKeys] = useState({
    deepseek: false,
    gemini: false,
    openai: false,
    huggingface: false,
  });
  const { toast } = useToast();

  const checkApiKeys = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No active session");
      }

      const { data, error } = await supabase.functions.invoke("check-api-keys", {
        body: {},
      });

      if (error) {
        throw error;
      }

      if (data) {
        setApiKeys({
          deepseek: !!data.DEEPSEEK_API_KEY,
          gemini: !!data.GEMINI_API_KEY,
          openai: !!data.OPENAI_API_KEY,
          huggingface: !!data.HUGGINGFACE_API_KEY,
        });
      }
    } catch (error: any) {
      console.error("Error checking API keys:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to check API keys status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkApiKeys();
  }, []);

  return <ApiKeysStatus apiKeys={apiKeys} onRefresh={checkApiKeys} />;
};