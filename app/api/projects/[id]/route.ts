import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// GET a single project
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id

    // Get project details
    const projects = await query(
      `
      SELECT p.*, 
        u.first_name AS owner_first_name, 
        u.last_name AS owner_last_name
      FROM projects p
      LEFT JOIN users u ON p.owner_id = u.user_id
      WHERE p.project_id = ? AND p.deleted_at IS NULL
    `,
      [projectId],
    )

    if (projects.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const project = projects[0]

    // Get images
    const images = await query(
      "SELECT * FROM project_images WHERE project_id = ? ORDER BY is_primary DESC, display_order ASC",
      [projectId],
    )

    project.images = images.map((img: any) => img.image_url)
    project.imageUrls = project.images
    project.image = images.length > 0 ? images[0].image_url : null

    // Get features
    const features = await query("SELECT feature_name FROM project_features WHERE project_id = ?", [projectId])

    project.features = features.map((f: any) => f.feature_name)

    // Get assigned agents
    const agents = await query(
      `
      SELECT u.user_id, u.first_name, u.last_name, u.email, u.profile_image, pa.is_primary
      FROM project_agents pa
      JOIN users u ON pa.user_id = u.user_id
      WHERE pa.project_id = ?
    `,
      [projectId],
    )

    project.assignedAgents = agents.map((a: any) => a.user_id)
    project.agents = agents

    // Track view if not an admin/agent
    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === "admin" || session?.user?.role === "agent"

    if (!isAdmin) {
      const today = new Date().toISOString().split("T")[0]
      const userId = session?.user?.id || null

      // Check if view exists for today
      const existingViews = await query(
        "SELECT * FROM property_views WHERE project_id = ? AND view_date = ? AND user_id IS ?",
        [projectId, today, userId],
      )

      if (existingViews.length > 0) {
        // Update existing view count
        await query("UPDATE property_views SET view_count = view_count + 1 WHERE view_id = ?", [
          existingViews[0].view_id,
        ])
      } else {
        // Insert new view
        await query("INSERT INTO property_views (project_id, user_id, view_date, view_count) VALUES (?, ?, ?, 1)", [
          projectId,
          userId,
          today,
        ])
      }
    }

    return NextResponse.json(project)
  } catch (error: any) {
    console.error("Database error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT (update) a project
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = params.id
    const data = await req.json()

    // Start a transaction
    await query("START TRANSACTION")

    // Update project
    await query(
      `
      UPDATE projects SET
        title = ?,
        description = ?,
        price = ?,
        property_type = ?,
        status = ?,
        bedrooms = ?,
        bathrooms = ?,
        area = ?,
        area_unit = ?,
        year_built = ?,
        address = ?,
        city = ?,
        state = ?,
        zip_code = ?,
        neighborhood = ?,
        latitude = ?,
        longitude = ?,
        youtube_url = ?,
        featured = ?,
        owner_id = ?,
        primary_agent_id = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE project_id = ?
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
        data.area || null,
        data.latitude || null,
        data.longitude || null,
        data.videoUrl || null,
        data.featured ? 1 : 0,
        data.ownerId,
        data.assignedAgents && data.assignedAgents.length > 0 ? data.assignedAgents[0] : null,
        projectId,
      ],
    )

    // Handle images - delete existing and add new ones
    if (data.imageUrls && data.imageUrls.length > 0) {
      // Delete existing images
      await query("DELETE FROM project_images WHERE project_id = ?", [projectId])

      // Insert new images
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

    // Handle features - delete existing and add new ones
    if (data.features) {
      // Delete existing features
      await query("DELETE FROM project_features WHERE project_id = ?", [projectId])

      // Insert new features
      if (data.features.length > 0) {
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
    }

    // Handle assigned agents - delete existing and add new ones
    if (data.assignedAgents) {
      // Delete existing agent assignments
      await query("DELETE FROM project_agents WHERE project_id = ?", [projectId])

      // Insert new agent assignments
      if (data.assignedAgents.length > 0) {
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
    }

    // Commit the transaction
    await query("COMMIT")

    return NextResponse.json({
      message: "Project updated successfully",
    })
  } catch (error: any) {
    // Rollback on error
    await query("ROLLBACK")
    console.error("Database error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE a project (soft delete)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = params.id

    // Soft delete the project
    await query("UPDATE projects SET deleted_at = CURRENT_TIMESTAMP WHERE project_id = ?", [projectId])

    return NextResponse.json({
      message: "Project deleted successfully",
    })
  } catch (error: any) {
    console.error("Database error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
