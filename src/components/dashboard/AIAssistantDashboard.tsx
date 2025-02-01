import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Brain, Settings, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function AIAssistantDashboard() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{ role: string; content: string }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      setIsLoading(true);
      const newMessage = { role: "user", content: userInput };
      setConversation(prev => [...prev, newMessage]);

      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { message: userInput, conversation: conversation }
      });

      if (error) throw error;

      const assistantMessage = { role: "assistant", content: data.response };
      setConversation(prev => [...prev, assistantMessage]);
      setUserInput("");
    } catch (error) {
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
          <h2 className="text-xl font-semibold mb-4">System Management</h2>
          <p>System management features coming soon...</p>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="mt-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Assistant Settings</h2>
          <p>Settings panel coming soon...</p>
        </Card>
      </TabsContent>
    </Tabs>
  );
}