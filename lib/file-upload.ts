import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Define the upload directory from environment variable or default
const uploadDir = process.env.UPLOAD_DIR || "public/uploads"

/**
 * Save a file to the filesystem
 * @param file The file to save
 * @param subDirectory Optional subdirectory within the upload directory
 * @returns The path to the saved file
 */
export async function saveFile(file: File, subDirectory = ""): Promise<string> {
  try {
    // Generate a unique filename
    const fileName = `${uuidv4()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`

    // Create the full directory path
    const directory = subDirectory ? path.join(uploadDir, subDirectory) : uploadDir

    // Create the full file path
    const filePath = path.join(directory, fileName)

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Write the file
    await writeFile(filePath, buffer)

    // Return the path relative to the public directory
    return subDirectory ? `/uploads/${subDirectory}/${fileName}` : `/uploads/${fileName}`
  } catch (error) {
    console.error("Error saving file:", error)
    throw new Error("Failed to save file")
  }
}

/**
 * Save a base64 encoded image to the filesystem
 * @param base64String The base64 encoded image string
 * @param fileName The name to give the file
 * @param subDirectory Optional subdirectory within the upload directory
 * @returns The path to the saved file
 */
export async function saveBase64Image(
  base64String: string,
  fileName = `image-${Date.now()}.jpg`,
  subDirectory = "",
): Promise<string> {
  try {
    // Remove the data URL prefix if present
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "")

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64")

    // Generate a unique filename
    const uniqueFileName = `${uuidv4()}-${fileName.replace(/\s+/g, "-").toLowerCase()}`

    // Create the full directory path
    const directory = subDirectory ? path.join(uploadDir, subDirectory) : uploadDir

    // Create the full file path
    const filePath = path.join(directory, uniqueFileName)

    // Write the file
    await writeFile(filePath, buffer)

    // Return the path relative to the public directory
    return subDirectory ? `/uploads/${subDirectory}/${uniqueFileName}` : `/uploads/${uniqueFileName}`
  } catch (error) {
    console.error("Error saving base64 image:", error)
    throw new Error("Failed to save image")
  }
}
