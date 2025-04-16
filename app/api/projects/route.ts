import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET all projects
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    let sql = `
      SELECT p.*, 
        u.first_name AS owner_first_name, 
        u.last_name AS owner_last_name,
        (SELECT image_url FROM project_images WHERE project_id = p.project_id AND is_primary = 1 LIMIT 1) AS primary_image,
        (SELECT COUNT(*) FROM project_images WHERE project_id = p.project_id) AS image_count
      FROM projects p
      LEFT JOIN users u ON p.owner_id = u.user_id
      WHERE p.deleted_at IS NULL
    `

    const params: any[] = []

    if (featured) {
      sql += " AND p.featured = ?"
      params.push(featured === "true" ? 1 : 0)
    }

    sql += " ORDER BY p.created_at DESC"

    if (limit) {
      sql += " LIMIT ?"
      params.push(Number.parseInt(limit))
    }

    const projects = await query(sql, params)

    // Get images for each project
    for (const project of projects) {
      const images = await query(
        "SELECT * FROM project_images WHERE project_id = ? ORDER BY is_primary DESC, display_order ASC",
        [project.project_id],
      )

      project.images = images.map((img: any) => img.image_url)
      project.image = project.primary_image || (images.length > 0 ? images[0].image_url : null)

      // Get features
      const features = await query("SELECT feature_name FROM project_features WHERE project_id = ?", [
        project.project_id,
      ])

      project.features = features.map((f: any) => f.feature_name)

      // Get assigned agents
      const agents = await query(
        `
        SELECT u.user_id, u.first_name, u.last_name, u.email, u.profile_image, pa.is_primary
        FROM project_agents pa
        JOIN users u ON pa.user_id = u.user_id
        WHERE pa.project_id = ?
      `,
        [project.project_id],
      )

      project.assignedAgents = agents.map((a: any) => a.user_id)
      project.agents = agents
    }

    return NextResponse.json(projects)
  } catch (error: any) {
    console.error("Database error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST a new project
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    // Start a transaction
    await query("START TRANSACTION")

    // Insert project
    const result = await query(
      `
      INSERT INTO projects (
        title, description, price, property_type, status, 
        bedrooms, bathrooms, area, area_unit, year_built,
        address, city, state, zip_code, country, 
        neighborhood, latitude, longitude, youtube_url,
        featured, owner_id, primary_agent_id, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        data.title,
        data.description,
        data.price,
        data.type,
        data.status,
        data.bedrooms,
        data.bathrooms,
        data.areaSize,
        data.sizePostfix || "sqft",
        data.yearBuilt,
        data.address,
        data.city,
        data.state || null,
        data.zipCode,
        data.country || "Morocco",
        data.area || null,
        data.latitude || null,
        data.longitude || null,
        data.videoUrl || null,
        data.featured ? 1 : 0,
        data.ownerId,
        data.assignedAgents && data.assignedAgents.length > 0 ? data.assignedAgents[0] : null,
        session.user.id,
      ],
    )

    const projectId = result.insertId

    // Insert images
    if (data.imageUrls && data.imageUrls.length > 0) {
      for (let i = 0; i < data.imageUrls.length; i++) {
        const imageUrl = data.imageUrls[i]

        // If it's a base64 string, save it to the filesystem
        if (imageUrl.startsWith("data:image")) {
          try {
            // Import the saveBase64Image function
            const { saveBase64Image } = await import("@/lib/file-upload")
            const { fileUrl } = await saveBase64Image(imageUrl)

            // Save the file URL to the database
            await query(
              `
              INSERT INTO project_images (project_id, image_url, is_primary, display_order)
              VALUES (?, ?, ?, ?)
              `,
              [
                projectId,
                fileUrl,
                i === 0 ? 1 : 0, // First image is primary
                i,
              ],
            )
          } catch (error) {
            console.error("Error saving image:", error)
            // Continue with the next image if one fails
          }
        } else {
          // It's already a URL, just save it to the database
          await query(
            `
            INSERT INTO project_images (project_id, image_url, is_primary, display_order)
            VALUES (?, ?, ?, ?)
            `,
            [
              projectId,
              imageUrl,
              i === 0 ? 1 : 0, // First image is primary
              i,
            ],
          )
        }
      }
    }

    // Insert features
    if (data.features && data.features.length > 0) {
      for (const feature of data.features) {
        await query(
          `
          INSERT INTO project_features (project_id, feature_name)
          VALUES (?, ?)
        `,
          [projectId, feature],
        )
      }
    }

    // Insert assigned agents
    if (data.assignedAgents && data.assignedAgents.length > 0) {
      for (let i = 0; i < data.assignedAgents.length; i++) {
        await query(
          `
          INSERT INTO project_agents (project_id, user_id, is_primary)
          VALUES (?, ?, ?)
        `,
          [
            projectId,
            data.assignedAgents[i],
            i === 0 ? 1 : 0, // First agent is primary
          ],
        )
      }
    }

    // Commit the transaction
    await query("COMMIT")

    return NextResponse.json({
      message: "Project created successfully",
      projectId,
    })
  } catch (error: any) {
    // Rollback on error
    await query("ROLLBACK")
    console.error("Database error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
