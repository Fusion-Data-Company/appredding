import { useState } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Save, 
  RefreshCcw,
  Mail,
  BellRing,
  Palette,
  Globe,
  Shield,
  Key,
  FileText,
  Database,
  Trash2
} from "lucide-react";

export default function SettingsContent() {
  const { refreshData, theme, sidebar } = useAdminContext();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    taskReminders: true,
    marketingEmails: false,
    systemUpdates: true
  });
  const [appearance, setAppearance] = useState("light");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAppearanceChange = (value: string) => {
    setAppearance(value);
    // This would update the actual theme in a real implementation
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refreshData} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            className="h-9" 
            onClick={handleSave} 
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="h-9 w-full justify-start overflow-x-auto no-scrollbar">
          <TabsTrigger value="general" className="text-xs sm:text-sm">General</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="text-xs sm:text-sm">Appearance</TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs sm:text-sm">Integrations</TabsTrigger>
          <TabsTrigger value="data" className="text-xs sm:text-sm">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="m-0 mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Basic information about your company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Praetorian Protective Coatings" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://praetoriancoatings.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="info@praetoriancoatings.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123 Main Street, Suite 100&#10;Anytown, USA 12345" />
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Last updated: Apr 15, 2023
              </p>
              <Button>Save Company Info</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email communication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-email">From Email</Label>
                <Input id="from-email" defaultValue="no-reply@praetoriancoatings.com" />
                <p className="text-sm text-muted-foreground">
                  This is the email address that will be shown on outgoing emails
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reply-to">Reply-To Email</Label>
                <Input id="reply-to" defaultValue="support@praetoriancoatings.com" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-signature">Use Email Signature</Label>
                  <p className="text-sm text-muted-foreground">
                    Add a standard signature to all outgoing emails
                  </p>
                </div>
                <Switch id="email-signature" checked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="m-0 mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Customize how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Task Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminders for upcoming and overdue tasks
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.taskReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, taskReminders: checked })}
                  />
                </div>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Be notified about system updates and maintenance
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t px-6 py-4">
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="m-0 mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <RadioGroup 
                  defaultValue={appearance} 
                  onValueChange={handleAppearanceChange}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
                    <div
                      key={color}
                      className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                        theme.primaryColor === color ? 'border-gray-900 dark:border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => theme.setPrimaryColor(color)}
                    />
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sidebar Collapsed</Label>
                  <p className="text-sm text-muted-foreground">
                    Set the default sidebar state
                  </p>
                </div>
                <Switch
                  checked={sidebar.isCollapsed}
                  onCheckedChange={sidebar.toggle}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t px-6 py-4">
              <Button>Save Appearance Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="m-0 mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="text-sm font-medium">Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Last changed: 32 days ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change Password</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="text-sm font-medium">Login History</h4>
                      <p className="text-sm text-muted-foreground">
                        View your recent login activity
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View History</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="m-0 mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Manage third-party service connections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center py-8">
              <p className="text-muted-foreground">
                Integrations settings will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="m-0 mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your data and export options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="text-sm font-medium">Export Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Download all your CRM data
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <div>
                      <h4 className="text-sm font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}