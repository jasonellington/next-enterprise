"use client"

import { useEffect, useState } from "react"
import { VariableSizeGrid as Grid } from "react-window"

import { mockApiCall } from "utils/generateMockData"

import { Skeleton } from "./Skeleton"

// These item sizes are arbitrary.
// Yours should be based on the content of the item.
const columnWidths = new Array(1000000).fill(true).map(() => 200)
const rowHeights = new Array(1000000).fill(true).map(() => 100)

interface DocumentRow {
  id: string
  title: string
}

export const generateGridColumns = (): DocumentRow[] => {
  return Array.from({ length: 1000000 }, (_, index) => ({
    id: `column${index + 1}`,
    title: `Column ${index + 1}`,
  }))
}

export const generateGridRows = (): DocumentRow[] => {
  return Array.from({ length: 1000000 }, (_, index) => ({
    id: `doc${index + 1}`,
    title: `Document ${index + 1}`,
  }))
}

const gridColumns = generateGridColumns()
const gridRows = generateGridRows()

interface CellProps {
  columnIndex: number
  rowIndex: number
  style: React.CSSProperties
  row: DocumentRow
  column: DocumentRow
}

const Cell: React.FC<CellProps> = ({ columnIndex, rowIndex, style, row, column }) => {
  const [content, setContent] = useState<string | number>()
  const [isDataFetched, setIsDataFetched] = useState(false)

  useEffect(() => {
    const fetchData = () => {
      if (!isDataFetched) {
        mockApiCall(row.id, column.id).then((data) => {
          setContent(data)
          setIsDataFetched(true)
        })
      }
    }

    if (!isDataFetched) {
      fetchData()
    }
  }, [row.id, column.id])

  return (
    <div style={style} className="flex items-center justify-center">
      <div className="flex h-full w-full items-center justify-center border border-gray-200 bg-white shadow-sm">
        {content ? `Prompt: ${column.id}, Doc: ${row.id}` : <Skeleton />}
      </div>
    </div>
  )
}

export const VirtualGrid = () => (
  <Grid
    height={1000}
    width={1000}
    columnCount={gridColumns.length}
    columnWidth={(index) => columnWidths[index]}
    rowCount={gridRows.length}
    rowHeight={(index) => rowHeights[index]}
  >
    {({ columnIndex, rowIndex, style }) => (
      <Cell
        columnIndex={columnIndex}
        rowIndex={rowIndex}
        style={style}
        row={gridRows[rowIndex]}
        column={gridColumns[columnIndex]}
      />
    )}
  </Grid>
)
