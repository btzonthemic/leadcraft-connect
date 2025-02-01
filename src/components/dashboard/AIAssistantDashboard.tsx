import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Settings, MessageSquare, Grid, Code } from "lucide-react";
import { ChatInterface } from "./ai-assistant/ChatInterface";
import { SystemStatus } from "./ai-assistant/SystemStatus";
import { SettingsPanel } from "./ai-assistant/SettingsPanel";
import { FunctionalitiesTab } from "./ai-assistant/FunctionalitiesTab";
import { CodeManagement } from "./ai-assistant/code/CodeManagement";

export function AIAssistantDashboard() {
  return (
    <Tabs defaultValue="chat" className="w-full">
      <TabsList>
        <TabsTrigger value="chat" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Chat
        </TabsTrigger>
        <TabsTrigger value="system" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          System Management
        </TabsTrigger>
        <TabsTrigger value="code" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          Code Management
        </TabsTrigger>
        <TabsTrigger value="functionalities" className="flex items-center gap-2">
          <Grid className="h-4 w-4" />
          Functionalities
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chat" className="mt-4">
        <Card className="p-6">
          <ChatInterface />
        </Card>
      </TabsContent>

      <TabsContent value="system" className="mt-4">
        <Card className="p-6">
          <SystemStatus />
        </Card>
      </TabsContent>

      <TabsContent value="code" className="mt-4">
        <Card className="p-6">
          <CodeManagement />
        </Card>
      </TabsContent>

      <TabsContent value="functionalities" className="mt-4">
        <Card className="p-6">
          <FunctionalitiesTab />
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="mt-4">
        <Card className="p-6">
          <SettingsPanel />
        </Card>
      </TabsContent>
    </Tabs>
  );
}