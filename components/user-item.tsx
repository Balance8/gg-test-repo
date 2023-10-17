"use client"

import { useRef, useState } from "react"
import { Investment, User } from "@prisma/client"

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

import { toast } from "./ui/use-toast"

interface UserItemProps {
  user: Pick<User, "id" | "name" | "createdAt">
  currentUserShares: Investment[]
}

export function UserItem({ user, currentUserShares }: UserItemProps) {
  const [showGiftDialog, setShowGiftDialog] = useState(false)
  const [selectedShare, setSelectedShare] = useState("")
  const [sharesToGift, setSharesToGift] = useState<string>("")
  const [maxShares, setMaxShares] = useState(0)

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

  async function clientAction(formData: FormData) {
    const result = await handleGiftShares(formData, {
      user,
      currentUserShares,
      selectedShare,
    })

    if (result.success) {
      ref.current?.reset()

      setSelectedShare("")
      setSharesToGift("")
      setMaxShares(0)

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
      <div className="grid gap-1">{user.name}</div>
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
                          {share.artPieceId} - {share.shares} shares
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
                disabled={
                  parseInt(sharesToGift, 10) > maxShares ||
                  parseInt(sharesToGift, 10) <= 0 ||
                  isNaN(parseInt(sharesToGift, 10))
                }
              >
                Confirm
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}