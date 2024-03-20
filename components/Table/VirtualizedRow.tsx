"use client"

import React, { useEffect, useState } from "react"

import { Column, Row, ROW_HEADER_WIDTH } from "utils/generateMockData"

import VirtualizedCell from "./VirtualizedCell"

interface VirtualizedRowProps {
  row: Row
  columns: Column[]
  onResizeRow: (rowId: string, newHeight: number) => void // New prop for resizing
  rowHeights: number[]
}

const VirtualizedRow: React.FC<VirtualizedRowProps> = React.memo(({ row, columns, onResizeRow, rowHeights }) => {
  const [resizingRow, setResizingRow] = useState<string | null>(null)
  const [startY, setStartY] = useState<number>(0)
  const [startHeight, setStartHeight] = useState<number>(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setResizingRow(row.id)
    setStartY(e.pageY)
    setStartHeight(row.height)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (resizingRow) {
      const newHeight = startHeight + e.pageY - startY
      if (newHeight > 0) {
        onResizeRow(resizingRow, newHeight)
      }
    }
  }

  const handleMouseUp = () => {
    setResizingRow(null)
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
      <div
        className="sticky left-0 z-20 flex items-center justify-center border bg-gray-100"
        style={{ height: row.height, width: ROW_HEADER_WIDTH }}
      >
        {row.title}
        <div
          className="cursor-row-resize"
          onMouseDown={(e) => handleMouseDown(e)}
          style={{ height: "100%", cursor: "row-resize", position: "absolute", bottom: 0, left: 0, right: 0 }}
        ></div>
      </div>
      {columns.map((column) => (
        <VirtualizedCell
          key={column.id}
          row={row}
          columnId={column.id}
          rowHeightsArray={rowHeights}
          columnWidthsArray={columns.map((column) => column.width)}
        />
      ))}
    </div>
  )
})

VirtualizedRow.displayName = "VirtualizedRow"
export default VirtualizedRow
