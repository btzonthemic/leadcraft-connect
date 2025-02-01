import { Card } from "@/components/ui/card";
import { Table, CheckCircle, AlertTriangle } from "lucide-react";
import { TableHealthIndicator } from "./TableHealthIndicator";

interface TableInfo {
  name: string;
  rowCount: number;
  lastAnalyzed: string;
  status: 'healthy' | 'warning' | 'error';
  health: number;
}

interface TableCardProps {
  table: TableInfo;
}

export function TableCard({ table }: TableCardProps) {
  const getStatusIcon = (status: TableInfo['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
      case 'error':
        return <AlertTriangle className={`h-5 w-5 ${status === 'warning' ? 'text-yellow-500' : 'text-red-500'}`} />;
    }
  };

  return (
    <Card className="p-4">
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
        
        <TableHealthIndicator 
          health={table.health} 
          lastAnalyzed={table.lastAnalyzed} 
        />
      </div>
    </Card>
  );
}