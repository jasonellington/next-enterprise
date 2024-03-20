"use client"

import React, { useEffect, useRef, useState } from "react"
import { useScrollContext } from "hooks/useScrollContext"

import { Column, getColumns, getRows,Row } from "utils/generateMockData"

import VirtualizedColumnHeaders from "./VirtualizedColumnHeaders"
import VirtualizedRow from "./VirtualizedRow"

const VirtualizedTable = () => {
  const [columns, setColumns] = useState<Column[]>([])
  const [rows, setRows] = useState<Row[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { setVisibleRange } = useScrollContext()

  useEffect(() => {
    const fetchTableData = async () => {
      const fetchedColumns = await getColumns() // Async function to fetch columns
      const fetchedRows = await getRows() // Async function to fetch rows
      setColumns(fetchedColumns)
      setRows(fetchedRows)
    }

    fetchTableData()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      // Immediately update context with initial dimensions and scroll positions
      const { clientWidth, clientHeight, scrollTop, scrollLeft } = container
      setVisibleRange({ width: clientWidth, height: clientHeight }, scrollTop, scrollLeft)
    }

    const handleScroll = () => {
      if (container) {
        const { scrollTop, scrollLeft, clientWidth, clientHeight } = container
        setVisibleRange({ width: clientWidth, height: clientHeight }, scrollTop, scrollLeft)
      }
    }

    container?.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => container?.removeEventListener("scroll", handleScroll)
  }, [setVisibleRange])

  const handleResizeColumn = (columnId: string, newWidth: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => (column.id === columnId ? { ...column, width: newWidth } : column))
    )
  }

  const handleResizeRow = (rowId: string, newHeight: number) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === rowId ? { ...row, height: newHeight } : row)))
  }

  const rowHeights = rows.map((row) => row.height)

  return (
    <div
      ref={containerRef}
      className="max-h-screen overflow-auto"
      style={{ height: "calc(100vh - 2rem)", width: "100%" }}
    >
      <div className="min-w-max">
        {/* Column headers */}
        <VirtualizedColumnHeaders columns={columns} onResizeColumn={handleResizeColumn} />

        {/* Rows */}
        {rows.map((row) => (
          <VirtualizedRow
            key={row.id}
            row={row}
            rowHeights={rowHeights}
            columns={columns}
            onResizeRow={handleResizeRow}
          />
        ))}
      </div>
    </div>
  )
}

export default VirtualizedTable
