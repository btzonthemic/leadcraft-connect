import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface ChatMessage {
  role: string;
  content: string;
}

export function ChatInterface() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No active session");

      const newMessage = { role: "user", content: userInput };
      setConversation(prev => [...prev, newMessage]);

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
    <div className="space-y-4">
      <ScrollArea className="h-[400px] pr-4">
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
    </div>
  );
}