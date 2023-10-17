import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"

export default async function InvestmentsPage({ params }) {
  const id = params.id[0]

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  })

  const investments = await db.investment.findMany({
    where: {
      userId: id as string,
    },
  })

  const artPieces = await db.artPiece.findMany({
    where: {
      id: {
        in: investments.map((investment) => investment.artPieceId),
      },
    },
  })

  const data = investments.map((investment) => {
    const artPiece = artPieces.find((art) => art.id === investment.artPieceId)
    return {
      ...investment,
      ...artPiece,
    }
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Investments"
        text={`Investments for user ${user?.name}`}
      />
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={data} columns={columns} />
      </div>
    </DashboardShell>
  )
}
