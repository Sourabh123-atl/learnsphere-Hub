import { Settings, Bell, Shield, Palette, Globe, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const AdminSettings = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">System Settings</h1>
      <p className="text-muted-foreground">Configure platform preferences</p>
    </div>

    <div className="space-y-6 max-w-3xl">
      {/* General */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" /> General Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Platform Name</p>
              <p className="text-xs text-muted-foreground">Display name of the platform</p>
            </div>
            <input defaultValue="EduAI" className="px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-foreground w-48 outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Default Language</p>
              <p className="text-xs text-muted-foreground">Default language for new users</p>
            </div>
            <input defaultValue="English" className="px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-foreground w-48 outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Max Students per Course</p>
              <p className="text-xs text-muted-foreground">Maximum enrollment capacity</p>
            </div>
            <input type="number" defaultValue={100} className="px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-foreground w-48 outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" /> Notification Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Send email alerts for important events</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Lecture Reminders</p>
              <p className="text-xs text-muted-foreground">Remind students 30 min before lecture</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Assignment Due Alerts</p>
              <p className="text-xs text-muted-foreground">Alert students about upcoming deadlines</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Browser push notifications</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-lock Inactive Sessions</p>
              <p className="text-xs text-muted-foreground">Lock sessions after 30 min inactivity</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Teacher Approval Required</p>
              <p className="text-xs text-muted-foreground">Admin must approve new teacher registrations</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* AI */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" /> AI & Data
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">AI Chatbot</p>
              <p className="text-xs text-muted-foreground">Enable AI doubt-solving chatbot for students</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">AI Attendance Tracking</p>
              <p className="text-xs text-muted-foreground">Automatically track attendance via join/leave times</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Course Recommendations</p>
              <p className="text-xs text-muted-foreground">AI-powered semester-based course suggestions</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <Button className="w-full">Save Settings</Button>
    </div>
  </div>
);

export default AdminSettings;
