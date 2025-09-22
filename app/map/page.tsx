"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Zap, AlertTriangle, CheckCircle } from "lucide-react"

export default function MapPage() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [trafficPoints, setTrafficPoints] = useState([
    { id: 1, x: 20, y: 25, status: "congested", intensity: 85 },
    { id: 2, x: 45, y: 40, status: "moderate", intensity: 60 },
    { id: 3, x: 70, y: 30, status: "clear", intensity: 25 },
    { id: 4, x: 35, y: 65, status: "congested", intensity: 90 },
    { id: 5, x: 80, y: 70, status: "moderate", intensity: 55 },
  ])

  const routes = [
    { id: "route-a", name: "Main Street", color: "#e94560", efficiency: 75 },
    { id: "route-b", name: "Highway 101", color: "#ffc107", efficiency: 60 },
    { id: "route-c", name: "Industrial Ave", color: "#28a745", efficiency: 85 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficPoints((prev) =>
        prev.map((point) => ({
          ...point,
          intensity: Math.max(10, Math.min(100, point.intensity + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Interactive Traffic Map</h1>
          <p className="text-gray-400 mt-1">Real-time traffic monitoring and route optimization</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-[#e94560] hover:bg-[#d63851] text-white">
            <Navigation className="w-4 h-4 mr-2" />
            Optimize Routes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3">
          <Card className="bg-[#16213e] border-gray-700 h-[600px]">
            <CardHeader>
              <CardTitle className="text-[#e94560] text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Live Traffic Map
                </span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-400">Clear</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-gray-400">Moderate</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-400">Congested</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="bg-[#1a1a2e] rounded-lg border border-gray-700 h-full relative overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e]">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="border border-gray-600"></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Routes */}
                {routes.map((route) => (
                  <div key={route.id} className="absolute inset-0">
                    <svg className="w-full h-full">
                      <path
                        d={
                          route.id === "route-a"
                            ? "M 50 100 Q 200 200 400 150 T 700 200"
                            : route.id === "route-b"
                              ? "M 100 50 Q 300 100 500 80 T 800 120"
                              : "M 80 400 Q 250 300 450 350 T 750 300"
                        }
                        stroke={selectedRoute === route.id ? route.color : `${route.color}80`}
                        strokeWidth={selectedRoute === route.id ? "6" : "4"}
                        fill="none"
                        className="transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                      />
                    </svg>
                  </div>
                ))}

                {/* Traffic Points */}
                {trafficPoints.map((point) => (
                  <div
                    key={point.id}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${
                      point.status === "clear"
                        ? "bg-green-500"
                        : point.status === "moderate"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } ${point.intensity > 70 ? "animate-pulse" : ""}`}
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    title={`Traffic Intensity: ${point.intensity}%`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full ${
                        point.status === "clear"
                          ? "bg-green-500"
                          : point.status === "moderate"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      } opacity-30 animate-ping`}
                    ></div>
                  </div>
                ))}

                {/* Railway Crossing */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-[#e94560] rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black bg-opacity-75 px-2 py-1 rounded">
                    Railway Crossing
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Route Controls */}
          <Card className="bg-[#16213e] border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#e94560] text-lg">Route Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedRoute === route.id
                      ? "border-[#e94560] bg-[#e94560]/10"
                      : "border-gray-700 bg-[#1a1a2e] hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: route.color }}></div>
                      <span className="text-white font-medium">{route.name}</span>
                    </div>
                    <span className="text-sm text-gray-400">{route.efficiency}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#16213e] border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#e94560] text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Clear All Routes
              </Button>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Mode
              </Button>
              <Button className="w-full bg-[#e94560] hover:bg-[#d63851] text-white">
                <Zap className="w-4 h-4 mr-2" />
                Auto Optimize
              </Button>
            </CardContent>
          </Card>

          {/* Traffic Summary */}
          <Card className="bg-[#16213e] border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#e94560] text-lg">Traffic Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Incidents</span>
                <span className="text-red-400 font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Average Speed</span>
                <span className="text-white font-semibold">42 mph</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Vehicles Tracked</span>
                <span className="text-white font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">System Efficiency</span>
                <span className="text-green-400 font-semibold">89%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
