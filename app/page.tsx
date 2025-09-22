"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  Activity,
  Zap,
  Clock,
  Users,
  Target,
  ArrowRight,
  Play,
  RotateCcw,
} from "lucide-react"

export default function HIDSSCommandCenter() {
  const [trafficDiversion, setTrafficDiversion] = useState([30])
  const [trainDelay, setTrainDelay] = useState([10])
  const [congestionIndex, setCongestionIndex] = useState(82)
  const [timeSaved, setTimeSaved] = useState(0)
  const [fuelSaved, setFuelSaved] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [beforeScenario, setBeforeScenario] = useState({ congestion: 82, time: 0, fuel: 0 })
  const [afterScenario, setAfterScenario] = useState({ congestion: 82, time: 0, fuel: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCongestionIndex((prev) => {
        const variation = Math.floor(Math.random() * 8) - 4
        return Math.max(20, Math.min(100, prev + variation))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const runSimulation = () => {
    setIsSimulating(true)
    setBeforeScenario({ congestion: congestionIndex, time: timeSaved, fuel: fuelSaved })

    setTimeout(() => {
      const newCongestion = Math.max(20, congestionIndex - trafficDiversion[0] * 0.6)
      const savedTime = Math.floor((congestionIndex - newCongestion) * 0.4)
      const savedFuel = Math.floor((congestionIndex - newCongestion) * 2.3)

      setCongestionIndex(Math.floor(newCongestion))
      setTimeSaved(savedTime)
      setFuelSaved(savedFuel)
      setAfterScenario({ congestion: Math.floor(newCongestion), time: savedTime, fuel: savedFuel })
      setShowComparison(true)
      setIsSimulating(false)
    }, 2500)
  }

  const resetScenario = () => {
    setShowComparison(false)
    setCongestionIndex(82)
    setTimeSaved(0)
    setFuelSaved(0)
    setTrafficDiversion([30])
    setTrainDelay([10])
  }

  const getRecommendation = () => {
    if (congestionIndex > 80) return "CRITICAL: Immediate traffic diversion required"
    if (congestionIndex > 60) return "WARNING: Consider alternative routing"
    return "NORMAL: Traffic flow optimized"
  }

  const getRecommendationColor = () => {
    if (congestionIndex > 80) return "from-red-500 to-red-600"
    if (congestionIndex > 60) return "from-amber-500 to-amber-600"
    return "from-green-500 to-green-600"
  }

  const getCongestionColor = () => {
    if (congestionIndex > 80) return "text-red-400"
    if (congestionIndex > 60) return "text-amber-400"
    return "text-green-400"
  }

  return (
    <div className="p-6 space-y-6 bg-[#0f0f23] min-h-screen">
      <div className="flex items-start justify-between">
        {/* Left side - Critical KPIs prominently displayed as per PDF requirements */}
        <div className="flex items-start space-x-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">HIDSS Command Center</h1>
            <p className="text-gray-400">Hybrid Intelligence Decision Support System</p>
          </div>

          {/* Critical KPIs in top-left corner as specified in PDF */}
          <div className="flex items-center space-x-8 mt-2">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">PREDICTED CONGESTION INDEX</div>
              <div className={`text-5xl font-bold ${getCongestionColor()}`}>{congestionIndex}</div>
              <div className="text-xs text-gray-500">Real-time</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">TIME SAVED</div>
              <div className="text-5xl font-bold text-green-400">
                {timeSaved}
                <span className="text-2xl">min</span>
              </div>
              <div className="text-xs text-gray-500">Per vehicle</div>
            </div>
          </div>
        </div>

        {/* Right side - System status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Live Data Stream</span>
          </div>
          <Badge variant="outline" className="border-green-500 text-green-300 bg-green-900/60 font-semibold">
            System Online
          </Badge>
        </div>
      </div>

      <Card className={`bg-gradient-to-r ${getRecommendationColor()} border-none shadow-lg`}>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Target className="h-8 w-8 text-white" />
              <div>
                <div className="text-xs text-white/80 mb-1">SYSTEM RECOMMENDATION</div>
                <span className="font-bold text-white text-xl">{getRecommendation()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-black/30 text-white border-none font-semibold px-4 py-2">
                Confidence: 94%
              </Badge>
              <div className="text-white text-right">
                <div className="text-xs opacity-80">Next Update</div>
                <div className="text-sm font-mono">30s</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr_420px] gap-6">
        {/* Left Column - What-If Scenario Simulator */}
        <div className="space-y-6">
          <Card className="bg-[#16213e] border-[#e94560]/40 border-2 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-[#e94560]/20 to-[#d63851]/20">
              <CardTitle className="text-[#e94560] text-xl flex items-center">
                <Play className="mr-3 h-6 w-6" />
                What-If Scenario Simulator
              </CardTitle>
              <p className="text-sm text-gray-400">Manipulate variables to see predicted outcomes</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Enhanced Traffic Diversion Control */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">Traffic Diversion Percentage</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-mono text-[#e94560] bg-[#1a1a2e] px-4 py-2 rounded-lg border border-[#e94560]/30">
                      {trafficDiversion[0]}%
                    </span>
                  </div>
                </div>
                <Slider
                  value={trafficDiversion}
                  onValueChange={setTrafficDiversion}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>No Diversion (0%)</span>
                  <span>Full Diversion (100%)</span>
                </div>
              </div>

              {/* Enhanced Train Delay Control */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">Additional Train Delay</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-mono text-[#e94560] bg-[#1a1a2e] px-4 py-2 rounded-lg border border-[#e94560]/30">
                      +{trainDelay[0]}min
                    </span>
                  </div>
                </div>
                <Slider value={trainDelay} onValueChange={setTrainDelay} max={60} step={1} className="w-full" />
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>On Schedule</span>
                  <span>1 Hour Delay</span>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="flex-1 bg-gradient-to-r from-[#e94560] to-[#d63851] hover:from-[#d63851] hover:to-[#c42a47] text-white font-semibold py-3 transition-all duration-300 shadow-lg"
                >
                  {isSimulating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Running Analysis...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Run Simulation
                    </div>
                  )}
                </Button>
                <Button
                  onClick={resetScenario}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50 bg-transparent hover:border-gray-500"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {showComparison && (
                <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 rounded-xl border border-gray-600 shadow-inner">
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-3 text-[#e94560]" />
                    Impact Analysis Results
                  </h4>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Before Column */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-400 text-center border-b border-gray-600 pb-2">
                        BEFORE OPTIMIZATION
                      </h5>
                      <div className="space-y-3">
                        <div className="bg-[#16213e] p-4 rounded-lg text-center border border-red-500/30">
                          <div className="text-2xl font-bold text-red-400">{beforeScenario.congestion}</div>
                          <div className="text-xs text-gray-400">Congestion Index</div>
                        </div>
                        <div className="bg-[#16213e] p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-gray-400">{beforeScenario.time}</div>
                          <div className="text-xs text-gray-400">Time Saved (min)</div>
                        </div>
                        <div className="bg-[#16213e] p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-gray-400">{beforeScenario.fuel}L</div>
                          <div className="text-xs text-gray-400">Fuel Saved</div>
                        </div>
                      </div>
                    </div>

                    {/* After Column */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-400 text-center border-b border-gray-600 pb-2">
                        AFTER OPTIMIZATION
                      </h5>
                      <div className="space-y-3">
                        <div className="bg-[#16213e] p-4 rounded-lg text-center border-2 border-green-500/50 shadow-lg shadow-green-500/20">
                          <div className="text-2xl font-bold text-green-400">{afterScenario.congestion}</div>
                          <div className="text-xs text-gray-400">Congestion Index</div>
                        </div>
                        <div className="bg-[#16213e] p-4 rounded-lg text-center border-2 border-green-500/50 shadow-lg shadow-green-500/20">
                          <div className="text-2xl font-bold text-green-400">{afterScenario.time}</div>
                          <div className="text-xs text-gray-400">Time Saved (min)</div>
                        </div>
                        <div className="bg-[#16213e] p-4 rounded-lg text-center border-2 border-green-500/50 shadow-lg shadow-green-500/20">
                          <div className="text-2xl font-bold text-green-400">{afterScenario.fuel}L</div>
                          <div className="text-xs text-gray-400">Fuel Saved</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-green-800/20 border border-green-500/40 rounded-lg">
                    <div className="text-sm text-green-400 font-medium space-y-1">
                      <div>✓ {beforeScenario.congestion - afterScenario.congestion} point congestion reduction</div>
                      <div>✓ {afterScenario.time} minutes saved per vehicle</div>
                      <div>✓ {afterScenario.fuel}L fuel conservation achieved</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#16213e] border-[#e94560]/30 border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#e94560] text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Live Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs text-gray-400 mb-1">Active Vehicles</h3>
                      <span className="text-2xl font-bold text-white">1,247</span>
                    </div>
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>

                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs text-gray-400 mb-1">Fuel Saved Today</h3>
                      <span className="text-2xl font-bold text-green-400">{fuelSaved}L</span>
                    </div>
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                </div>

                <div className="bg-[#1a1a2e] p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs text-gray-400 mb-1">System Efficiency</h3>
                      <span className="text-2xl font-bold text-[#e94560]">94%</span>
                    </div>
                    <TrendingUp className="w-6 h-6 text-[#e94560]" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Enhanced Digital Twin */}
        <div className="space-y-6">
          <Card className="bg-[#16213e] border-gray-600 h-[700px] shadow-xl">
            <CardHeader className="bg-gradient-to-r from-[#16213e] to-[#1a1a2e]">
              <CardTitle className="text-[#e94560] text-xl flex items-center justify-between">
                <span>Digital Twin - Live Traffic State</span>
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10 animate-pulse">
                  Real-time Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] rounded-lg h-full flex flex-col relative overflow-hidden">
                {/* Traffic Flow Visualization */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
                  <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-[#e94560] via-[#d63851] to-[#c42a47] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#e94560]/30">
                    <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">Railway Crossing Alpha-7</p>
                  <p className="text-sm text-gray-400 mb-8">Sector 15, Delhi-Mumbai Route</p>

                  {/* Enhanced Status Indicators with better color coding */}
                  <div className="grid grid-cols-3 gap-8 mb-12">
                    <div className="text-center">
                      <div
                        className={`w-6 h-6 mx-auto mb-3 rounded-full shadow-lg ${
                          congestionIndex > 80
                            ? "bg-red-500 animate-pulse shadow-red-500/50"
                            : congestionIndex > 60
                              ? "bg-amber-500 shadow-amber-500/50"
                              : "bg-green-500 shadow-green-500/50"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-300 font-medium">North Route</span>
                    </div>
                    <div className="text-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full mx-auto mb-3 animate-pulse shadow-lg shadow-blue-500/50"></div>
                      <span className="text-sm text-gray-300 font-medium">Railway Track</span>
                    </div>
                    <div className="text-center">
                      <div
                        className={`w-6 h-6 mx-auto mb-3 rounded-full shadow-lg ${
                          congestionIndex > 70
                            ? "bg-red-500 animate-pulse shadow-red-500/50"
                            : "bg-green-500 shadow-green-500/50"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-300 font-medium">South Route</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 p-6 bg-[#16213e]/90 backdrop-blur-sm border-t border-gray-600">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow-sm shadow-green-500/50"></div>
                        <span className="text-gray-300">Normal: 45%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-2 shadow-sm shadow-amber-500/50"></div>
                        <span className="text-gray-300">Moderate: 35%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2 shadow-sm shadow-red-500/50"></div>
                        <span className="text-gray-300">Critical: 20%</span>
                      </div>
                    </div>
                    <div className="text-gray-400 font-mono text-xs">
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Enhanced animated traffic flow indicators */}
                <div className="absolute top-28 left-20 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                <div className="absolute top-48 right-24 w-4 h-4 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-500/50"></div>
                <div className="absolute bottom-36 left-28 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <div className="absolute bottom-48 right-20 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Enhanced Alerts and Timeline */}
        <div className="space-y-6">
          <Card className="bg-[#16213e] border-gray-600 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-900/20 to-red-800/10">
              <CardTitle className="text-[#e94560] text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <AlertTriangle className="mr-3 h-6 w-6" />
                  Critical Alerts
                </span>
                <Badge variant="destructive" className="bg-red-600 shadow-lg">
                  2 Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {/* Critical Alert - Red for critical as per PDF */}
              <div className="p-4 bg-gradient-to-r from-red-900/40 to-red-800/30 rounded-lg border-l-4 border-red-500 shadow-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="destructive" className="text-xs font-bold">
                        CRITICAL
                      </Badge>
                      <span className="text-xs text-gray-400 font-mono">2 min ago</span>
                    </div>
                    <p className="text-sm text-white font-semibold mb-1">
                      Train #12345 delayed by {trainDelay[0]} minutes
                    </p>
                    <p className="text-xs text-gray-300">Severe congestion expected. Immediate action required.</p>
                  </div>
                </div>
              </div>

              {/* Warning Alert - Amber for warnings as per PDF */}
              <div className="p-4 bg-gradient-to-r from-amber-900/40 to-amber-800/30 rounded-lg border-l-4 border-amber-500 shadow-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className="text-xs border-amber-500 text-amber-400 bg-amber-500/10 font-bold"
                      >
                        WARNING
                      </Badge>
                      <span className="text-xs text-gray-400 font-mono">5 min ago</span>
                    </div>
                    <p className="text-sm text-white font-semibold mb-1">High traffic volume on feeder road B</p>
                    <p className="text-xs text-gray-300">Consider alternative routing recommendations.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#16213e] border-gray-600 shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#e94560] text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                System Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e] rounded-lg border-l-4 border-green-500 shadow-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">Optimization cycle completed</p>
                    <p className="text-xs text-gray-400">Traffic flow improved by 23%</p>
                    <p className="text-xs text-gray-500 mt-1">3 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e] rounded-lg border-l-4 border-blue-500 shadow-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">Route A traffic normalized</p>
                    <p className="text-xs text-gray-400">Congestion reduced to normal levels</p>
                    <p className="text-xs text-gray-500 mt-1">8 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e] rounded-lg border-l-4 border-purple-500 shadow-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">ML model updated</p>
                    <p className="text-xs text-gray-400">New parameters loaded successfully</p>
                    <p className="text-xs text-gray-500 mt-1">12 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-[#1a1a2e] rounded-lg border-l-4 border-yellow-500 shadow-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">Traffic surge detected</p>
                    <p className="text-xs text-gray-400">Adaptive routing activated</p>
                    <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#16213e] border-gray-600 shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#e94560] text-lg">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">OR Engine</span>
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">ML Model</span>
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Data Feed</span>
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                  Live
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Digital Twin</span>
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                  Synced
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
