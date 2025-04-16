import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { verifyToken, hashPassword } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const userId = params.id

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
      WHERE user_id = ? AND deleted_at IS NULL
    `

    const users = await executeQuery<any[]>({ query, values: [userId] })

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(users[0])
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "An error occurred while fetching user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const userId = params.id
    const body = await request.json()
    const { name, username, email, password, role, phone, image } = body

    // Split name into first_name and last_name
    const nameParts = name.split(" ")
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(" ") || ""

    // Start building the query and values
    let query = `
      UPDATE users 
      SET 
        username = ?, 
        email = ?, 
        first_name = ?, 
        last_name = ?, 
        role = ?
    `

    const values: any[] = [username, email, firstName, lastName, role]

    // Add phone if provided
    if (phone !== undefined) {
      query += ", phone = ?"
      values.push(phone)
    }

    // Add image if provided
    if (image !== undefined) {
      query += ", profile_image = ?"
      values.push(image)
    }

    // Add password if provided
    if (password) {
      const hashedPassword = await hashPassword(password)
      query += ", password_hash = ?"
      values.push(hashedPassword)
    }

    // Complete the query
    query += " WHERE user_id = ?"
    values.push(userId)

    await executeQuery({ query, values })

    return NextResponse.json({
      id: userId,
      username,
      email,
      name,
      role,
      phone,
      image,
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "An error occurred while updating user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const userId = params.id

    // Soft delete the user
    const query = `
      UPDATE users 
      SET deleted_at = CURRENT_TIMESTAMP 
      WHERE user_id = ?
    `

    await executeQuery({ query, values: [userId] })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "An error occurred while deleting user" }, { status: 500 })
  }
}
