import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserItem } from "@/components/user-item"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts." />
      <div className="divide-border-200 divide-y rounded-md border">
        <UserItem.Skeleton />
        <UserItem.Skeleton />
        <UserItem.Skeleton />
        <UserItem.Skeleton />
        <UserItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
