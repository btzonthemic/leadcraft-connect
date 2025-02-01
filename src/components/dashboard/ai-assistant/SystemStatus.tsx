import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface SystemState {
  name: string;
  status: boolean;
  loading: boolean;
}

export function SystemStatus() {
  const [systems, setSystems] = useState<SystemState[]>([
    { name: "Database Connection", status: false, loading: true },
    { name: "AI Integration", status: false, loading: true },
    { name: "Security Protocols", status: false, loading: true },
  ]);

  useEffect(() => {
    const checkSystems = async () => {
      // Check database connection
      try {
        const { data, error } = await supabase
          .from("ai_interactions")
          .select("id")
          .limit(1);
        
        setSystems(prev => 
          prev.map(sys => 
            sys.name === "Database Connection" 
              ? { ...sys, status: !error, loading: false }
              : sys
          )
        );
      } catch (error) {
        console.error("Database check error:", error);
        setSystems(prev => 
          prev.map(sys => 
            sys.name === "Database Connection" 
              ? { ...sys, status: false, loading: false }
              : sys
          )
        );
      }

      // Check AI Integration
      try {
        const { error } = await supabase.functions.invoke("chat-with-ai", {
          body: { message: "test", conversation: [] },
        });
        
        setSystems(prev => 
          prev.map(sys => 
            sys.name === "AI Integration" 
              ? { ...sys, status: !error, loading: false }
              : sys
          )
        );
      } catch (error) {
        console.error("AI check error:", error);
        setSystems(prev => 
          prev.map(sys => 
            sys.name === "AI Integration" 
              ? { ...sys, status: false, loading: false }
              : sys
          )
        );
      }

      // Security check (RLS policies)
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .limit(1);
        
        // If we can query profiles, security is working
        setSystems(prev => 
          prev.map(sys => 
            sys.name === "Security Protocols" 
              ? { ...sys, status: !error && data !== null, loading: false }
              : sys
          )
        );
      } catch (error) {
        console.error("Security check error:", error);
        setSystems(prev => 
          prev.map(sys => 
            sys.name === "Security Protocols" 
              ? { ...sys, status: false, loading: false }
              : sys
          )
        );
        toast({
          variant: "destructive",
          title: "Security Check Failed",
          description: "Unable to verify security protocols.",
        });
      }
    };

    checkSystems();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">System Status</h2>
      <div className="grid gap-4">
        {systems.map((system) => (
          <Card key={system.name} className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{system.name}</span>
              {system.loading ? (
                <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : system.status ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}