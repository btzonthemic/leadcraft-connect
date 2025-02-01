import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SettingsPanel() {
  return (
    <div className="space-y-4">
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
    </div>
  );
}