import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Generate Users
  const users = Array.from({ length: 10 }, (_, i) => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    emailVerified: faker.date.past(),
    image: faker.image.avatar(),
  }))

  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }

  // Generate ArtPieces
  const artPieces = Array.from({ length: 20 }, (_, i) => ({
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.abstract(),
  }))

  for (const artPiece of artPieces) {
    await prisma.artPiece.create({
      data: artPiece,
    })
  }

  // Generate Investments
  const investments = Array.from({ length: 50 }, (_, i) => ({
    id: faker.datatype.uuid(),
    userId: users[Math.floor(Math.random() * users.length)].id,
    artPieceId: artPieces[Math.floor(Math.random() * artPieces.length)].id,
    shares: faker.datatype.number({ min: 1, max: 10 }),
  }))

  for (const investment of investments) {
    await prisma.investment.create({
      data: investment,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export {}
