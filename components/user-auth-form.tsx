"use client"

import * as React from "react"
import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(false)

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <button
        type="button"
        className={cn(buttonVariants({ size: "lg" }))}
        onClick={() => {
          setIsAuthLoading(true)
          signIn("github")
        }}
        disabled={isAuthLoading}
      >
        {isAuthLoading ? (
          <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Icons.github className="mr-2 h-5 w-5" />
        )}{" "}
        Github
      </button>
    </div>
  )
}
