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

    const query = `
      SELECT 
        subscriber_id as id, 
        email, 
        subscribed_at as subscribedAt
      FROM subscribers 
      WHERE unsubscribed_at IS NULL
      ORDER BY subscribed_at DESC
    `

    const subscribers = await executeQuery<any[]>({ query })

    return NextResponse.json(subscribers)
  } catch (error) {
    console.error("Error fetching subscribers:", error)
    return NextResponse.json({ error: "An error occurred while fetching subscribers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if email already exists
    const checkQuery = "SELECT * FROM subscribers WHERE email = ?"
    const existingSubscribers = await executeQuery<any[]>({ query: checkQuery, values: [email] })

    if (existingSubscribers.length > 0) {
      const subscriber = existingSubscribers[0]

      // If already subscribed
      if (!subscriber.unsubscribed_at) {
        return NextResponse.json({ error: "Email is already subscribed" }, { status: 400 })
      }

      // If previously unsubscribed, resubscribe them
      const resubscribeQuery = "UPDATE subscribers SET unsubscribed_at = NULL WHERE email = ?"
      await executeQuery({ query: resubscribeQuery, values: [email] })

      return NextResponse.json({
        id: subscriber.subscriber_id,
        email,
        subscribedAt: new Date().toISOString(),
      })
    }

    // Insert new subscriber
    const insertQuery = "INSERT INTO subscribers (email) VALUES (?)"
    const result = await executeQuery<any>({ query: insertQuery, values: [email] })

    return NextResponse.json({
      id: result.insertId,
      email,
      subscribedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error adding subscriber:", error)
    return NextResponse.json({ error: "An error occurred while adding subscriber" }, { status: 500 })
  }
}
