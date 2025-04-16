import fs from "fs"
import path from "path"

// Define the upload directory from environment variable or default
const uploadDir = process.env.UPLOAD_DIR || "public/uploads"

/**
 * Ensures that the uploads directory exists
 * Creates it if it doesn't exist
 */
export function ensureUploadsDir(): void {
  try {
    // Check if the directory exists
    if (!fs.existsSync(uploadDir)) {
      // Create the directory recursively
      fs.mkdirSync(uploadDir, { recursive: true })
      console.log(`Created uploads directory: ${uploadDir}`)
    }
  } catch (error) {
    console.error("Error ensuring uploads directory exists:", error)
  }
}

/**
 * Ensures that a subdirectory within the uploads directory exists
 * Creates it if it doesn't exist
 * @param subDirectory The subdirectory to ensure exists
 */
export function ensureSubDir(subDirectory: string): void {
  try {
    const fullPath = path.join(uploadDir, subDirectory)

    // Check if the directory exists
    if (!fs.existsSync(fullPath)) {
      // Create the directory recursively
      fs.mkdirSync(fullPath, { recursive: true })
      console.log(`Created subdirectory: ${fullPath}`)
    }
  } catch (error) {
    console.error(`Error ensuring subdirectory ${subDirectory} exists:`, error)
  }
}
