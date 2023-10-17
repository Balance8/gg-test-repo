import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import { taskSchema } from "@/lib/mock-data/schema"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

export const metadata: Metadata = {
  title: "Gifts",
  description: "Here you can gift art shares to your friends!",
}

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "lib/mock-data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
