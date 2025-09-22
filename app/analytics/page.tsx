"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, TrendingDown, Activity, Clock, Users, MapPin } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("24h")

  const timeRanges = [
    { label: "24 Hours", value: "24h" },
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "90 Days", value: "90d" },
  ]

  const trafficData = [
    { time: "00:00", congestion: 25, vehicles: 120 },
    { time: "06:00", congestion: 45, vehicles: 340 },
    { time: "08:00", congestion: 85, vehicles: 890 },
    { time: "12:00", congestion: 65, vehicles: 650 },
    { time: "17:00", congestion: 95, vehicles: 1200 },
    { time: "20:00", congestion: 55, vehicles: 480 },
    { time: "23:00", congestion: 30, vehicles: 180 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Traffic Analytics</h1>
          <p className="text-gray-400 mt-1">Comprehensive traffic flow analysis and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
              className={
                timeRange === range.value
                  ? "bg-[#e94560] hover:bg-[#d63851] text-white"
                  : "border-gray-600 text-gray-300 hover:bg-[#16213e]"
              }
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#16213e] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Congestion</p>
                <p className="text-2xl font-bold text-white">67%</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">-12% from last week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#e94560]/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[#e94560]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Peak Traffic</p>
                <p className="text-2xl font-bold text-white">1,247</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">+8% from last week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Delay</p>
                <p className="text-2xl font-bold text-white">4.2m</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">-2.1m from last week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#16213e] border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Routes</p>
                <p className="text-2xl font-bold text-white">23</p>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">All operational</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Flow Chart */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg">Traffic Flow Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {trafficData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="text-xs text-gray-400">{data.vehicles}</div>
                  <div
                    className="w-full bg-[#e94560] rounded-t-sm transition-all duration-300 hover:bg-[#d63851]"
                    style={{ height: `${(data.congestion / 100) * 200}px` }}
                  ></div>
                  <div className="text-xs text-gray-400">{data.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#e94560] rounded mr-2"></div>
                  <span className="text-gray-400">Congestion Level</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Performance */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg">Route Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { route: "Main Street", efficiency: 85, status: "optimal" },
                { route: "Highway 101", efficiency: 72, status: "moderate" },
                { route: "Industrial Ave", efficiency: 45, status: "congested" },
                { route: "Park Boulevard", efficiency: 91, status: "optimal" },
                { route: "Commerce Way", efficiency: 68, status: "moderate" },
              ].map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a2e] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        route.status === "optimal"
                          ? "bg-green-500"
                          : route.status === "moderate"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-white font-medium">{route.route}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          route.efficiency >= 80
                            ? "bg-green-500"
                            : route.efficiency >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${route.efficiency}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 w-12">{route.efficiency}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peak Hours Analysis */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#1a1a2e] rounded-lg">
                <span className="text-white">Morning Rush</span>
                <span className="text-[#e94560] font-semibold">7:30 - 9:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#1a1a2e] rounded-lg">
                <span className="text-white">Evening Rush</span>
                <span className="text-[#e94560] font-semibold">5:00 - 6:30 PM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#1a1a2e] rounded-lg">
                <span className="text-white">Weekend Peak</span>
                <span className="text-[#e94560] font-semibold">2:00 - 4:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optimization Impact */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg">Optimization Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-[#1a1a2e] rounded-lg">
                <div className="text-2xl font-bold text-green-500">23%</div>
                <div className="text-sm text-gray-400">Congestion Reduction</div>
              </div>
              <div className="text-center p-4 bg-[#1a1a2e] rounded-lg">
                <div className="text-2xl font-bold text-blue-500">156</div>
                <div className="text-sm text-gray-400">Hours Saved Daily</div>
              </div>
              <div className="text-center p-4 bg-[#1a1a2e] rounded-lg">
                <div className="text-2xl font-bold text-purple-500">89%</div>
                <div className="text-sm text-gray-400">System Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-[#16213e] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#e94560] text-lg">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a2e] rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-white">Implement dynamic signal timing on Main Street</p>
                <p className="text-xs text-gray-400 mt-1">Potential 15% improvement</p>
              </div>
              <div className="p-3 bg-[#1a1a2e] rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-white">Consider alternate routing during peak hours</p>
                <p className="text-xs text-gray-400 mt-1">Reduce congestion by 8%</p>
              </div>
              <div className="p-3 bg-[#1a1a2e] rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-white">Optimize train crossing schedules</p>
                <p className="text-xs text-gray-400 mt-1">Minimize delays by 12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
