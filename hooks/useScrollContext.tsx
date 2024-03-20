"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface ScrollContextType {
  viewport: { width: number; height: number }
  scrollPosition: { scrollTop: number; scrollLeft: number }
  setVisibleRange: (viewport: { width: number; height: number }, scrollTop: number, scrollLeft: number) => void
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const useScrollContext = () => {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error("useScrollContext must be used within a ScrollProvider")
  }
  return context
}

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 })
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  const setVisibleRange = (viewport: { width: number; height: number }, scrollTop: number, scrollLeft: number) => {
    setViewport(viewport)
    setScrollPosition({ scrollTop, scrollLeft })
  }
  return (
    <ScrollContext.Provider value={{ viewport, scrollPosition, setVisibleRange }}>{children}</ScrollContext.Provider>
  )
}
