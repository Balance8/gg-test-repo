"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArtPiece, Investment, User } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { handleGiftShares } from "@/app/(dashboard)/dashboard/actions"

import { Icons } from "./icons"
import { toast } from "./ui/use-toast"

interface UserItemProps {
  user: Pick<User, "id" | "name" | "createdAt">
  currentUserShares: (Investment & { artPiece: ArtPiece })[]
}

export function UserItem({ user, currentUserShares }: UserItemProps) {
  const [showGiftDialog, setShowGiftDialog] = useState(false)
  const [selectedShare, setSelectedShare] = useState("")
  const [sharesToGift, setSharesToGift] = useState<string>("")
  const [maxShares, setMaxShares] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const ref = useRef<HTMLFormElement>(null)

  const handleShareSelection = (id: string) => {
    setSelectedShare(id)
    const selectedInvestment = currentUserShares.find(
      (share) => share.id === id
    )
    if (selectedInvestment) {
      setMaxShares(selectedInvestment.shares)
    }
  }

  const resetFormAndState = () => {
    ref.current?.reset()
    setSelectedShare("")
    setSharesToGift("")
    setMaxShares(0)
    setIsLoading(false)
  }

  const clientAction = async (formData: FormData) => {
    const result = await handleGiftShares(formData, {
      user,
      currentUserShares,
      selectedShare,
    })

    resetFormAndState()

    if (result.success) {
      toast({
        title: "Shares gifted successfully",
        description: result.message,
      })
      setShowGiftDialog(false)
    } else {
      toast({
        title: "Shares gift failed",
        description: result.message,
      })
    }
  }

  return (
    <div className="flex items-center justify-between p-4">
      <Link
        href={`/user/${user.id}`}
        className="underline underline-offset-4 hover:text-primary"
      >
        <div className="grid gap-1">{user.name}</div>
      </Link>
      <Dialog open={showGiftDialog} onOpenChange={setShowGiftDialog}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="h-8 border-dashed"
            onClick={() => {
              setShowGiftDialog(true)
            }}
          >
            Gift
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gift Shares to {user.name}</DialogTitle>
          </DialogHeader>
          <form ref={ref} action={clientAction}>
            <div className="grid gap-3 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="share">Select Share to Gift</Label>
                <Select
                  onValueChange={(share) => {
                    handleShareSelection(share)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a share" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentUserShares.length === 0 ? (
                      <SelectItem disabled value="no-shares">
                        You have no shares to gift
                      </SelectItem>
                    ) : (
                      currentUserShares.map((share, index) => (
                        <SelectItem key={index} value={share.id}>
                          <div>
                            {share.artPiece.title} - {share.shares} shares
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              {selectedShare && (
                <div className="space-y-2">
                  <Label htmlFor="shares">Number of Shares</Label>
                  <Input
                    id="shares"
                    name="shares"
                    type="number"
                    value={sharesToGift}
                    onChange={(e) => {
                      const newInputValue = e.target.value
                      if (newInputValue === "") {
                        setSharesToGift("")
                      } else {
                        const parsedValue = parseInt(newInputValue, 10)
                        if (!isNaN(parsedValue)) {
                          setSharesToGift(
                            Math.max(
                              0,
                              Math.min(parsedValue, maxShares)
                            ).toString()
                          )
                        }
                      }
                    }}
                    placeholder="Enter number of shares"
                    max={maxShares}
                  />
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setShowGiftDialog(false)
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                onClick={() => {
                  setIsLoading(true)
                }}
                aria-disabled={
                  parseInt(sharesToGift, 10) > maxShares ||
                  parseInt(sharesToGift, 10) <= 0 ||
                  isNaN(parseInt(sharesToGift, 10)) ||
                  isLoading
                }
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
