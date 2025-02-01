import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";

export function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      const userMessage = { role: "user", content: message };
      setMessages((prev) => [...prev, userMessage]);

      // Log the interaction
      const { error: logError } = await supabase
        .from("ai_interactions")
        .insert([
          {
            interaction_type: "user_message",
            content: message,
          },
        ]);

      if (logError) throw logError;

      // Call AI endpoint (to be implemented)
      const aiResponse = { role: "assistant", content: "This is a placeholder AI response." };
      setMessages((prev) => [...prev, aiResponse]);
      setMessage("");
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4 border rounded-lg mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              msg.role === "user" ? "bg-primary/10 ml-auto" : "bg-muted"
            } max-w-[80%]`}
          >
            {msg.content}
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}