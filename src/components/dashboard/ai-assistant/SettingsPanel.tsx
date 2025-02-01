import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function SettingsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="debug-mode">Debug Mode</Label>
            <Switch id="debug-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch id="notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-save">Auto Save</Label>
            <Switch id="auto-save" />
          </div>
        </div>
      </Card>
    </div>
  );
}