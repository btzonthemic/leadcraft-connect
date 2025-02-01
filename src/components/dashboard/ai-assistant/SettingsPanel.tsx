import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    debugMode: false,
    notifications: true,
    autoSave: true,
  });
  const { toast } = useToast();

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      // Show toast notification
      toast({
        title: "Setting Updated",
        description: `${setting} has been ${newSettings[setting] ? "enabled" : "disabled"}`,
      });
      
      return newSettings;
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Card className="p-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="debug-mode">Debug Mode</Label>
              <div className="text-sm text-muted-foreground">
                Enable detailed logging for troubleshooting
              </div>
            </div>
            <Switch
              id="debug-mode"
              checked={settings.debugMode}
              onCheckedChange={() => handleSettingChange("debugMode")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive alerts for important events
              </div>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={() => handleSettingChange("notifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-save">Auto Save</Label>
              <div className="text-sm text-muted-foreground">
                Automatically save chat history
              </div>
            </div>
            <Switch
              id="auto-save"
              checked={settings.autoSave}
              onCheckedChange={() => handleSettingChange("autoSave")}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}