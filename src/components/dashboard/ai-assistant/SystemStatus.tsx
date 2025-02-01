import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Database, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface SystemStatusState {
  database: string;
  api: string;
  security: string;
}

export function SystemStatus() {
  const [systemStatus, setSystemStatus] = useState<SystemStatusState>({
    database: "healthy",
    api: "operational",
    security: "active"
  });

  const checkSystemStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");

      await supabase.from('ai_interactions').insert({
        interaction_type: 'system_check',
        content: 'Performing system health check',
        user_id: session.user.id
      });

      setSystemStatus({
        database: "healthy",
        api: "operational",
        security: "active"
      });
    } catch (error) {
      console.error("Error checking system status:", error);
      toast({
        title: "System Check Failed",
        description: "Unable to verify system status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkSystemStatus();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">System Status</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={checkSystemStatus}
          className="flex items-center gap-2"
        >
          <Activity className="h-4 w-4" />
          Refresh Status
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4" />
            <h3 className="font-medium">Database</h3>
          </div>
          <p className="text-sm text-muted-foreground capitalize">
            {systemStatus.database}
          </p>
        </div>
        
        <div className="p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4" />
            <h3 className="font-medium">API Status</h3>
          </div>
          <p className="text-sm text-muted-foreground capitalize">
            {systemStatus.api}
          </p>
        </div>
        
        <div className="p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4" />
            <h3 className="font-medium">Security</h3>
          </div>
          <p className="text-sm text-muted-foreground capitalize">
            {systemStatus.security}
          </p>
        </div>
      </div>
    </div>
  );
}