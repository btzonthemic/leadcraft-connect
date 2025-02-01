import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Database, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TableCard } from "./TableCard";

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

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ai_interactions' },
        () => fetchTableInfo()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => fetchTableInfo()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
          <TableCard key={table.name} table={table} />
        ))}
      </div>
    </div>
  );
}