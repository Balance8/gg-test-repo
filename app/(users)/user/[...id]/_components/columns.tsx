"use client"

import Image from "next/image"
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
      <div className="relative aspect-square">
        <Image
          className="object-cover"
          src={row.getValue("imageUrl")}
          alt={row.getValue("title")}
          quality={10}
          fill
        />
      </div>
    ),
  },
]
