"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Settings, Plus, Edit, Trash2, Save, DollarSign, Truck, Users, Bell, Globe } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getPlatformSettings, updateTaxRule, updateSystemSetting, updatePaymentSetting } from "@/mock/mock-setting-data"

export function AdminSettings() {
  const [settings, setSettings] = useState(getPlatformSettings())
  const [activeTab, setActiveTab] = useState("general")
  const [isLoading, setIsLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleSaveSettings = async (category: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaveMessage(`${category} settings saved successfully!`)
      setTimeout(() => setSaveMessage(""), 3000)
    } catch  {
      setSaveMessage("Error saving settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSystemSettingChange = (settingId: string, value: string | number | boolean) => {
    updateSystemSetting(settingId, value)
    setSettings(getPlatformSettings())
  }

  const handleTaxRuleToggle = (ruleId: string, active: boolean) => {
    updateTaxRule(ruleId, { active })
    setSettings(getPlatformSettings())
  }

  const handlePaymentToggle = (paymentId: string, active: boolean) => {
    updatePaymentSetting(paymentId, { active })
    setSettings(getPlatformSettings())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Platform Settings</h2>
          <p className="text-gray-500 dark:text-gray-400">Configure system-wide settings and business operations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Settings className="h-8 w-8 text-[#670D2F]" />
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{saveMessage}</AlertDescription>
        </Alert>
      )}

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Tax Rules</span>
          </TabsTrigger>
          <TabsTrigger value="delivery" className="flex items-center space-x-2">
            <Truck className="h-4 w-4" />
            <span>Delivery</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Payments</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Platform Settings</CardTitle>
              <CardDescription>Configure basic platform information and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input
                    id="site_name"
                    value={(settings.system_settings.find((s) => s.key === "site_name")?.value as string) || ""}
                    onChange={(e) => handleSystemSettingChange("setting_001", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default_currency">Default Currency</Label>
                  <Select
                    value={
                      (settings.system_settings.find((s) => s.key === "default_currency")?.value as string) || "ETB"
                    }
                    onValueChange={(value) => handleSystemSettingChange("setting_003", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETB">Ethiopian Birr (ETB)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={(settings.system_settings.find((s) => s.key === "site_description")?.value as string) || ""}
                  onChange={(e) => handleSystemSettingChange("setting_002", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="max_upload_size">Max Upload Size (MB)</Label>
                  <Input
                    id="max_upload_size"
                    type="number"
                    value={(settings.system_settings.find((s) => s.key === "max_upload_size")?.value as number) || 10}
                    onChange={(e) => handleSystemSettingChange("setting_004", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session_timeout">Session Timeout (seconds)</Label>
                  <Input
                    id="session_timeout"
                    type="number"
                    value={(settings.system_settings.find((s) => s.key === "session_timeout")?.value as number) || 3600}
                    onChange={(e) => handleSystemSettingChange("setting_006", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="require_email_verification"
                  checked={
                    (settings.system_settings.find((s) => s.key === "require_email_verification")?.value as boolean) ||
                    false
                  }
                  onCheckedChange={(checked) => handleSystemSettingChange("setting_005", checked)}
                />
                <Label htmlFor="require_email_verification">Require Email Verification</Label>
              </div>

              <Button onClick={() => handleSaveSettings("General")} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save General Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Rules */}
        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tax Rules</CardTitle>
                  <CardDescription>Manage tax rates and rules for different products and regions</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tax Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Applies To</TableHead>
                    <TableHead>Regions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.tax_rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-sm text-gray-500">{rule.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{rule.rate}%</TableCell>
                      <TableCell>
                        <Badge variant="outline">{rule.applies_to}</Badge>
                      </TableCell>
                      <TableCell>{rule.regions.join(", ")}</TableCell>
                      <TableCell>
                        <Switch
                          checked={rule.active}
                          onCheckedChange={(checked) => handleTaxRuleToggle(rule.id, checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivery Zones */}
        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Delivery Zones</CardTitle>
                  <CardDescription>Configure delivery zones and shipping methods</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Delivery Zone
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {settings.delivery_zones.map((zone) => (
                  <Card key={zone.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{zone.name}</CardTitle>
                          <CardDescription>{zone.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={zone.active ? "default" : "secondary"}>
                            {zone.active ? "Active" : "Inactive"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Coverage</h4>
                          <p className="text-sm text-gray-600">
                            <strong>Regions:</strong> {zone.regions.join(", ")}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Cities:</strong> {zone.cities.join(", ")}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Delivery Methods</h4>
                          <div className="space-y-2">
                            {zone.delivery_methods.map((method) => (
                              <div key={method.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div>
                                  <div className="font-medium text-sm">{method.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {method.estimated_days_min}-{method.estimated_days_max} days
                                  </div>
                                </div>
                                <div className="text-sm font-medium">
                                  {method.base_cost} ETB + {method.cost_per_km}/km
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Roles */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Roles</CardTitle>
                    <CardDescription>Manage user roles and their permissions</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Role
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {settings.user_roles.map((role) => (
                    <div key={role.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{role.name}</h4>
                          <p className="text-sm text-gray-500">{role.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{role.user_count} users</Badge>
                          {role.is_system_role && <Badge variant="secondary">System</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">{role.permissions.length} permissions assigned</div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!role.is_system_role && (
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Available Permissions</CardTitle>
                <CardDescription>System permissions that can be assigned to roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {settings.user_permissions.map((permission) => (
                    <div key={permission.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{permission.name}</h4>
                        <Badge variant="outline">{permission.category.replace("_", " ")}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{permission.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {permission.actions.map((action) => (
                          <Badge key={action} variant="secondary" className="text-xs">
                            {action.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Configure available payment methods and their settings</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {settings.payment_settings.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium">{payment.name}</h4>
                            <p className="text-sm text-gray-500">{payment.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={payment.active}
                            onCheckedChange={(checked) => handlePaymentToggle(payment.id, checked)}
                          />
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Provider:</span> {payment.provider}
                        </div>
                        <div>
                          <span className="font-medium">Transaction Fee:</span> {payment.transaction_fee}%
                        </div>
                        <div>
                          <span className="font-medium">Currencies:</span> {payment.supported_currencies.join(", ")}
                        </div>
                      </div>
                      {payment.test_mode && (
                        <Badge variant="secondary" className="mt-2">
                          Test Mode
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure automated notifications and templates</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Notification
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.notification_settings.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div className="font-medium">{notification.event.replace("_", " ")}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{notification.type}</Badge>
                      </TableCell>
                      <TableCell>{notification.recipients}</TableCell>
                      <TableCell>{notification.template}</TableCell>
                      <TableCell>
                        <Switch checked={notification.active} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
