import { useEffect } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { AIMetrics } from "@/components/dashboard/AIMetrics";
import { ApiKeysManager } from "@/components/dashboard/ApiKeysManager";
import BlogPostSection from "@/components/dashboard/BlogPostSection";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        toast({
          title: "Authentication Error",
          description: "Please try logging in again",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      if (!session) {
        navigate('/auth');
        return;
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="grid gap-6">
          <AIMetrics />
          <ApiKeysManager />
          <BlogPostSection />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;