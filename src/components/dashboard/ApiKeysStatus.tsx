import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ApiKeyStatus {
  name: string;
  configured: boolean;
}

interface ApiKeysStatusProps {
  apiKeys: {
    deepseek: boolean;
    gemini: boolean;
    openai: boolean;
    huggingface: boolean;
  };
  onRefresh: () => void;
}

const ApiKeysStatus = ({ apiKeys, onRefresh }: ApiKeysStatusProps) => {
  const keys: ApiKeyStatus[] = [
    { name: "Deepseek API Key", configured: apiKeys.deepseek },
    { name: "Gemini API Key", configured: apiKeys.gemini },
    { name: "OpenAI API Key", configured: apiKeys.openai },
    { name: "Hugging Face API Key", configured: apiKeys.huggingface },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">API Keys Status</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          className="h-8 w-8"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4">
        {keys.map((key) => (
          <div key={key.name} className="flex items-center justify-between">
            <span className="text-sm md:text-base">{key.name}</span>
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  key.configured ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm md:text-base">
                {key.configured ? "Configured" : "Not Configured"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          onClick={() => {
            window.open(
              "https://supabase.com/dashboard/project/bcqmoponyxxzbxqsaqow/settings/functions",
              "_blank"
            );
          }}
          className="w-full md:w-auto"
        >
          Manage API Keys
        </Button>
      </div>
    </Card>
  );
};

export default ApiKeysStatus;