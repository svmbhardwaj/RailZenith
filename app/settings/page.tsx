"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Settings, Shield, Database, Monitor } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [autoOptimization, setAutoOptimization] = useState(true)
  const [dataRetention, setDataRetention] = useState([30])
  const [refreshRate, setRefreshRate] = useState([5])
  const [alertThreshold, setAlertThreshold] = useState([75])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Settings</h1>
          <p className="text-gray-400 mt-1">Configure HIDSS Command Center preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-300">All systems operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Real-time Notifications</h3>
                <p className="text-sm text-gray-400">Receive alerts for system events</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Auto Optimization</h3>
                <p className="text-sm text-gray-400">Enable automatic traffic optimization</p>
              </div>
              <Switch checked={autoOptimization} onCheckedChange={setAutoOptimization} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-white font-medium">Data Refresh Rate (seconds)</label>
                <span className="text-sm font-mono text-[#e94560]">{refreshRate[0]}s</span>
              </div>
              <Slider value={refreshRate} onValueChange={setRefreshRate} min={1} max={30} step={1} className="w-full" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-white font-medium">Alert Threshold (%)</label>
                <span className="text-sm font-mono text-[#e94560]">{alertThreshold[0]}%</span>
              </div>
              <Slider
                value={alertThreshold}
                onValueChange={setAlertThreshold}
                min={50}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-white font-medium">Data Retention (days)</label>
                <span className="text-sm font-mono text-[#e94560]">{dataRetention[0]} days</span>
              </div>
              <Slider
                value={dataRetention}
                onValueChange={setDataRetention}
                min={7}
                max={365}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-medium">Storage Usage</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Traffic Data</span>
                  <span className="text-white">2.4 GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-[#e94560] h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Analytics</span>
                  <span className="text-white">1.8 GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#e94560] hover:bg-[#d63851] text-white">Export Data</Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg flex items-center">
              <Monitor className="mr-2 h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { component: "Traffic Sensors", status: "online", uptime: "99.8%" },
              { component: "Database", status: "online", uptime: "99.9%" },
              { component: "AI Engine", status: "online", uptime: "98.7%" },
              { component: "Map Services", status: "online", uptime: "99.5%" },
              { component: "Alert System", status: "online", uptime: "100%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a2e] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white font-medium">{item.component}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-400 capitalize">{item.status}</div>
                  <div className="text-xs text-gray-400">{item.uptime} uptime</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security & Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-[#1a1a2e] rounded-lg">
              <h3 className="text-white font-medium mb-2">Access Level</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Administrator</span>
                <span className="text-green-400 text-sm">Full Access</span>
              </div>
            </div>

            <div className="p-4 bg-[#1a1a2e] rounded-lg">
              <h3 className="text-white font-medium mb-2">Last Login</h3>
              <div className="text-gray-400 text-sm">
                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </div>
            </div>

            <div className="p-4 bg-[#1a1a2e] rounded-lg">
              <h3 className="text-white font-medium mb-2">Session Timeout</h3>
              <div className="text-gray-400 text-sm">30 minutes of inactivity</div>
            </div>

            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-[#1a1a2e] bg-transparent"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
