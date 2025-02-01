import { AdminLayout } from "@/components/layouts/AdminLayout";
import { AIAssistantDashboard } from "@/components/dashboard/AIAssistantDashboard";

const AIAssistant = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">AI Assistant</h1>
        </div>
        <AIAssistantDashboard />
      </div>
    </AdminLayout>
  );
};

export default AIAssistant;