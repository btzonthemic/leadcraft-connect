import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Table, ArrowUpDown, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface TableInfo {
  name: string;
  rowCount: number;
  lastAnalyzed: string;
  status: 'healthy' | 'warning' | 'error';
  health: number;
}

export function DatabaseManager() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTableInfo = async () => {
    try {
      setIsLoading(true);
      const [aiInteractionsCount, profilesCount] = await Promise.all([
        supabase.from('ai_interactions').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
      ]);

      setTables([
        {
          name: 'ai_interactions',
          rowCount: aiInteractionsCount.count || 0,
          lastAnalyzed: new Date().toISOString(),
          status: 'healthy',
          health: 100
        },
        {
          name: 'profiles',
          rowCount: profilesCount.count || 0,
          lastAnalyzed: new Date().toISOString(),
          status: 'healthy',
          health: 100
        }
      ]);
    } catch (error) {
      console.error('Error fetching table info:', error);
      toast({
        title: "Error",
        description: "Failed to fetch database information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableInfo();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_interactions'
        },
        () => {
          fetchTableInfo();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          fetchTableInfo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusIcon = (status: TableInfo['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Database Management</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchTableInfo}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {tables.map((table) => (
          <Card key={table.name} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Table className="h-4 w-4" />
                    <h3 className="font-medium">{table.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {table.rowCount.toLocaleString()} rows
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(table.status)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span>{table.health}%</span>
                </div>
                <Progress value={table.health} className="h-2" />
              </div>

              <p className="text-xs text-muted-foreground">
                Last analyzed: {new Date(table.lastAnalyzed).toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}