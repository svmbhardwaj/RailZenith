"use client"

import type React from "react"

import { Navigation } from "./navigation"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white font-sans">
      <Navigation />
      <div className="lg:pl-64">{children}</div>
    </div>
  )
}
