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

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Build query based on user role
    let appointmentsQuery = `
      SELECT 
        a.appointment_id as id,
        a.appointment_date as date,
        a.status,
        a.notes,
        a.created_at as createdAt,
        p.project_id as propertyId,
        p.name as propertyName,
        p.address as propertyAddress,
        c.user_id as clientId,
        CONCAT(c.first_name, ' ', c.last_name) as clientName,
        ag.user_id as agentId,
        CONCAT(ag.first_name, ' ', ag.last_name) as agentName
      FROM appointments a
      JOIN projects p ON a.project_id = p.project_id
      JOIN users c ON a.client_id = c.user_id
      JOIN users ag ON a.agent_id = ag.user_id
      WHERE 1=1
    `

    const queryParams: any[] = []

    // Filter based on user role
    if (user.role === "client") {
      appointmentsQuery += " AND a.client_id = ?"
      queryParams.push(user.id)
    } else if (user.role === "agent") {
      appointmentsQuery += " AND a.agent_id = ?"
      queryParams.push(user.id)
    }

    appointmentsQuery += " ORDER BY a.appointment_date DESC"

    const appointments = await query(appointmentsQuery, queryParams)

    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "An error occurred while fetching appointments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { propertyId, clientId, agentId, date, notes } = body

    // Validate required fields
    if (!propertyId || !clientId || !agentId || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert appointment
    const insertQuery = `
      INSERT INTO appointments (
        project_id,
        client_id,
        agent_id,
        appointment_date,
        status,
        notes
      ) VALUES (?, ?, ?, ?, ?, ?)
    `

    const result = await query(insertQuery, [propertyId, clientId, agentId, new Date(date), "upcoming", notes || null])

    // Get the inserted appointment
    const appointmentId = result.insertId
    const appointmentQuery = `
      SELECT 
        a.appointment_id as id,
        a.appointment_date as date,
        a.status,
        a.notes,
        a.created_at as createdAt,
        p.project_id as propertyId,
        p.name as propertyName,
        p.address as propertyAddress,
        c.user_id as clientId,
        CONCAT(c.first_name, ' ', c.last_name) as clientName,
        ag.user_id as agentId,
        CONCAT(ag.first_name, ' ', ag.last_name) as agentName
      FROM appointments a
      JOIN projects p ON a.project_id = p.project_id
      JOIN users c ON a.client_id = c.user_id
      JOIN users ag ON a.agent_id = ag.user_id
      WHERE a.appointment_id = ?
    `

    const appointments = await query(appointmentQuery, [appointmentId])
    const appointment = appointments[0]

    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "An error occurred while creating appointment" }, { status: 500 })
  }
}
