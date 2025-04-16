import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { verifyToken } from "@/lib/auth"
import { hashPassword } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const query = `
      SELECT 
        user_id as id, 
        username, 
        email, 
        CONCAT(first_name, ' ', last_name) as name,
        role,
        phone,
        profile_image as image,
        created_at as createdAt
      FROM users 
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `

    const users = await executeQuery<any[]>({ query })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "An error occurred while fetching users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const currentUser = verifyToken(token)

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, username, email, password, role, phone, image } = body

    // Split name into first_name and last_name
    const nameParts = name.split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(" ") || ""

    // Hash the password
    const hashedPassword = await hashPassword(password)

    const query = `
      INSERT INTO users (
        username, 
        password_hash, 
        email, 
        first_name, 
        last_name, 
        role, 
        phone, 
        profile_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `

    const result = await executeQuery<any>({
      query,
      values: [username, hashedPassword, email, firstName, lastName, role, phone || null, image || null],
    })

    return NextResponse.json({
      id: result.insertId,
      username,
      email,
      name,
      role,
      phone,
      image,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "An error occurred while creating user" }, { status: 500 })
  }
}
