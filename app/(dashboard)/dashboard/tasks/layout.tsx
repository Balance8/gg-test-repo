interface TasksLayoutProps {
  children: React.ReactNode
}

export default function TasksLayout({ children }: TasksLayoutProps) {
  return <div className="mx-auto">{children}</div>
}
