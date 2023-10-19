"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export const handleGiftShares = async (formData, data) => {
  let sharesToGift
  let user

  try {
    await db.$transaction(async (prisma) => {
      const refetchedUser = await getCurrentUser()

      if (!refetchedUser) {
        throw new Error("User not authenticated.")
      }

      const currentUserSharesFromDB = await prisma.investment.findMany({
        where: { userId: refetchedUser.id },
      })

      user = data.user
      const selectedShare = data.selectedShare
      sharesToGift = parseInt(formData.get("shares"), 10)

      const selectedInvestment = currentUserSharesFromDB.find(
        (share) => share.id === selectedShare
      )

      if (!selectedInvestment || sharesToGift > selectedInvestment.shares) {
        throw new Error("Cannot gift more shares than you own.")
      }

      const remainingShares = selectedInvestment.shares - sharesToGift

      if (remainingShares === 0) {
        await prisma.investment.delete({ where: { id: selectedInvestment.id } })
      } else {
        await prisma.investment.update({
          where: { id: selectedInvestment.id },
          data: { shares: remainingShares },
        })
      }

      const giftedUserInvestment = await prisma.investment.findFirst({
        where: { userId: user.id, artPieceId: selectedInvestment.artPieceId },
      })

      if (giftedUserInvestment) {
        await prisma.investment.update({
          where: { id: giftedUserInvestment.id },
          data: { shares: giftedUserInvestment.shares + sharesToGift },
        })
      } else {
        await prisma.investment.create({
          data: {
            userId: user.id,
            artPieceId: selectedInvestment.artPieceId,
            shares: sharesToGift,
          },
        })
      }

      revalidatePath("/dashboard/overview")
      revalidatePath("/user")
    })

    return {
      success: true,
      message: `Successfully gifted ${sharesToGift} shares to ${user.name}`,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred while gifting shares.",
    }
  }
}
