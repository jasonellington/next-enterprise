"use client"

import React, { useEffect, useState } from "react"

import { Column, ROW_HEADER_WIDTH } from "utils/generateMockData"

interface VirtualColumnHeadersProps {
  columns: Column[]
  onResizeColumn: (columnId: string, newWidth: number) => void
}

const VirtualizedColumnHeaders: React.FC<VirtualColumnHeadersProps> = ({ columns, onResizeColumn }) => {
  const [resizingColumn, setResizingColumn] = useState<string | null>(null)
  const [startX, setStartX] = useState<number>(0)
  const [startWidth, setStartWidth] = useState<number>(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, columnId: string) => {
    setResizingColumn(columnId)
    setStartX(e.pageX)
    setStartWidth(columns.find((col) => col.id === columnId)?.width || 0)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (resizingColumn) {
      const newWidth = startWidth + e.pageX - startX
      if (newWidth > 0) {
        onResizeColumn(resizingColumn, newWidth)
      }
    }
  }

  const handleMouseUp = () => {
    setResizingColumn(null)
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div className="flex">
      {/* Placeholder for row header alignment */}
      <div className="sticky left-0 z-20 h-16 border bg-white" style={{ width: ROW_HEADER_WIDTH }}></div>

      {columns.map((column) => (
        <div
          key={column.id}
          className="sticky top-0 z-10 flex items-center justify-center border bg-gray-100"
          style={{ width: column.width }}
        >
          {column.title}
          <div
            className="cursor-col-resize"
            style={{ height: "100%", width: 5, position: "absolute", right: 0 }}
            onMouseDown={(e) => handleMouseDown(e, column.id)}
          ></div>
        </div>
      ))}
    </div>
  )
}

export default VirtualizedColumnHeaders
