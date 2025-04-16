import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const clientId = params.id

    // Get projects for this client
    let projectsQuery = `
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
        p.agent_id as agentId
      FROM projects p
      WHERE p.owner_id = ? AND p.deleted_at IS NULL
    `

    const queryParams = [clientId]

    // If agent, only show projects assigned to them
    if (user.role === "agent") {
      projectsQuery += " AND p.agent_id = ?"
      queryParams.push(user.id)
    }

    projectsQuery += " ORDER BY p.created_at DESC"

    const projects = await query(projectsQuery, queryParams)

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching client projects:", error)
    return NextResponse.json({ error: "An error occurred while fetching projects" }, { status: 500 })
  }
}
