import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { query } from "./db"
import type { JWT } from "next-auth/jwt"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const users = await query("SELECT * FROM users WHERE email = ? AND deleted_at IS NULL", [credentials.email])

          if (!users || users.length === 0) {
            return null
          }

          const user = users[0] as any

          // Compare the provided password with the stored hash
          const passwordMatch = await compare(credentials.password, user.password_hash)

          if (!passwordMatch) {
            return null
          }

          // Update last login timestamp
          await query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?", [user.user_id])

          return {
            id: user.user_id.toString(),
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            image: user.profile_image || null,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.JWT_SECRET,
}

// Add these functions for direct authentication
export async function authenticateUser(username: string, password: string) {
  try {
    const users = await query("SELECT * FROM users WHERE username = ? AND deleted_at IS NULL", [username])

    if (!users || users.length === 0) {
      return null
    }

    const user = users[0] as any

    // Compare the provided password with the stored hash
    const passwordMatch = await compare(password, user.password_hash)

    if (!passwordMatch) {
      return null
    }

    // Update last login timestamp
    await query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?", [user.user_id])

    return {
      id: user.user_id.toString(),
      username: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      profileImage: user.profile_image || null,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export function generateToken(user: any) {
  const jwt = require("jsonwebtoken")

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "fallback_secret",
    { expiresIn: "24h" },
  )
}
