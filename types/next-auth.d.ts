import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
    }
  }
  interface Profile {
    given_name?: string
    family_name?: string
    email_verified?: boolean
    groups?: string[]
  }
}
