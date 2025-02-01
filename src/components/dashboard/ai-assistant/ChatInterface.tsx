import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Send, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setError(null);
    try {
      setIsLoading(true);
      const userMessage: Message = { role: "user", content: message };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");

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

      // Call AI endpoint
      const { data, error } = await supabase.functions.invoke("chat-with-ai", {
        body: { message, conversation: messages },
      });

      if (error) throw error;

      const aiMessage: Message = {
        role: "assistant",
        content: data.response,
      };

      // Log AI response
      await supabase.from("ai_interactions").insert([
        {
          interaction_type: "ai_response",
          content: data.response,
        },
      ]);

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setError(error.message || "Failed to send message");
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <ScrollArea className="flex-1 p-4 border rounded-lg mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              msg.role === "user" 
                ? "bg-primary/10 ml-auto max-w-[80%]" 
                : "bg-muted max-w-[80%]"
            }`}
          >
            <div className="text-xs text-muted-foreground mb-1">
              {msg.role === "user" ? "You" : "AI Assistant"}
            </div>
            <div className="whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}