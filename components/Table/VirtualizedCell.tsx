"use client"

import React, { useEffect, useRef, useState } from "react"
import { useScrollContext } from "hooks/useScrollContext"

import { mockApiCall,Row } from "utils/generateMockData"

interface VirtualizedCellProps {
  row: Row
  columnId: string
  rowHeightsArray: number[]
  columnWidthsArray: number[]
}

const VirtualizedCell: React.FC<VirtualizedCellProps> = ({ row, columnId, rowHeightsArray, columnWidthsArray }) => {
  const [content, setContent] = useState<string | number>()
  const cellRef = useRef<HTMLDivElement>(null)
  const isDataFetched = useRef(false)
  const { viewport, scrollPosition } = useScrollContext()

  useEffect(() => {
    const cellElement = cellRef.current
    let observer: IntersectionObserver

    const fetchData = () => {
      if (!isDataFetched.current) {
        isDataFetched.current = true
        mockApiCall(row.id, columnId).then((data) => {
          setContent(data)
        })
      }
    }

    if (cellElement) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              fetchData()
            }
          })
        },
        { rootMargin: "100px", threshold: 0.01 }
      )

      observer.observe(cellElement)
    }

    return () => {
      if (observer && cellElement) {
        observer.unobserve(cellElement)
      }
    }
  }, [row.id, columnId])

  // Safeguarding against undefined props
  const safeRowId = row.id || ""
  const safeColumnId = columnId || ""
  const rowIndex = parseInt(safeRowId.replace(/^\D+/g, ""), 10) - 1
  const columnIndex = parseInt(safeColumnId.replace(/^\D+/g, ""), 10) - 1

  const cellTop = rowHeightsArray.slice(0, rowIndex).reduce((acc, height) => acc + height, 0)
  const cellLeft = columnWidthsArray.slice(0, columnIndex).reduce((acc, width) => acc + width, 0)

  const isVisible =
    cellLeft < scrollPosition.scrollLeft + viewport.width &&
    cellLeft + columnWidthsArray[columnIndex] > scrollPosition.scrollLeft &&
    cellTop < scrollPosition.scrollTop + viewport.height &&
    cellTop + row.height > scrollPosition.scrollTop

  const preloadMargin = 500 // Pixels to extend beyond the current viewport for preloading

  const isClose =
    cellLeft < scrollPosition.scrollLeft + viewport.width + preloadMargin &&
    cellLeft + columnWidthsArray[columnIndex] > scrollPosition.scrollLeft - preloadMargin &&
    cellTop < scrollPosition.scrollTop + viewport.height + preloadMargin &&
    cellTop + row.height > scrollPosition.scrollTop - preloadMargin

  return (
    <div
      ref={cellRef}
      className="flex items-start justify-start overflow-hidden truncate whitespace-normal border"
      style={{
        width: columnWidthsArray[columnIndex],
        height: row.height,
      }} // Dynamically set width
    >
      {isClose && !content ? <SkeletonLoader /> : content}
    </div>
  )
}

export default VirtualizedCell

const SkeletonLoader = () => (
  <div className="flex h-full w-full animate-pulse items-center justify-center">
    <div className="h-1/2 w-1/2 rounded-full bg-slate-200"></div>
  </div>
)
