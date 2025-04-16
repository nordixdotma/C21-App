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

    if (!user || user.role !== "client") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get projects for this client
    const projectsQuery = `
      SELECT 
        p.project_id as id,
        p.name,
        p.description,
        p.price,
        p.currency,
        p.address,
        p.city,
        p.location,
        p.latitude,
        p.longitude,
        p.bedrooms,
        p.bathrooms,
        p.area_size as areaSize,
        p.size_postfix as sizePostfix,
        p.featured_image as featuredImage,
        p.status,
        p.type,
        p.created_at as createdAt,
        p.updated_at as updatedAt,
        p.is_featured as isFeatured,
        p.is_new as isNew,
        p.owner_id as ownerId,
        p.agent_id as agentId,
        CONCAT(a.first_name, ' ', a.last_name) as agentName
      FROM projects p
      LEFT JOIN users a ON p.agent_id = a.user_id
      WHERE p.owner_id = ? AND p.deleted_at IS NULL
      ORDER BY p.created_at DESC
    `

    const projects = await query(projectsQuery, [user.id])

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching client projects:", error)
    return NextResponse.json({ error: "An error occurred while fetching projects" }, { status: 500 })
  }
}
