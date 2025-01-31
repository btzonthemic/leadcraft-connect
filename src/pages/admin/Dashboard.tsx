import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BlogPostEditor from "@/components/BlogPostEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState({
    deepseek: false,
    gemini: false,
    openai: false,
    huggingface: false
  });

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        navigate('/');
      }
    };

    checkAdmin();
    checkApiKeys();
  }, [navigate]);

  const checkApiKeys = async () => {
    try {
      const { data: { DEEPSEEK_API_KEY, GEMINI_API_KEY, OPENAI_API_KEY, HUGGINGFACE_API_KEY } } = 
        await supabase.functions.invoke('check-api-keys');
      
      setApiKeys({
        deepseek: !!DEEPSEEK_API_KEY,
        gemini: !!GEMINI_API_KEY,
        openai: !!OPENAI_API_KEY,
        huggingface: !!HUGGINGFACE_API_KEY
      });
    } catch (error) {
      console.error('Error checking API keys:', error);
      toast({
        title: "Error",
        description: "Failed to check API keys status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-8">
        {/* API Keys Status */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">API Keys Status</h2>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Deepseek API Key</span>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${apiKeys.deepseek ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{apiKeys.deepseek ? 'Configured' : 'Not Configured'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Gemini API Key</span>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${apiKeys.gemini ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{apiKeys.gemini ? 'Configured' : 'Not Configured'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>OpenAI API Key</span>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${apiKeys.openai ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{apiKeys.openai ? 'Configured' : 'Not Configured'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Hugging Face API Key</span>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${apiKeys.huggingface ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{apiKeys.huggingface ? 'Configured' : 'Not Configured'}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button
              onClick={() => {
                window.open('https://supabase.com/dashboard/project/bcqmoponyxxzbxqsaqow/settings/functions', '_blank');
              }}
            >
              Manage API Keys
            </Button>
          </div>
        </Card>

        {/* Blog Post Editor */}
        <div className="bg-white rounded-lg shadow-sm">
          <BlogPostEditor />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;