"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"

export const handleGiftShares = async (formData, data) => {
  const { user, currentUserShares, selectedShare } = data
  const sharesToGift = parseInt(formData.get("shares"), 10)

  const selectedInvestment = currentUserShares.find(
    (share) => share.id === selectedShare
  )

  if (!selectedInvestment || sharesToGift > selectedInvestment.shares) {
    return { success: false, message: "Cannot gift more shares than you own." }
  }

  try {
    await db.$transaction(async (prisma) => {
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
    })

    revalidatePath("/dashboard/overview")
    revalidatePath("/user")
    return {
      success: true,
      message: `Successfully gifted ${sharesToGift} shares to ${user.name}`,
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while gifting shares.",
    }
  }
}
