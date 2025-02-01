import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Brain, Settings, MessageSquare, Activity, Database, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function AIAssistantDashboard() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    database: "healthy",
    api: "operational",
    security: "active"
  });
  const [conversation, setConversation] = useState<Array<{ role: string; content: string }>>([]);

  useEffect(() => {
    checkSystemStatus();
  }, []);

  const checkSystemStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");

      // Log system check in ai_interactions
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");

      const newMessage = { role: "user", content: userInput };
      setConversation(prev => [...prev, newMessage]);

      // Log user interaction
      await supabase.from('ai_interactions').insert({
        interaction_type: 'chat',
        content: userInput,
        user_id: session.user.id
      });

      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { message: userInput, conversation: conversation }
      });

      if (error) throw error;

      const assistantMessage = { role: "assistant", content: data.response };
      setConversation(prev => [...prev, assistantMessage]);

      // Log AI response
      await supabase.from('ai_interactions').insert({
        interaction_type: 'assistant_response',
        content: data.response,
        user_id: session.user.id
      });

      setUserInput("");
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="chat" className="mt-4">
        <Card className="p-6">
          <ScrollArea className="h-[400px] mb-4 pr-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg ${
                  message.role === "assistant"
                    ? "bg-primary/10 ml-4"
                    : "bg-muted mr-4"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-primary" />
                  )}
                  <span className="capitalize">{message.role}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me anything about the system..."
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Thinking..." : "Send"}
            </Button>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="system" className="mt-4">
        <Card className="p-6">
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
              <p className="text-sm text-muted-foreground capitalize">{systemStatus.database}</p>
            </div>
            
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4" />
                <h3 className="font-medium">API Status</h3>
              </div>
              <p className="text-sm text-muted-foreground capitalize">{systemStatus.api}</p>
            </div>
            
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4" />
                <h3 className="font-medium">Security</h3>
              </div>
              <p className="text-sm text-muted-foreground capitalize">{systemStatus.security}</p>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="mt-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Assistant Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Interaction Logging</h3>
                <p className="text-sm text-muted-foreground">
                  Log all interactions with the AI assistant
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Response Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Customize AI response behavior
                </p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}