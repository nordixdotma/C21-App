import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import fs from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const imageId = params.id

    // Query the database for the image
    const images = await query("SELECT * FROM project_images WHERE image_id = ?", [imageId])

    if (!images || images.length === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    const image = images[0] as any

    // Check if the image exists in the filesystem
    const imagePath = path.join(process.cwd(), image.image_url.replace(/^\//, ""))

    if (fs.existsSync(imagePath)) {
      // Read the file from the filesystem
      const imageBuffer = fs.readFileSync(imagePath)

      // Determine content type based on file extension
      const ext = path.extname(imagePath).toLowerCase()
      let contentType = "image/jpeg" // Default

      if (ext === ".png") contentType = "image/png"
      else if (ext === ".gif") contentType = "image/gif"
      else if (ext === ".webp") contentType = "image/webp"

      // Return the image
      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      })
    } else if (image.binary_data) {
      // If the file doesn't exist but we have binary data in the database
      return new NextResponse(Buffer.from(image.binary_data), {
        headers: {
          "Content-Type": "image/jpeg", // Assuming JPEG for binary data
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      })
    } else {
      return NextResponse.json({ error: "Image file not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error serving image:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
