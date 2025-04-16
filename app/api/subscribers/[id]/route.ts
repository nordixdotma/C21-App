import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

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

    const subscriberId = params.id

    // Soft delete the subscriber
    const query = `
      UPDATE subscribers 
      SET unsubscribed_at = CURRENT_TIMESTAMP 
      WHERE subscriber_id = ?
    `

    await executeQuery({ query, values: [subscriberId] })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting subscriber:", error)
    return NextResponse.json({ error: "An error occurred while deleting subscriber" }, { status: 500 })
  }
}
