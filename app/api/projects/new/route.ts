import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const limit = Number.parseInt(url.searchParams.get("limit") || "24", 10)

    // Query the database for new projects
    const [projects] = await db.query(
      `SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.price, 
        p.price_type as priceType, 
        p.location, 
        p.status, 
        p.bedrooms, 
        p.bathrooms, 
        p.area_size as areaSize, 
        p.created_at as createdAt,
        GROUP_CONCAT(DISTINCT pi.image_url) as imageUrls
      FROM 
        projects p
      LEFT JOIN 
        project_images pi ON p.id = pi.project_id
      WHERE 
        p.price_type = 'new_project' OR p.is_new = 1
      GROUP BY 
        p.id
      ORDER BY 
        p.created_at DESC
      LIMIT ?`,
      [limit],
    )

    // Process the results
    const formattedProjects = Array.isArray(projects)
      ? projects.map((project) => ({
          ...project,
          imageUrls: project.imageUrls ? project.imageUrls.split(",") : [],
        }))
      : []

    return NextResponse.json({ projects: formattedProjects })
  } catch (error) {
    console.error("Error fetching new projects:", error)
    return NextResponse.json({ error: "Failed to fetch new projects" }, { status: 500 })
  }
}
