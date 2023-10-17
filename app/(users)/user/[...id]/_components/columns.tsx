// columns.js
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "artPieceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Art Piece ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("artPieceId")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "shares",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shares" />
    ),
    cell: ({ row }) => <div>{row.getValue("shares")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <img
        src={row.getValue("imageUrl")}
        alt={row.getValue("title")}
        width={50}
      />
    ),
  },
]
