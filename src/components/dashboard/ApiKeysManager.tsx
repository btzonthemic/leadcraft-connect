import { useState, useEffect } from "react";
import ApiKeysStatus from "./ApiKeysStatus";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const ApiKeysManager = () => {
  const [apiKeys, setApiKeys] = useState({
    deepseek: false,
    gemini: false,
    openai: false,
    huggingface: false,
  });

  const checkApiKeys = async () => {
    try {
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
    } catch (error) {
      console.error("Error checking API keys:", error);
      toast({
        title: "Error",
        description: "Failed to check API keys status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkApiKeys();
  }, []);

  return <ApiKeysStatus apiKeys={apiKeys} />;
};