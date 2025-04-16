import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
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

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total users count
    const usersQuery = "SELECT COUNT(*) as count FROM users WHERE deleted_at IS NULL"
    const usersResult = await executeQuery<any[]>({ query: usersQuery })
    const totalUsers = usersResult[0].count

    // Get total properties count
    const propertiesQuery = "SELECT COUNT(*) as count FROM projects WHERE deleted_at IS NULL"
    const propertiesResult = await executeQuery<any[]>({ query: propertiesQuery })
    const totalProperties = propertiesResult[0].count

    // Get total subscribers count
    const subscribersQuery = "SELECT COUNT(*) as count FROM subscribers WHERE unsubscribed_at IS NULL"
    const subscribersResult = await executeQuery<any[]>({ query: subscribersQuery })
    const totalSubscribers = subscribersResult[0].count

    // Get total property views
    const viewsQuery = "SELECT SUM(view_count) as count FROM property_views"
    const viewsResult = await executeQuery<any[]>({ query: viewsQuery })
    const totalViews = viewsResult[0].count || 0

    return NextResponse.json({
      totalUsers,
      totalProperties,
      totalSubscribers,
      totalViews,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "An error occurred while fetching dashboard stats" }, { status: 500 })
  }
}
