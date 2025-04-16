import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyToken(token)

    if (!user || (user.role !== "admin" && user.role !== "agent")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // If the user is an agent, only return clients assigned to them
    let clientsQuery = `
      SELECT 
        u.user_id as id, 
        u.username, 
        u.email, 
        CONCAT(u.first_name, ' ', u.last_name) as name,
        u.role,
        u.phone,
        u.profile_image as image,
        u.created_at as createdAt
      FROM users u
      WHERE u.role = 'client' AND u.deleted_at IS NULL
    `

    const queryParams: any[] = []

    if (user.role === "agent") {
      clientsQuery += `
        AND EXISTS (
          SELECT 1 FROM projects p
          WHERE p.owner_id = u.user_id
          AND p.agent_id = ?
        )
      `
      queryParams.push(user.id)
    }

    clientsQuery += " ORDER BY u.created_at DESC"

    const clients = await query(clientsQuery, queryParams)

    return NextResponse.json(clients)
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "An error occurred while fetching clients" }, { status: 500 })
  }
}
