import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Query the database for the user
    const users = await query("SELECT * FROM users WHERE username = ? AND deleted_at IS NULL", [username])

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = users[0] as any

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 })
    }

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json({ error: "Account is inactive" }, { status: 403 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.user_id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "24h" },
    )

    // Update last login timestamp
    await query("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?", [user.user_id])

    // Return user info and token
    return NextResponse.json({
      user: {
        id: user.user_id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
        profileImage: user.profile_image,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
