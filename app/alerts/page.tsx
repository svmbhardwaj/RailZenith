"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Info, CheckCircle, X, Bell } from "lucide-react"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "critical",
      title: "Train Delay - Severe Congestion Expected",
      message: "Train #12345 is delayed by 15 minutes. Severe traffic congestion expected at Main Street crossing.",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      acknowledged: false,
      location: "Main Street Railway Crossing",
    },
    {
      id: 2,
      type: "warning",
      title: "High Traffic Volume Detected",
      message: "Unusual traffic volume detected on Highway 101. Consider alternate routing.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      acknowledged: false,
      location: "Highway 101 - Mile Marker 15",
    },
    {
      id: 3,
      type: "info",
      title: "System Optimization Complete",
      message: "Traffic signal optimization has been successfully applied to downtown area.",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      acknowledged: true,
      location: "Downtown District",
    },
    {
      id: 4,
      type: "warning",
      title: "Weather Impact Alert",
      message: "Light rain detected. Reduced visibility may affect traffic flow.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      acknowledged: false,
      location: "City-wide",
    },
    {
      id: 5,
      type: "success",
      title: "Route Optimization Successful",
      message: "Alternative routing has reduced congestion by 23% on Industrial Avenue.",
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      acknowledged: true,
      location: "Industrial Avenue",
    },
  ])

  const acknowledgeAlert = (id: number) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
  }

  const dismissAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-500/30 hover:border-red-500/50"
      case "warning":
        return "border-yellow-500/30 hover:border-yellow-500/50"
      case "info":
        return "border-blue-500/30 hover:border-blue-500/50"
      case "success":
        return "border-green-500/30 hover:border-green-500/50"
      default:
        return "border-gray-500/30 hover:border-gray-500/50"
    }
  }

  const unacknowledgedCount = alerts.filter((alert) => !alert.acknowledged).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Alerts</h1>
          <p className="text-gray-400 mt-1">Monitor and manage system notifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-[#e94560]" />
            <span className="text-white font-semibold">{unacknowledgedCount} unread</span>
          </div>
          <Button
            onClick={() => setAlerts((prev) => prev.map((alert) => ({ ...alert, acknowledged: true })))}
            className="bg-[#e94560] hover:bg-[#d63851] text-white"
          >
            Acknowledge All
          </Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#16213e] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Critical</p>
                <p className="text-2xl font-bold text-red-500">{alerts.filter((a) => a.type === "critical").length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Warnings</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {alerts.filter((a) => a.type === "warning").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Info</p>
                <p className="text-2xl font-bold text-blue-500">{alerts.filter((a) => a.type === "info").length}</p>
              </div>
              <Info className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Success</p>
                <p className="text-2xl font-bold text-green-500">{alerts.filter((a) => a.type === "success").length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card className="bg-[#16213e] border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#e94560] text-lg">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 bg-[#1a1a2e] rounded-lg border transition-all ${getAlertColor(alert.type)} ${
                  !alert.acknowledged ? "ring-1 ring-[#e94560]/20" : "opacity-75"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-semibold">{alert.title}</h3>
                        {!alert.acknowledged && (
                          <span className="px-2 py-1 text-xs bg-[#e94560] text-white rounded-full">NEW</span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>{alert.location}</span>
                        <span>•</span>
                        <span>{alert.timestamp.toLocaleTimeString()}</span>
                        <span>•</span>
                        <span>{Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)} mins ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="bg-[#e94560] hover:bg-[#d63851] text-white text-xs"
                      >
                        Acknowledge
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => dismissAlert(alert.id)}
                      className="border-gray-600 text-gray-300 hover:bg-[#1a1a2e] text-xs"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
