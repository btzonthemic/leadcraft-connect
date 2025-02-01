import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Table, ArrowUpDown, AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TableInfo {
  name: string;
  rowCount: number;
  lastAnalyzed: string;
  status: 'healthy' | 'warning' | 'error';
}

export function DatabaseManager() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTableInfo();
  }, []);

  const fetchTableInfo = async () => {
    try {
      // Fetch counts for each table
      const [aiInteractionsCount, profilesCount] = await Promise.all([
        supabase.from('ai_interactions').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
      ]);

      setTables([
        {
          name: 'ai_interactions',
          rowCount: aiInteractionsCount.count || 0,
          lastAnalyzed: new Date().toISOString(),
          status: 'healthy'
        },
        {
          name: 'profiles',
          rowCount: profilesCount.count || 0,
          lastAnalyzed: new Date().toISOString(),
          status: 'healthy'
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
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {tables.map((table) => (
          <Card key={table.name} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Table className="h-4 w-4" />
                  <h3 className="font-medium">{table.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {table.rowCount.toLocaleString()} rows
                </p>
                <p className="text-xs text-muted-foreground">
                  Last analyzed: {new Date(table.lastAnalyzed).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(table.status)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}