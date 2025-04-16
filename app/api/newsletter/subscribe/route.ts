import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Check if email already exists
    const [existingSubscribers] = await db.query("SELECT * FROM newsletter_subscribers WHERE email = ?", [email])

    if (Array.isArray(existingSubscribers) && existingSubscribers.length > 0) {
      return NextResponse.json({ message: "Email already subscribed" }, { status: 200 })
    }

    // Insert new subscriber
    await db.query("INSERT INTO newsletter_subscribers (email, subscribed_at) VALUES (?, NOW())", [email])

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
    })
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return NextResponse.json({ error: "Failed to subscribe to newsletter" }, { status: 500 })
  }
}
