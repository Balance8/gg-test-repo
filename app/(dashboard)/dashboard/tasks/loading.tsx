import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function TasksLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Tasks"
        text="Manage tasks and track your progress."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
